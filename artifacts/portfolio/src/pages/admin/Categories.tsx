import React, { useState } from 'react';
import Sidebar from '@/components/admin/Sidebar';
import Topbar from '@/components/admin/Topbar';
import { Plus, Edit2, Trash2, Check, X, Tag, AlertCircle, ShieldAlert } from 'lucide-react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/lib/supabase';
import { motion, AnimatePresence } from 'framer-motion';

interface DbCategory {
  id: number;
  name: string;
  section: string;
  created_at: string;
}

export default function Categories() {
  const queryClient = useQueryClient();
  const [activeSection, setActiveSection] = useState<'Filmmaking' | 'Marketing'>('Filmmaking');
  
  // Create Category State
  const [newCatName, setNewCatName] = useState('');
  
  // Edit Category State
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editingName, setEditingName] = useState('');

  // Status Notification states
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // Fetch Categories Query
  const { data: categories = [], isLoading, error } = useQuery<DbCategory[]>({
    queryKey: ['admin-all-categories'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('categories')
        .select('*');

      if (error) throw error;
      return data || [];
    }
  });

  // Filter & sort categories
  const filteredCategories = categories
    .filter(cat => cat.section === activeSection)
    .sort((a, b) => a.name.localeCompare(b.name));

  // Add Category Mutation
  const createMutation = useMutation({
    mutationFn: async (vars: { name: string; section: string }) => {
      const trimmed = vars.name.trim();
      if (!trimmed) throw new Error('Category name cannot be empty.');

      // Case-insensitive duplicate check
      const duplicate = categories.some(
        c => c.section === vars.section && c.name.toLowerCase() === trimmed.toLowerCase()
      );
      if (duplicate) throw new Error(`Category "${trimmed}" already exists in ${vars.section}.`);

      const { data, error } = await supabase
        .from('categories')
        .insert({ name: trimmed, section: vars.section })
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-all-categories'] });
      setNewCatName('');
      showSuccess('Category created successfully.');
    },
    onError: (err: any) => {
      showError(err.message || 'Failed to create category.');
    }
  });

  // Update Category Mutation
  const updateMutation = useMutation({
    mutationFn: async (vars: { id: number; name: string }) => {
      const trimmed = vars.name.trim();
      if (!trimmed) throw new Error('Category name cannot be empty.');

      // Case-insensitive duplicate check (excluding current editing category)
      const duplicate = categories.some(
        c => c.id !== vars.id && c.section === activeSection && c.name.toLowerCase() === trimmed.toLowerCase()
      );
      if (duplicate) throw new Error(`Category "${trimmed}" already exists in ${activeSection}.`);

      const { data, error } = await supabase
        .from('categories')
        .update({ name: trimmed })
        .eq('id', vars.id)
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-all-categories'] });
      setEditingId(null);
      showSuccess('Category renamed successfully.');
    },
    onError: (err: any) => {
      showError(err.message || 'Failed to update category.');
    }
  });

  // Delete Category Mutation
  const deleteMutation = useMutation({
    mutationFn: async (id: number) => {
      const { error } = await supabase
        .from('categories')
        .delete()
        .eq('id', id);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-all-categories'] });
      showSuccess('Category deleted successfully.');
    },
    onError: (err: any) => {
      showError(err.message || 'Failed to delete category.');
    }
  });

  const showSuccess = (msg: string) => {
    setSuccessMsg(msg);
    setErrorMsg(null);
    setTimeout(() => setSuccessMsg(null), 4000);
  };

  const showError = (msg: string) => {
    setErrorMsg(msg);
    setSuccessMsg(null);
    setTimeout(() => setErrorMsg(null), 5000);
  };

  const handleAddSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    createMutation.mutate({ name: newCatName, section: activeSection });
  };

  const startEditing = (cat: DbCategory) => {
    setEditingId(cat.id);
    setEditingName(cat.name);
  };

  const saveEdit = (id: number) => {
    updateMutation.mutate({ id, name: editingName });
  };

  const cancelEdit = () => {
    setEditingId(null);
  };

  const handleDelete = (cat: DbCategory) => {
    const confirm = window.confirm(`Are you sure you want to delete the category "${cat.name}"?`);
    if (confirm) {
      deleteMutation.mutate(cat.id);
    }
  };

  return (
    <div className="min-h-screen bg-[#f4f3ee] text-foreground flex relative">
      <div className="fixed inset-0 z-0 noise-overlay mix-blend-overlay pointer-events-none"></div>

      <Sidebar />

      <div className="flex-1 flex flex-col min-w-0 z-10 relative">
        <Topbar title="Category Management" />

        <main className="flex-1 p-8 overflow-y-auto max-w-4xl w-full mx-auto text-left">
          
          <div className="mb-10">
            <h1 className="font-display text-4xl text-foreground mb-2 leading-tight">
              Categories CMS
            </h1>
            <p className="text-sm text-foreground/50 font-light">
              Add, edit, or remove project category filters dynamically for your portfolio.
            </p>
          </div>

          {successMsg && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-5 bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 rounded-xl mb-8 flex items-center gap-3.5 text-sm font-semibold shadow-sm"
            >
              <Check className="w-5 h-5 bg-emerald-500 text-white rounded-full p-0.5 shrink-0" />
              <span>{successMsg}</span>
            </motion.div>
          )}

          {errorMsg && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-5 bg-destructive/10 border border-destructive/20 text-destructive rounded-xl mb-8 flex items-center gap-3.5 text-sm font-semibold shadow-sm"
            >
              <AlertCircle className="w-5 h-5 bg-destructive text-white rounded-full p-0.5 shrink-0" />
              <span>{errorMsg}</span>
            </motion.div>
          )}

          <div className="flex flex-col gap-8">
            
            {/* Section tabs */}
            <div className="flex p-1 bg-foreground/5 rounded-lg border border-foreground/10 self-start">
              {(['Filmmaking', 'Marketing'] as const).map((sec) => (
                <button
                  key={sec}
                  onClick={() => { setActiveSection(sec); setEditingId(null); }}
                  className={`px-6 py-2.5 rounded-md text-[10px] uppercase tracking-wider font-bold transition-all cursor-pointer ${
                    activeSection === sec
                      ? 'bg-card text-foreground shadow-sm'
                      : 'text-foreground/50 hover:text-foreground hover:bg-foreground/5'
                  }`}
                >
                  {sec}
                </button>
              ))}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
              {/* Left Column: Add Category Form */}
              <div className="md:col-span-5 glass border border-foreground/10 bg-card/65 rounded-xl p-6 sm:p-8 text-left">
                <h3 className="text-xs uppercase tracking-[0.2em] font-bold text-foreground/60 border-b border-foreground/10 pb-2 mb-6 text-left">
                  Create Category
                </h3>
                <form onSubmit={handleAddSubmit} className="flex flex-col gap-4 text-left">
                  <div className="flex flex-col gap-2 text-left">
                    <label className="text-[9px] uppercase tracking-[0.2em] text-foreground/60 font-bold">Category Name</label>
                    <input
                      required
                      type="text"
                      value={newCatName}
                      onChange={(e) => setNewCatName(e.target.value)}
                      placeholder="e.g. Narrative, Brand Identity"
                      className="bg-transparent border-b border-foreground/15 focus:border-primary outline-none py-2.5 text-sm text-foreground"
                    />
                  </div>
                  
                  <button
                    type="submit"
                    disabled={createMutation.isPending}
                    className="flex items-center justify-center gap-2 mt-4 py-3.5 bg-primary hover:bg-primary/95 text-primary-foreground font-semibold tracking-widest uppercase text-[10px] rounded shadow-md transition-all cursor-pointer disabled:opacity-50"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Create Category</span>
                  </button>
                </form>
              </div>

              {/* Right Column: Categories List */}
              <div className="md:col-span-7 glass border border-foreground/10 bg-card/65 rounded-xl p-6 sm:p-8 text-left">
                <h3 className="text-xs uppercase tracking-[0.2em] font-bold text-foreground/60 border-b border-foreground/10 pb-2 mb-6 text-left">
                  Active {activeSection} Categories
                </h3>

                {isLoading ? (
                  <div className="py-12 flex flex-col items-center gap-3">
                    <div className="w-6 h-6 border-2 border-foreground/10 border-t-primary rounded-full animate-spin"></div>
                    <span className="text-[8px] uppercase tracking-[0.2em] text-foreground/40 font-semibold animate-pulse">Loading categories...</span>
                  </div>
                ) : error ? (
                  <div className="py-12 text-center text-destructive text-sm font-light">
                    Error loading categories.
                  </div>
                ) : filteredCategories.length === 0 ? (
                  <div className="py-12 text-center text-foreground/40 text-xs tracking-wider uppercase">
                    No categories found.
                  </div>
                ) : (
                  <div className="flex flex-col divide-y divide-foreground/10">
                    {filteredCategories.map((cat) => {
                      const isEditing = editingId === cat.id;
                      return (
                        <div key={cat.id} className="py-4.5 flex items-center justify-between gap-4">
                          {isEditing ? (
                            <div className="flex-1 flex items-center gap-2.5">
                              <input
                                required
                                type="text"
                                value={editingName}
                                onChange={(e) => setEditingName(e.target.value)}
                                className="flex-1 bg-transparent border-b border-primary focus:outline-none py-1 text-sm text-foreground"
                              />
                              <button
                                onClick={() => saveEdit(cat.id)}
                                disabled={updateMutation.isPending}
                                className="p-1.5 hover:bg-emerald-500/10 text-emerald-600 rounded-md transition-colors cursor-pointer"
                                title="Save name"
                              >
                                <Check className="w-4 h-4" />
                              </button>
                              <button
                                onClick={cancelEdit}
                                className="p-1.5 hover:bg-foreground/10 text-foreground/50 rounded-md transition-colors cursor-pointer"
                                title="Cancel edit"
                              >
                                <X className="w-4 h-4" />
                              </button>
                            </div>
                          ) : (
                            <>
                              <div className="flex items-center gap-3">
                                <Tag className="w-4 h-4 text-primary" />
                                <span className="text-sm font-semibold tracking-wide text-foreground">{cat.name}</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <button
                                  onClick={() => startEditing(cat)}
                                  className="p-2 hover:bg-foreground/5 text-foreground/50 hover:text-foreground rounded-md transition-colors cursor-pointer"
                                  title="Rename category"
                                >
                                  <Edit2 className="w-3.5 h-3.5" />
                                </button>
                                <button
                                  onClick={() => handleDelete(cat)}
                                  className="p-2 hover:bg-destructive/10 text-destructive/70 hover:text-destructive rounded-md transition-colors cursor-pointer"
                                  title="Delete category"
                                >
                                  <Trash2 className="w-3.5 h-3.5" />
                                </button>
                              </div>
                            </>
                          )}
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>

          </div>
        </main>
      </div>
    </div>
  );
}
