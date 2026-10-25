import React, { useState, useEffect } from 'react';
import Sidebar from '@/components/admin/Sidebar';
import Topbar from '@/components/admin/Topbar';
import { Plus, Search, Film, Tag, ExternalLink, Trash2, Edit, Check } from 'lucide-react';
import { Link, useLocation } from 'wouter';
import { motion, AnimatePresence } from 'framer-motion';
import { supabase } from '@/lib/supabase';

export default function Projects() {
  const [, setLocation] = useLocation();
  const [searchTerm, setSearchTerm] = useState('');
  const [sectionFilter, setSectionFilter] = useState<'All' | 'Filmmaking' | 'Marketing'>('All');

  // Deletion and alerts states
  const [deleteTarget, setDeleteTarget] = useState<any | null>(null);
  const [deleting, setDeleting] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const formatDate = (dateString?: string) => {
    if (!dateString) return '—';
    try {
      const d = new Date(dateString);
      return d.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric'
      });
    } catch {
      return '—';
    }
  };

  const handleConfirmDelete = async () => {
    if (!deleteTarget) return;
    setDeleting(true);
    try {
      const dbId = deleteTarget.id.replace('db-', '');
      const { error } = await supabase
        .from('projects')
        .delete()
        .eq('id', dbId);

      if (error) {
        throw error;
      }

      setProjects((prev) => prev.filter((p) => p.id !== deleteTarget.id));
      setToastMessage(`Project "${deleteTarget.title}" deleted successfully.`);
      setTimeout(() => setToastMessage(null), 3000);
    } catch (err: any) {
      console.error('Delete error:', err);
      alert(`Failed to delete project: ${err.message}`);
    } finally {
      setDeleting(false);
      setDeleteTarget(null);
    }
  };



  const [projects, setProjects] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadProjects() {
      try {
        const { data, error } = await supabase
          .from('projects')
          .select('*')
          .order('display_order', { ascending: true })
          .order('id', { ascending: false });

        let dbProjects: any[] = [];
        if (data) {
          dbProjects = data.map((p: any) => ({
            id: `db-${p.id || p.slug}`,
            title: p.title,
            slug: p.slug,
            section: p.section || 'Filmmaking',
            category: p.category || 'Videography',
            thumbnail: p.thumbnail || (p.section === 'Marketing' ? '/attached_assets/generated_images/marketing_bg.jpg' : '/attached_assets/generated_images/filmmaking_bg.jpg'),
            status: (p.status || 'Draft') as 'Published' | 'Draft',
            year: p.year || new Date().getFullYear(),
            created_at: p.created_at
          }));
        }

        if (error) {
          console.error('Error fetching Supabase projects:', error.message);
        }

        setProjects(dbProjects);
      } catch (err) {
        console.error('Catch error loading projects:', err);
        setProjects([]);
      } finally {
        setLoading(false);
      }
    }

    loadProjects();
  }, []);

  const filteredProjects = projects.filter(project => {
    const matchesSearch = project.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          project.category.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSection = sectionFilter === 'All' || project.section === sectionFilter;
    return matchesSearch && matchesSection;
  });

  return (
    <div className="min-h-screen bg-[#f4f3ee] text-foreground flex relative">
      <div className="fixed inset-0 z-0 noise-overlay mix-blend-overlay pointer-events-none"></div>

      {/* Sidebar Navigation */}
      <Sidebar />

      {/* Main Work Area */}
      <div className="flex-1 flex flex-col min-w-0 z-10 relative">
        <Topbar title="Manage Projects" />

        <main className="flex-1 p-8 overflow-y-auto">
          {/* Header Block */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-10 text-left">
            <div>
              <h1 className="font-display text-4xl text-foreground mb-2 leading-tight">Projects</h1>
              <p className="text-sm text-foreground/50 font-light">
                Configure your filmmaking and marketing case studies displayed across the public pages.
              </p>
            </div>
            
            {/* Add Project Action */}
            <Link href="/admin/projects/new">
              <button className="flex items-center justify-center gap-2.5 px-6 py-4 bg-primary hover:bg-primary/95 text-primary-foreground font-semibold tracking-widest uppercase text-[10px] rounded-md shadow-md hover:shadow-lg transition-all cursor-pointer">
                <Plus className="w-4 h-4" />
                <span>Add Project</span>
              </button>
            </Link>
          </div>

          {/* Directory Toolbar */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
            {/* Section tabs */}
            <div className="flex border-b border-foreground/10 self-start overflow-x-auto hide-scrollbar max-w-full">
              {(['All', 'Filmmaking', 'Marketing'] as const).map((filter) => (
                <button
                  key={filter}
                  onClick={() => setSectionFilter(filter)}
                  className={`px-6 py-3 uppercase tracking-[0.15em] text-[10px] sm:text-xs font-semibold relative pb-2 transition-colors duration-300 ${
                    sectionFilter === filter ? 'text-foreground' : 'text-foreground/45 hover:text-foreground'
                  }`}
                >
                  {filter}
                  {sectionFilter === filter && (
                    <motion.div 
                      layoutId="activeFilterTab"
                      className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-primary"
                    />
                  )}
                </button>
              ))}
            </div>

            {/* Search inputs */}
            <div className="relative flex items-center w-full md:max-w-md">
              <Search className="absolute left-3.5 w-4 h-4 text-foreground/35" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search projects or categories..."
                className="w-full bg-card/65 border border-foreground/10 rounded-lg pl-10 pr-4 py-3 text-xs text-foreground placeholder:text-foreground/35 font-light focus:border-primary outline-none transition-colors"
              />
            </div>
          </div>

          {/* Table Directory Layout */}
          <div className="glass border border-foreground/10 bg-card/65 rounded-xl overflow-hidden shadow-[0_4px_12px_rgba(0,0,0,0.02)]">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[900px] border-collapse text-left">
                <thead>
                  <tr className="border-b border-foreground/10 text-[9px] uppercase tracking-[0.2em] text-foreground/45 font-bold">
                    <th className="py-5 px-6 w-20">Preview</th>
                    <th className="py-5 px-6">Project details</th>
                    <th className="py-5 px-6">Section</th>
                    <th className="py-5 px-6">Category</th>
                    <th className="py-5 px-6">Created Date</th>
                    <th className="py-5 px-6">Status</th>
                    <th className="py-5 px-6 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-foreground/10">
                  {loading ? (
                    <tr>
                      <td colSpan={6} className="py-12 text-center text-foreground/35 uppercase tracking-widest text-[10px] font-bold">
                        <div className="flex items-center justify-center gap-2.5">
                          <div className="w-3.5 h-3.5 border-2 border-foreground/20 border-t-foreground rounded-full animate-spin"></div>
                          <span>Syncing with Supabase...</span>
                        </div>
                      </td>
                    </tr>
                  ) : (
                    <AnimatePresence mode="popLayout">
                      {filteredProjects.map((project) => (
                      <motion.tr
                        layout
                        key={project.id}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="hover:bg-foreground/[0.01] transition-colors group"
                      >
                        {/* Preview */}
                        <td className="py-4 px-6">
                          <div className="w-12 aspect-[4/5] rounded overflow-hidden bg-secondary border border-foreground/10 shadow-inner">
                            <img src={project.thumbnail} alt={project.title} className="w-full h-full object-cover" />
                          </div>
                        </td>

                        {/* Title details */}
                        <td className="py-4 px-6">
                          <div className="flex flex-col gap-0.5">
                            <span className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors">{project.title}</span>
                            <span className="text-[10px] text-foreground/40 font-light">slug: {project.slug} • {project.year}</span>
                          </div>
                        </td>

                        {/* Section */}
                        <td className="py-4 px-6">
                          <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[9px] uppercase tracking-wider font-bold border ${
                            project.section === 'Filmmaking'
                              ? 'bg-purple-500/10 text-purple-600 border-purple-500/15'
                              : 'bg-blue-500/10 text-blue-600 border-blue-500/15'
                          }`}>
                            {project.section === 'Filmmaking' ? <Film className="w-2.5 h-2.5" /> : <Tag className="w-2.5 h-2.5" />}
                            <span>{project.section}</span>
                          </span>
                        </td>

                        {/* Category */}
                        <td className="py-4 px-6">
                          <span className="text-xs text-foreground/65 font-light">{project.category}</span>
                        </td>

                        {/* Created Date */}
                        <td className="py-4 px-6">
                          <span className="text-xs text-foreground/65 font-light">
                            {project.id.startsWith('db-') 
                              ? formatDate(project.created_at) 
                              : `Catalog (${project.year})`}
                          </span>
                        </td>

                        {/* Status */}
                        <td className="py-4 px-6">
                          <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-[8px] uppercase tracking-wider font-bold border ${
                            project.status === 'Published'
                              ? 'bg-green-500/10 text-green-600 border-green-500/15'
                              : 'bg-amber-500/10 text-amber-600 border-amber-500/15'
                          }`}>
                            <span className={`w-1 h-1 rounded-full ${project.status === 'Published' ? 'bg-green-500 animate-pulse' : 'bg-amber-500'}`} />
                            {project.status}
                          </span>
                        </td>

                        {/* Actions */}
                        <td className="py-4 px-6 text-right">
                          <div className="inline-flex items-center gap-3">
                             <a 
                              href={project.section === 'Filmmaking' ? `/filmmaking/${project.slug}` : `/marketing/${project.slug}`} 
                              target="_blank"
                              rel="noreferrer"
                              className="p-2 hover:bg-foreground/5 text-foreground/45 hover:text-foreground transition-all rounded"
                            >
                              <ExternalLink className="w-4 h-4" />
                            </a>
                            {project.id.startsWith('db-') ? (
                              <>
                                <Link href={`/admin/projects/edit/${project.id.replace('db-', '')}`}>
                                  <button className="p-2 hover:bg-foreground/5 text-foreground/45 hover:text-primary transition-all rounded cursor-pointer">
                                    <Edit className="w-4 h-4" />
                                  </button>
                                </Link>
                                <button 
                                  onClick={() => setDeleteTarget(project)}
                                  className="p-2 hover:bg-foreground/5 text-foreground/45 hover:text-destructive transition-all rounded cursor-pointer"
                                >
                                  <Trash2 className="w-4 h-4" />
                                </button>
                              </>
                            ) : (
                              <>
                                <button 
                                  onClick={() => alert('Static catalog items from local data files cannot be modified.')}
                                  className="p-2 text-foreground/15 cursor-not-allowed"
                                  title="Static Item"
                                >
                                  <Edit className="w-4 h-4" />
                                </button>
                                <button 
                                  onClick={() => alert('Static catalog items from local data files cannot be deleted.')}
                                  className="p-2 text-foreground/15 cursor-not-allowed"
                                  title="Static Item"
                                >
                                  <Trash2 className="w-4 h-4" />
                                </button>
                              </>
                            )}
                          </div>
                        </td>
                      </motion.tr>
                    ))}
                  </AnimatePresence>
                  )}
                </tbody>
              </table>
            </div>

            {/* Empty state */}
            {filteredProjects.length === 0 && (
              <div className="text-center py-20 text-foreground/35 uppercase tracking-widest text-xs font-light">
                No projects matched your criteria.
              </div>
            )}
          </div>
        </main>
      </div>
      
      {/* Custom Glassmorphic Confirmation Modal */}
      <AnimatePresence>
        {deleteTarget && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setDeleteTarget(null)}
              className="absolute inset-0 bg-black/35 backdrop-blur-sm"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              className="bg-card/90 border border-foreground/10 p-8 rounded-xl max-w-md w-full relative z-10 shadow-xl backdrop-blur-md text-left"
            >
              <h3 className="font-display text-2xl text-foreground mb-3 leading-tight">Delete Project</h3>
              <p className="text-xs text-foreground/60 leading-relaxed font-light mb-8">
                Are you sure you want to delete the project <strong className="text-foreground font-semibold">"{deleteTarget.title}"</strong>? This action cannot be undone.
              </p>

              <div className="flex items-center justify-end gap-4">
                <button
                  onClick={() => setDeleteTarget(null)}
                  disabled={deleting}
                  className="px-5 py-3 bg-foreground/5 hover:bg-foreground/10 text-foreground text-[9px] uppercase tracking-wider font-bold rounded transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  onClick={handleConfirmDelete}
                  disabled={deleting}
                  className="flex items-center gap-2 px-5 py-3 bg-destructive text-destructive-foreground hover:bg-destructive/95 text-[9px] uppercase tracking-wider font-bold rounded transition-colors cursor-pointer"
                >
                  {deleting ? (
                    <>
                      <div className="w-3 h-3 border-2 border-white/20 border-t-white rounded-full animate-spin"></div>
                      <span>Deleting...</span>
                    </>
                  ) : (
                    <span>Delete</span>
                  )}
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Toast Alert Popups */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className="fixed bottom-6 right-6 z-50 p-4 bg-emerald-500 text-white rounded-lg shadow-lg flex items-center gap-2.5 text-xs font-semibold"
          >
            <Check className="w-4 h-4" />
            <span>{toastMessage}</span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
