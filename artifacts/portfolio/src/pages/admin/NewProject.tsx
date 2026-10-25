import React, { useState, useEffect } from 'react';
import Sidebar from '@/components/admin/Sidebar';
import Topbar from '@/components/admin/Topbar';
import { ArrowLeft, Upload, FileVideo, Film, Tag, Check, Image as ImageIcon, AlertCircle, X, Plus, Star, ArrowUp, ArrowDown, Trash2 } from 'lucide-react';
import { Link, useLocation, useRoute } from 'wouter';
import { motion, AnimatePresence } from 'framer-motion';
import { supabase } from '@/lib/supabase';
import { useQuery } from '@tanstack/react-query';

export default function NewProject() {
  const [, setLocation] = useLocation();
  
  // Form fields
  const [title, setTitle] = useState('');
  const [slug, setSlug] = useState('');
  const [shortDesc, setShortDesc] = useState('');
  const [fullDesc, setFullDesc] = useState('');
  const [section, setSection] = useState<'Filmmaking' | 'Marketing'>('Filmmaking');
  const [category, setCategory] = useState('');
  const [catSearch, setCatSearch] = useState('');
  const [catDropdownOpen, setCatDropdownOpen] = useState(false);
  const [featured, setFeatured] = useState<boolean>(false);
  const [status, setStatus] = useState<'Draft' | 'Published'>('Draft');
  const [aspectRatio, setAspectRatio] = useState<string>('Auto');
  const [client, setClient] = useState('');
  const [services, setServices] = useState('');
  const [credits, setCredits] = useState('');
  const [challenge, setChallenge] = useState('');
  const [creativeProcess, setCreativeProcess] = useState('');
  const [displayOrder, setDisplayOrder] = useState<number>(0);
  const [seoTitle, setSeoTitle] = useState('');
  const [seoDescription, setSeoDescription] = useState('');
  
  interface ProjectVideo {
    id?: string;
    title: string;
    description: string;
    source_type: 'youtube' | 'vimeo' | 'mp4';
    video_url?: string;
    youtube_id?: string;
    vimeo_id?: string;
    aspect_ratio: string;
    is_featured: boolean;
    display_order: number;
    // UI Only
    videoInput?: string;
    mp4File?: File | null;
    uploadProgress?: number | null;
  }

  const [videos, setVideos] = useState<ProjectVideo[]>([]);


  // Real file selection and preview states
  const [existingThumbnail, setExistingThumbnail] = useState<string | null>(null);
  const [thumbnailProgress, setThumbnailProgress] = useState<number | null>(null);
  const [existingHero, setExistingHero] = useState<string | null>(null);
  const [heroProgress, setHeroProgress] = useState<number | null>(null);
  const [existingGallery, setExistingGallery] = useState<string[]>([]);
  const [galleryProgress, setGalleryProgress] = useState<number[] | null>(null);
  
  // Submit loader
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Edit Mode variables
  const [match, params] = useRoute('/admin/projects/edit/:id');
  const isEdit = !!match && !!params?.id;
  const projectId = params?.id;
  const [recordLoading, setRecordLoading] = useState(false);

  // Reset category search on section change if creating a new project
  useEffect(() => {
    if (!isEdit) {
      setCategory('');
      setCatSearch('');
    }
  }, [section]);

  // Fetch existing project record if in Edit Mode
  useEffect(() => {
    if (!isEdit || !projectId) return;

    async function loadProjectDetails() {
      setRecordLoading(true);
      setError(null);
      try {
        let { data, error: fetchError } = await supabase
          .from('projects')
          .select('*, project_videos(*)')
          .eq('id', projectId)
          .single();
          
        if (fetchError && fetchError.message.includes('relationship')) {
          console.warn('project_videos relationship not found, falling back to flat query');
          const fallback = await supabase
            .from('projects')
            .select('*')
            .eq('id', projectId)
            .single();
          data = fallback.data;
          fetchError = fallback.error;
        }

        if (fetchError) {
          throw fetchError;
        }

        if (data) {
          setTitle(data.title || '');
          setSlug(data.slug || '');
          setShortDesc(data.short_description || '');
          setFullDesc(data.description || '');
          setSection(data.section || 'Filmmaking');
          setCategory(data.category || '');
          setCatSearch(data.category || '');
          setFeatured(!!data.featured);
          setStatus((data.status || 'Draft') as 'Draft' | 'Published');
          setExistingThumbnail(data.thumbnail || null);
          setExistingHero(data.hero_image || null);
          setExistingGallery(data.gallery_urls || []);
          setAspectRatio(data.aspect_ratio || 'Auto');
          setClient(data.client || '');
          setServices(data.services || '');
          setCredits(data.credits || '');
          setChallenge(data.challenge || '');
          setCreativeProcess(data.creativeProcess || data.creative_process || '');
          setDisplayOrder(data.display_order || 0);
          setSeoTitle(data.seo_title || '');
          setSeoDescription(data.seo_description || '');
          
          if (data.project_videos && data.project_videos.length > 0) {
            setVideos(data.project_videos.sort((a: any,b: any) => a.display_order - b.display_order).map((v: any) => ({
                id: v.id,
                title: v.title || '',
                description: v.description || '',
                source_type: v.source_type,
                video_url: v.video_url || '',
                youtube_id: v.youtube_id || '',
                vimeo_id: v.vimeo_id || '',
                aspect_ratio: v.aspect_ratio || 'Auto',
                is_featured: !!v.is_featured,
                display_order: v.display_order,
                videoInput: v.source_type === 'youtube' && v.youtube_id ? `https://youtube.com/watch?v=${v.youtube_id}` : v.source_type === 'vimeo' && v.vimeo_id ? `https://vimeo.com/${v.vimeo_id}` : '',
                uploadProgress: null
            })));
          } else if (data.video_type && data.video_type !== 'none') {
            setVideos([{
                title: data.title + ' Video',
                description: '',
                source_type: data.video_type as any,
                video_url: data.video_url || '',
                youtube_id: data.youtube_id || '',
                vimeo_id: data.vimeo_id || '',
                aspect_ratio: 'Auto',
                is_featured: true,
                display_order: 0,
                videoInput: data.video_type === 'youtube' && data.youtube_id ? `https://youtube.com/watch?v=${data.youtube_id}` : data.video_type === 'vimeo' && data.vimeo_id ? `https://vimeo.com/${data.vimeo_id}` : '',
            }]);
          }
        }
      } catch (err: any) {
        setError(`Failed to fetch project details: ${err.message}`);
      } finally {
        setRecordLoading(false);
      }
    }

    loadProjectDetails();
  }, [isEdit, projectId]);

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setTitle(val);
    
    // Auto slug creation only if not in edit mode, or if slug is currently empty
    if (!isEdit || !slug) {
      const generatedSlug = val
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9\s-]/g, '')
        .replace(/[\s_]+/g, '-')
        .replace(/-+/g, '-');
      setSlug(generatedSlug);
    }
  };

  const validateFile = (file: File) => {
    const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
    if (!validTypes.includes(file.type)) {
      throw new Error(`Invalid file type: ${file.name}. Only JPG, JPEG, PNG, and WEBP images are allowed.`);
    }
    const maxSize = 10 * 1024 * 1024; // 10 MB
    if (file.size > maxSize) {
      throw new Error(`File too large: ${file.name}. Maximum size limit is 10 MB.`);
    }
    return true;
  };

  const handleAddVideo = () => {
    setVideos(prev => [...prev, {
      title: '',
      description: '',
      source_type: 'youtube',
      aspect_ratio: 'Auto',
      is_featured: prev.length === 0,
      display_order: prev.length,
      videoInput: ''
    }]);
  };

  const handleRemoveVideo = (index: number) => {
    setVideos(prev => {
      const next = prev.filter((_, i) => i !== index);
      // Re-evaluate featured
      if (prev[index].is_featured && next.length > 0) {
        next[0].is_featured = true;
      }
      return next;
    });
  };

  const handleMoveVideo = (index: number, direction: 'up' | 'down') => {
    if (direction === 'up' && index === 0) return;
    if (direction === 'down' && index === videos.length - 1) return;
    
    setVideos(prev => {
      const next = [...prev];
      const targetIndex = direction === 'up' ? index - 1 : index + 1;
      const temp = next[index];
      next[index] = next[targetIndex];
      next[targetIndex] = temp;
      
      // Update display order based on index
      return next.map((v, i) => ({ ...v, display_order: i }));
    });
  };

  const handleSetFeatured = (index: number) => {
    setVideos(prev => prev.map((v, i) => ({
      ...v,
      is_featured: i === index
    })));
  };

  const handleVideoChange = async (index: number, field: string, value: any) => {
    if (field === 'mp4File' && value instanceof File) {
        setVideos(prev => prev.map((v, i) => i === index ? { ...v, uploadProgress: 0 } : v));
        const url = await uploadFileToBucket(value, 'videos', (percent) => {
            setVideos(prev => prev.map((v, i) => i === index ? { ...v, uploadProgress: percent } : v));
        });
        setVideos(prev => prev.map((v, i) => i === index ? { ...v, video_url: url, uploadProgress: null } : v));
    } else {
        setVideos(prev => prev.map((v, i) => i === index ? { ...v, [field]: value } : v));
    }
  };

  const handleThumbnailSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setError(null);
    try {
      validateFile(file);
      const url = await uploadFileToBucket(file, 'thumbnails', () => {});
      setExistingThumbnail(url);
    } catch (err: any) {
      setError(err.message);
    }
  };

  const clearThumbnail = () => {
    setExistingThumbnail(null);
  };

  const handleHeroSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setError(null);
    try {
      validateFile(file);
      const url = await uploadFileToBucket(file, 'hero-images', () => {});
      setExistingHero(url);
    } catch (err: any) {
      setError(err.message);
    }
  };

  const clearHero = () => {
    setExistingHero(null);
  };

  const handleGallerySelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;
    setError(null);
    try {
      const fileArray = Array.from(files);
      const newUrls: string[] = [];
      setGalleryProgress(new Array(fileArray.length).fill(0));
      for (let i = 0; i < fileArray.length; i++) {
        const file = fileArray[i];
        validateFile(file);
        const url = await uploadFileToBucket(file, 'gallery', (percent) => {
          setGalleryProgress(prev => {
            if (!prev) return null;
            const next = [...prev];
            next[i] = percent;
            return next;
          });
        });
        newUrls.push(url);
      }
      setExistingGallery(prev => [...prev, ...newUrls]);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setGalleryProgress(null);
    }
  };



  const removeExistingGallery = (url: string) => {
    setExistingGallery(prev => prev.filter(item => item !== url));
  };

const uploadFileToBucket = async (
    file: File, 
    bucket: string, 
    onProgress: (percent: number) => void
  ): Promise<string> => {
    const cleanFileName = file.name.replace(/[^a-zA-Z0-9.]/g, '_');
    const filePath = `${Date.now()}-${Math.random().toString(36).substr(2, 5)}-${cleanFileName}`;

    // Mock visual progress updates during the upload request
    let currentPercent = 0;
    const progressInterval = setInterval(() => {
      if (currentPercent < 90) {
        currentPercent += Math.floor(Math.random() * 15) + 5;
        if (currentPercent > 90) currentPercent = 90;
        onProgress(currentPercent);
      }
    }, 150);

    try {
      const { data, error: uploadError } = await supabase.storage
        .from(bucket)
        .upload(filePath, file, {
          cacheControl: '3600',
          upsert: false
        });

      clearInterval(progressInterval);

      if (uploadError) {
        throw uploadError;
      }

      onProgress(100);

      const { data: publicUrlData } = supabase.storage
        .from(bucket)
        .getPublicUrl(filePath);

      if (!publicUrlData || !publicUrlData.publicUrl) {
        throw new Error(`Failed to retrieve public URL for ${file.name}`);
      }

      return publicUrlData.publicUrl;
    } catch (err: any) {
      clearInterval(progressInterval);
      throw new Error(`Upload error on ${file.name} in bucket ${bucket}: ${err.message || err}`);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const finalSlug = slug.trim()
        ? slug.toLowerCase().trim().replace(/[^a-z0-9\s-]/g, '').replace(/[\s_]+/g, '-').replace(/-+/g, '-')
        : title.toLowerCase().trim().replace(/[^a-z0-9\s-]/g, '').replace(/[\s_]+/g, '-').replace(/-+/g, '-');

      setSlug(finalSlug);

      // Validate required text fields
      if (!title.trim() || !finalSlug || !shortDesc.trim() || !fullDesc.trim() || !category.trim()) {
        throw new Error('All required text fields must be filled.');
      }

      // Automatically create new category if it doesn't exist
      const normCategory = category.trim();
      const categoryExists = dbCategories.some(
        c => c.name.toLowerCase() === normCategory.toLowerCase()
      );

      if (!categoryExists) {
        const { data: newCat, error: catInsertError } = await supabase
          .from('categories')
          .insert({ name: normCategory, section })
          .select()
          .single();

        if (catInsertError) {
          throw new Error(`Failed to create new category "${normCategory}": ${catInsertError.message}`);
        }
        
        await refetchCategories();
      }

      // 1. Thumbnail is already uploaded
      let finalThumbnailUrl = existingThumbnail;

      // 2. Hero is already uploaded
      let finalHeroUrl = existingHero;

      // 3. Gallery is already uploaded
      const finalGalleryUrls = [...existingGallery];

      // 4. Process Videos
      const processedVideos = [];
      for (let i = 0; i < videos.length; i++) {
        const v = videos[i];
        let finalVideoUrl = v.video_url;
        let finalYoutubeId = v.youtube_id;
        let finalVimeoId = v.vimeo_id;
        
        if (v.source_type === 'youtube' && v.videoInput) {
            const ytMatch = v.videoInput.match(/(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=|shorts\/))((\w|-){11})/);
            finalYoutubeId = ytMatch ? ytMatch[1] : '';
        } else if (v.source_type === 'vimeo' && v.videoInput) {
            const vimeoMatch = v.videoInput.match(/(?:vimeo\.com\/|player\.vimeo\.com\/video\/)(\d+)/);
            finalVimeoId = vimeoMatch ? vimeoMatch[1] : '';
        }

        processedVideos.push({
           id: v.id, // optional
           title: v.title,
           description: v.description,
           source_type: v.source_type,
           video_url: v.source_type === 'mp4' ? finalVideoUrl : null,
           youtube_id: v.source_type === 'youtube' ? finalYoutubeId : null,
           vimeo_id: v.source_type === 'vimeo' ? finalVimeoId : null,
           aspect_ratio: v.aspect_ratio,
           is_featured: v.is_featured,
           display_order: i
        });
      }

      const projectData = {
        title,
        slug: finalSlug,
        category,
        short_description: shortDesc,
        description: fullDesc,
        section,
        featured,
        status,
        thumbnail: finalThumbnailUrl,
        hero_image: finalHeroUrl,
        gallery_urls: finalGalleryUrls,
        aspect_ratio: aspectRatio,
        client: client || null,
        services: services || null,
        credits: credits || null,
        challenge: challenge || null,
        creative_process: creativeProcess || null,
        creativeProcess: creativeProcess || null,
        display_order: Number(displayOrder),
        seo_title: seoTitle || null,
        seo_description: seoDescription || null,
        // Legacy video fields removed, using project_videos
        updated_at: new Date().toISOString()
      };

      let resultError = null;

      if (isEdit) {
        // Update database row
        const { error: updateError } = await supabase
          .from('projects')
          .update(projectData)
          .eq('id', projectId);
        resultError = updateError;

        if (!resultError) {
          const { error: delError } = await supabase.from('project_videos').delete().eq('project_id', projectId);
          if (delError) resultError = delError;
          else if (processedVideos.length > 0) {
            const { error: insError } = await supabase.from('project_videos').insert(processedVideos.map(({id, ...v}) => ({ ...v, project_id: projectId })));
            if (insError) resultError = insError;
          }
        }
      } else {
        // Insert database row
        const { data: newProject, error: insertError } = await supabase
          .from('projects')
          .insert([{
            ...projectData,
            year: new Date().getFullYear().toString()
          }])
          .select()
          .single();
        resultError = insertError;

        if (!resultError && newProject) {
          if (processedVideos.length > 0) {
            const { error: insError } = await supabase.from('project_videos').insert(processedVideos.map(({id, ...v}) => ({ ...v, project_id: newProject.id })));
            if (insError) resultError = insError;
          }
        }
      }

      if (resultError) {
        setError(resultError.message);
      } else {
        setSuccess(true);
        setTimeout(() => {
          setLocation('/admin/projects');
        }, 1500);
      }
    } catch (err: any) {
      setError(err?.message || 'An unexpected error occurred while saving the project.');
      setThumbnailProgress(null);
      setHeroProgress(null);
      setGalleryProgress(null);
    } finally {
      setLoading(false);
    }
  };

  const { data: dbCategories = [], refetch: refetchCategories } = useQuery({
    queryKey: ['admin-categories-list', section],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('categories')
        .select('*')
        .eq('section', section);
      if (error) throw error;
      return data || [];
    }
  });

  const categories = dbCategories.map(c => c.name).sort((a, b) => a.localeCompare(b));

  return (
    <div className="min-h-screen bg-[#f4f3ee] text-foreground flex relative">
      <div className="fixed inset-0 z-0 noise-overlay mix-blend-overlay pointer-events-none"></div>

      {/* Sidebar Panel */}
      <Sidebar />

      {/* Main Work Area */}
      <div className="flex-1 flex flex-col min-w-0 z-10 relative">
        <Topbar title={isEdit ? "Edit Project" : "Add Project"} />

        <main className="flex-1 p-8 overflow-y-auto max-w-4xl w-full mx-auto text-left">
          {/* Back button */}
          <Link href="/admin/projects" className="inline-flex items-center gap-2 text-foreground/45 hover:text-foreground transition-colors text-[10px] uppercase tracking-widest font-bold mb-8">
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Projects</span>
          </Link>

          {/* Page header */}
          <div className="mb-10">
            <h1 className="font-display text-4xl text-foreground mb-2 leading-tight">
              {isEdit ? 'Edit Project' : 'Create Project'}
            </h1>
            <p className="text-sm text-foreground/50 font-light">
              {isEdit 
                ? 'Update details of your creative case study.' 
                : 'Add a new storytelling experience to your creative directory.'}
            </p>
          </div>

          {success && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-5 bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 rounded-xl mb-8 flex items-center gap-3.5 text-sm font-semibold shadow-sm"
            >
              <div className="w-6 h-6 rounded-full bg-emerald-500 text-white flex items-center justify-center shrink-0">
                <Check className="w-3.5 h-3.5" />
              </div>
              <span>Success! Project "{title}" {isEdit ? 'updated' : 'created'}. Redirecting to workspace...</span>
            </motion.div>
          )}

          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-5 bg-destructive/10 border border-destructive/20 text-destructive rounded-xl mb-8 flex items-center gap-3.5 text-sm font-semibold shadow-sm"
            >
              <div className="w-6 h-6 rounded-full bg-destructive text-white flex items-center justify-center shrink-0">
                <AlertCircle className="w-3.5 h-3.5" />
              </div>
              <span>{error}</span>
            </motion.div>
          )}

          {recordLoading ? (
            <div className="glass border border-foreground/10 bg-card/65 rounded-xl p-20 flex flex-col items-center justify-center gap-4">
              <div className="w-8 h-8 border-2 border-foreground/10 border-t-primary rounded-full animate-spin"></div>
              <span className="text-[10px] uppercase tracking-[0.2em] text-foreground/50 font-semibold animate-pulse">Loading Project Details...</span>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="glass border border-foreground/10 bg-card/65 rounded-xl p-8 sm:p-10 shadow-[0_4px_12px_rgba(0,0,0,0.02)] flex flex-col gap-8">
              
              {/* Row 1: Section & Status segment selectors */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                <div className="flex flex-col gap-2">
                  <label className="text-[9px] uppercase tracking-[0.2em] text-foreground/60 font-bold">Section Type</label>
                  <div className="grid grid-cols-2 bg-foreground/5 p-1 rounded-lg border border-foreground/10">
                    <button
                      type="button"
                      onClick={() => setSection('Filmmaking')}
                      className={`py-2 text-[10px] uppercase tracking-wider font-bold rounded-md transition-all flex items-center justify-center gap-2 ${
                        section === 'Filmmaking'
                          ? 'bg-card text-foreground shadow-sm'
                          : 'text-foreground/45 hover:text-foreground'
                      }`}
                    >
                      <Film className="w-3.5 h-3.5" />
                      <span>Filmmaking</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setSection('Marketing')}
                      className={`py-2 text-[10px] uppercase tracking-wider font-bold rounded-md transition-all flex items-center justify-center gap-2 ${
                        section === 'Marketing'
                          ? 'bg-card text-foreground shadow-sm'
                          : 'text-foreground/45 hover:text-foreground'
                      }`}
                    >
                      <Tag className="w-3.5 h-3.5" />
                      <span>Marketing</span>
                    </button>
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-[9px] uppercase tracking-[0.2em] text-foreground/60 font-bold">Publish Status</label>
                  <div className="grid grid-cols-2 bg-foreground/5 p-1 rounded-lg border border-foreground/10">
                    <button
                      type="button"
                      onClick={() => setStatus('Draft')}
                      className={`py-2 text-[10px] uppercase tracking-wider font-bold rounded-md transition-all ${
                        status === 'Draft'
                          ? 'bg-card text-foreground shadow-sm'
                          : 'text-foreground/45 hover:text-foreground'
                      }`}
                    >
                      Draft
                    </button>
                    <button
                      type="button"
                      onClick={() => setStatus('Published')}
                      className={`py-2 text-[10px] uppercase tracking-wider font-bold rounded-md transition-all ${
                        status === 'Published'
                          ? 'bg-card text-foreground shadow-sm'
                          : 'text-foreground/45 hover:text-foreground'
                      }`}
                    >
                      Published
                    </button>
                  </div>
                </div>
              </div>

              {/* Row 2: Title & Slug auto-generator */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                <div className="flex flex-col gap-1.5">
                  <label className="text-[9px] uppercase tracking-[0.2em] text-foreground/60 font-bold">Project Title</label>
                  <input
                    required
                    type="text"
                    value={title}
                    onChange={handleTitleChange}
                    placeholder="Neon Echoes"
                    className="bg-transparent border-b border-foreground/15 focus:border-primary outline-none py-3 text-sm text-foreground placeholder:text-foreground/30 font-light transition-colors"
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-[9px] uppercase tracking-[0.2em] text-foreground/60 font-bold">Slug URL</label>
                  <input
                    required
                    type="text"
                    value={slug}
                    onChange={(e) => setSlug(e.target.value)}
                    placeholder="neon-echoes"
                    className="bg-transparent border-b border-foreground/15 focus:border-primary outline-none py-3 text-sm text-foreground placeholder:text-foreground/30 font-light transition-colors"
                  />
                </div>
              </div>

              {/* Row 3: Category & Featured */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                <div className="flex flex-col gap-1.5 relative">
                  <label className="text-[9px] uppercase tracking-[0.2em] text-foreground/60 font-bold">Category</label>
                  <div className="relative">
                    <input
                      required
                      type="text"
                      value={catSearch}
                      onChange={(e) => {
                        setCatSearch(e.target.value);
                        setCategory(e.target.value);
                        setCatDropdownOpen(true);
                      }}
                      onFocus={() => setCatDropdownOpen(true)}
                      placeholder="Select or type a category..."
                      className="w-full bg-transparent border-b border-foreground/15 focus:border-primary outline-none py-3 text-sm text-foreground/75 placeholder:text-foreground/30 font-light transition-colors"
                    />
                    
                    {catSearch && (
                      <button
                        type="button"
                        onClick={() => {
                          setCatSearch('');
                          setCategory('');
                        }}
                        className="absolute right-2 top-1/2 -translate-y-1/2 text-foreground/40 hover:text-foreground"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>

                  <AnimatePresence>
                    {catDropdownOpen && (
                      <>
                        {/* overlay to capture clicks */}
                        <div 
                          className="fixed inset-0 z-40" 
                          onClick={() => setCatDropdownOpen(false)}
                        />
                        <motion.div
                          initial={{ opacity: 0, y: 5 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 5 }}
                          className="absolute left-0 right-0 top-full mt-1.5 bg-[#f4f3ee] border border-foreground/10 rounded shadow-lg max-h-56 overflow-y-auto z-50 py-1"
                        >
                          {categories
                            .filter(cat => cat.toLowerCase().includes(catSearch.toLowerCase()))
                            .map((cat) => (
                              <button
                                key={cat}
                                type="button"
                                onClick={() => {
                                  setCategory(cat);
                                  setCatSearch(cat);
                                  setCatDropdownOpen(false);
                                }}
                                className="w-full text-left px-4 py-2.5 text-xs uppercase tracking-wider font-semibold hover:bg-foreground/5 text-foreground transition-colors cursor-pointer block"
                              >
                                {cat}
                              </button>
                            ))
                          }

                          {catSearch.trim() && !categories.some(c => c.toLowerCase() === catSearch.trim().toLowerCase()) && (
                            <button
                              type="button"
                              onClick={() => {
                                setCategory(catSearch.trim());
                                setCatDropdownOpen(false);
                              }}
                              className="w-full text-left px-4 py-2.5 text-xs uppercase tracking-wider bg-primary/5 hover:bg-primary/10 text-primary transition-colors cursor-pointer font-bold block border-t border-foreground/5"
                            >
                              Create category: "{catSearch.trim()}"
                            </button>
                          )}

                          {categories.filter(cat => cat.toLowerCase().includes(catSearch.toLowerCase())).length === 0 && !catSearch.trim() && (
                            <div className="px-4 py-3 text-[10px] text-foreground/45 text-center uppercase tracking-widest font-semibold">
                              No categories configured
                            </div>
                          )}
                        </motion.div>
                      </>
                    )}
                  </AnimatePresence>
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-[9px] uppercase tracking-[0.2em] text-foreground/60 font-bold">Grid Card Aspect Ratio</label>
                  <select
                    value={aspectRatio}
                    onChange={(e) => setAspectRatio(e.target.value)}
                    className="w-full bg-transparent border-b border-foreground/15 focus:border-primary outline-none py-3 text-sm text-foreground cursor-pointer"
                  >
                    <option value="Auto">Auto</option>
                    <option value="Landscape">Landscape (16:9)</option>
                    <option value="Portrait">Portrait (4:5)</option>
                    <option value="Square">Square (1:1)</option>
                    <option value="Banner">Banner (21:9)</option>
                  </select>
                </div>
              </div>

              <div className="flex flex-col justify-end pb-3 gap-2">
                <div className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    id="featured"
                    checked={featured}
                    onChange={(e) => setFeatured(e.target.checked)}
                    className="w-4.5 h-4.5 rounded border-foreground/10 text-primary focus:ring-primary accent-primary cursor-pointer"
                  />
                  <label htmlFor="featured" className="text-xs uppercase tracking-[0.15em] font-semibold text-foreground/75 cursor-pointer">
                    Featured Project (Highlight in public sections)
                  </label>
                </div>
              </div>

              {/* Row 4: Descriptions */}
              <div className="flex flex-col gap-5">
                <div className="flex flex-col gap-1.5">
                  <label className="text-[9px] uppercase tracking-[0.2em] text-foreground/60 font-bold">Short Description</label>
                  <input
                    required
                    type="text"
                    value={shortDesc}
                    onChange={(e) => setShortDesc(e.target.value)}
                    placeholder="A sci-fi short exploring memory and identity..."
                    className="bg-transparent border-b border-foreground/15 focus:border-primary outline-none py-3 text-sm text-foreground placeholder:text-foreground/30 font-light transition-colors"
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-[9px] uppercase tracking-[0.2em] text-foreground/60 font-bold">Full Description Overview</label>
                  <textarea
                    required
                    rows={4}
                    value={fullDesc}
                    onChange={(e) => setFullDesc(e.target.value)}
                    placeholder="Provide an overview details of the creative project case study..."
                    className="bg-transparent border-b border-foreground/15 focus:border-primary outline-none py-3 text-sm text-foreground placeholder:text-foreground/30 font-light transition-colors resize-none"
                  />
                </div>

                {/* Creative Details Section */}
                <div className="border-t border-foreground/10 pt-8 flex flex-col gap-6">
                  <h3 className="text-[10px] uppercase tracking-[0.2em] text-foreground font-bold">Premium Layout Details</h3>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                    <div className="flex flex-col gap-1.5 font-sans">
                      <label className="text-[9px] uppercase tracking-[0.2em] text-foreground/60 font-bold">Client</label>
                      <input
                        type="text"
                        value={client}
                        onChange={(e) => setClient(e.target.value)}
                        placeholder="Red Bull / Sony Music"
                        className="bg-transparent border-b border-foreground/15 focus:border-primary outline-none py-3 text-sm text-foreground placeholder:text-foreground/30 font-light transition-colors"
                      />
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <label className="text-[9px] uppercase tracking-[0.2em] text-foreground/60 font-bold">Services / Role</label>
                      <input
                        type="text"
                        value={services}
                        onChange={(e) => setServices(e.target.value)}
                        placeholder="Branding, Strategy, Direction"
                        className="bg-transparent border-b border-foreground/15 focus:border-primary outline-none py-3 text-sm text-foreground placeholder:text-foreground/30 font-light transition-colors"
                      />
                    </div>
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="text-[9px] uppercase tracking-[0.2em] text-foreground/60 font-bold">Credits</label>
                    <textarea
                      rows={2}
                      value={credits}
                      onChange={(e) => setCredits(e.target.value)}
                      placeholder="Director: Aniket | Executive Producer: Sony Music"
                      className="bg-transparent border-b border-foreground/15 focus:border-primary outline-none py-3 text-sm text-foreground placeholder:text-foreground/30 font-light transition-colors resize-none"
                    />
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="text-[9px] uppercase tracking-[0.2em] text-foreground/60 font-bold">The Challenge</label>
                    <textarea
                      rows={3}
                      value={challenge}
                      onChange={(e) => setChallenge(e.target.value)}
                      placeholder="Describe the hurdles and strategic issues faced in this project..."
                      className="bg-transparent border-b border-foreground/15 focus:border-primary outline-none py-3 text-sm text-foreground placeholder:text-foreground/30 font-light transition-colors resize-none"
                    />
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="text-[9px] uppercase tracking-[0.2em] text-foreground/60 font-bold">Creative Process</label>
                    <textarea
                      rows={3}
                      value={creativeProcess}
                      onChange={(e) => setCreativeProcess(e.target.value)}
                      placeholder="Explain the execution plan and workflow details..."
                      className="bg-transparent border-b border-foreground/15 focus:border-primary outline-none py-3 text-sm text-foreground placeholder:text-foreground/30 font-light transition-colors resize-none"
                    />
                  </div>

                  {/* Row 4.5: Ordering & SEO Parameters */}
                  <div className="border-t border-foreground/10 pt-8 flex flex-col gap-6">
                    <h3 className="text-[10px] uppercase tracking-[0.2em] text-foreground font-bold">Metadata & Display Configs</h3>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                      <div className="flex flex-col gap-1.5 font-sans">
                        <label className="text-[9px] uppercase tracking-[0.2em] text-foreground/60 font-bold">Display Order Index (Low values display first)</label>
                        <input
                          type="number"
                          value={displayOrder}
                          onChange={(e) => setDisplayOrder(Number(e.target.value))}
                          placeholder="0"
                          className="bg-transparent border-b border-foreground/15 focus:border-primary outline-none py-3 text-sm text-foreground placeholder:text-foreground/30 font-light transition-colors"
                        />
                      </div>

                      <div className="flex flex-col gap-1.5 font-sans">
                        <label className="text-[9px] uppercase tracking-[0.2em] text-foreground/60 font-bold">Custom SEO Page Title (Optional)</label>
                        <input
                          type="text"
                          value={seoTitle}
                          onChange={(e) => setSeoTitle(e.target.value)}
                          placeholder="Project title | Agency Name"
                          className="bg-transparent border-b border-foreground/15 focus:border-primary outline-none py-3 text-sm text-foreground placeholder:text-foreground/30 font-light transition-colors"
                        />
                      </div>
                    </div>

                    <div className="flex flex-col gap-1.5 font-sans">
                      <label className="text-[9px] uppercase tracking-[0.2em] text-foreground/60 font-bold">Custom SEO Page Description (Optional)</label>
                      <textarea
                        rows={2}
                        value={seoDescription}
                        onChange={(e) => setSeoDescription(e.target.value)}
                        placeholder="Provide customized search engine preview description..."
                        className="bg-transparent border-b border-foreground/15 focus:border-primary outline-none py-3 text-sm text-foreground placeholder:text-foreground/30 font-light transition-colors resize-none"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Row 5: Media Files Browse Previews & Uploads */}
              <div className="border-t border-foreground/10 pt-8 text-left">
                <h3 className="text-[10px] uppercase tracking-[0.2em] text-foreground font-bold mb-6">Media Assets (Supabase Storage)</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  
                  {/* Thumbnail */}
                  <div className="flex flex-col gap-2">
                    <label className="text-[9px] uppercase tracking-[0.25em] text-foreground/60 font-bold">Thumbnail Image</label>
                    <div className="flex items-start gap-4">
                      {existingThumbnail ? (
                        <div className="relative w-36 aspect-[4/5] rounded overflow-hidden border border-foreground/10 bg-secondary group shadow-sm">
                          <img 
                            src={existingThumbnail} 
                            alt="Thumbnail preview" 
                            className="w-full h-full object-cover" 
                          />
                          <button
                            type="button"
                            onClick={clearThumbnail}
                            className="absolute top-2 right-2 p-1.5 bg-black/50 hover:bg-black/75 text-white rounded-full transition-colors cursor-pointer"
                          >
                            <X className="w-3.5 h-3.5" />
                          </button>
                          {thumbnailProgress !== null && (
                            <div className="absolute inset-0 bg-black/60 flex flex-col items-center justify-center p-3 text-center">
                              <span className="text-[8px] uppercase tracking-wider text-white/75 font-semibold mb-1">Uploading</span>
                              <div className="w-full bg-white/20 h-1 rounded-full overflow-hidden">
                                <div className="bg-primary h-full transition-all duration-150" style={{ width: `${thumbnailProgress}%` }}></div>
                              </div>
                              <span className="text-[9px] text-white font-bold mt-1">{thumbnailProgress}%</span>
                            </div>
                          )}
                        </div>
                      ) : (
                        <label className="flex flex-col items-center justify-center w-36 aspect-[4/5] bg-foreground/5 hover:bg-foreground/[0.08] border border-dashed border-foreground/20 rounded-lg cursor-pointer transition-all p-4 text-center">
                          <ImageIcon className="w-6 h-6 text-foreground/35 mb-2" />
                          <span className="text-[9px] uppercase tracking-wider text-foreground/50 font-bold">Choose Image</span>
                          <input 
                            type="file" 
                            accept="image/*" 
                            onChange={handleThumbnailSelect} 
                            className="hidden" 
                          />
                        </label>
                      )}
                    </div>
                  </div>

                  {/* Hero */}
                  <div className="flex flex-col gap-2">
                    <label className="text-[9px] uppercase tracking-[0.25em] text-foreground/60 font-bold">Hero Banner Image</label>
                    <div className="flex items-start gap-4">
                      {existingHero ? (
                        <div className="relative w-full max-w-md aspect-[16/9] rounded-lg overflow-hidden border border-foreground/10 bg-secondary group shadow-sm">
                          <img 
                            src={existingHero} 
                            alt="Hero preview" 
                            className="w-full h-full object-cover" 
                          />
                          <button
                            type="button"
                            onClick={clearHero}
                            className="absolute top-2 right-2 p-1.5 bg-black/50 hover:bg-black/75 text-white rounded-full transition-colors cursor-pointer"
                          >
                            <X className="w-3.5 h-3.5" />
                          </button>
                          {heroProgress !== null && (
                            <div className="absolute inset-0 bg-black/60 flex flex-col items-center justify-center p-4 text-center">
                              <span className="text-[8px] uppercase tracking-wider text-white/75 font-semibold mb-1">Uploading</span>
                              <div className="w-1/2 bg-white/20 h-1.5 rounded-full overflow-hidden">
                                <div className="bg-primary h-full transition-all duration-150" style={{ width: `${heroProgress}%` }}></div>
                              </div>
                              <span className="text-[9px] text-white font-bold mt-1.5">{heroProgress}%</span>
                            </div>
                          )}
                        </div>
                      ) : (
                        <label className="flex flex-col items-center justify-center w-full max-w-md aspect-[16/9] bg-foreground/5 hover:bg-foreground/[0.08] border border-dashed border-foreground/20 rounded-lg cursor-pointer transition-all p-6 text-center">
                          <ImageIcon className="w-6 h-6 text-foreground/35 mb-2" />
                          <span className="text-[9px] uppercase tracking-wider text-foreground/50 font-bold">Choose Banner</span>
                          <input 
                            type="file" 
                            accept="image/*" 
                            onChange={handleHeroSelect} 
                            className="hidden" 
                          />
                        </label>
                      )}
                    </div>
                  </div>

                  {/* Gallery Images (Multiple) */}
                  <div className="flex flex-col gap-2 md:col-span-2">
                    <label className="text-[9px] uppercase tracking-[0.25em] text-foreground/60 font-bold">Gallery Images</label>
                    <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 gap-4">
                      {/* Existing Gallery Images */}
                      {existingGallery.map((url, index) => (
                        <div key={`existing-${index}`} className="relative aspect-square rounded overflow-hidden border border-foreground/10 bg-secondary shadow-sm group">
                          <img src={url} alt="Gallery item" className="w-full h-full object-cover" />
                          <button
                            type="button"
                            onClick={() => removeExistingGallery(url)}
                            className="absolute top-1.5 right-1.5 p-1 bg-black/50 hover:bg-black/75 text-white rounded-full transition-colors cursor-pointer"
                          >
                            <X className="w-3 h-3" />
                          </button>
                        </div>
                      ))}



                      {/* Add New Selector */}
                      <label className="flex flex-col items-center justify-center aspect-square bg-foreground/5 hover:bg-foreground/[0.08] border border-dashed border-foreground/20 rounded cursor-pointer transition-all p-3 text-center">
                        <Upload className="w-5 h-5 text-foreground/35 mb-1" />
                        <span className="text-[8px] uppercase tracking-wider text-foreground/50 font-bold leading-tight">Add Images</span>
                        <input 
                          type="file" 
                          accept="image/*" 
                          multiple 
                          onChange={handleGallerySelect} 
                          className="hidden" 
                        />
                      </label>
                    </div>
                  </div>

                  {/* Project Videos Section */}
                  <div className="md:col-span-2 flex flex-col gap-4 mt-8 pt-8 border-t border-foreground/10">
                    <div className="flex justify-between items-center">
                      <label className="text-[9px] uppercase tracking-[0.25em] text-foreground/60 font-bold">Project Videos</label>
                      <button type="button" onClick={handleAddVideo} className="flex items-center gap-1.5 px-3 py-1.5 bg-foreground text-background text-[9px] uppercase tracking-widest font-bold rounded hover:bg-foreground/80 transition-colors">
                        <Plus className="w-3 h-3" />
                        <span>Add Video</span>
                      </button>
                    </div>

                    {videos.length === 0 ? (
                      <div className="p-8 border border-dashed border-foreground/20 rounded-lg text-center text-foreground/50 text-sm font-light">
                        No videos added. The video section will be hidden.
                      </div>
                    ) : (
                      <div className="flex flex-col gap-6">
                        {videos.map((video, index) => (
                          <div key={index} className={`p-5 rounded-lg border transition-all ${video.is_featured ? 'border-primary bg-primary/5 shadow-md shadow-primary/10' : 'border-foreground/15 bg-secondary/50'}`}>
                            <div className="flex justify-between items-start mb-4">
                              <div className="flex items-center gap-3">
                                <span className="w-6 h-6 rounded-full bg-foreground/10 text-foreground text-xs font-bold flex items-center justify-center">{index + 1}</span>
                                <button type="button" onClick={() => handleSetFeatured(index)} className={`flex items-center gap-1.5 px-2 py-1 rounded text-[10px] uppercase tracking-wider font-bold transition-colors ${video.is_featured ? 'bg-primary text-primary-foreground' : 'bg-foreground/5 hover:bg-foreground/10 text-foreground/60'}`}>
                                  <Star className={`w-3 h-3 ${video.is_featured ? 'fill-current' : ''}`} />
                                  <span>{video.is_featured ? 'Featured' : 'Make Featured'}</span>
                                </button>
                              </div>
                              <div className="flex items-center gap-2">
                                <button type="button" onClick={() => handleMoveVideo(index, 'up')} disabled={index === 0} className="p-1.5 rounded hover:bg-foreground/10 text-foreground/60 disabled:opacity-30 transition-colors"><ArrowUp className="w-4 h-4" /></button>
                                <button type="button" onClick={() => handleMoveVideo(index, 'down')} disabled={index === videos.length - 1} className="p-1.5 rounded hover:bg-foreground/10 text-foreground/60 disabled:opacity-30 transition-colors"><ArrowDown className="w-4 h-4" /></button>
                                <button type="button" onClick={() => handleRemoveVideo(index)} className="p-1.5 rounded hover:bg-destructive/10 text-destructive/80 transition-colors ml-2"><Trash2 className="w-4 h-4" /></button>
                              </div>
                            </div>
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                              <div className="flex flex-col gap-1.5">
                                <label className="text-[9px] uppercase tracking-[0.2em] text-foreground/60 font-bold">Video Title</label>
                                <input type="text" value={video.title} onChange={(e) => handleVideoChange(index, 'title', e.target.value)} placeholder="Main Film" className="bg-transparent border-b border-foreground/15 focus:border-primary outline-none py-2 text-sm text-foreground placeholder:text-foreground/30 font-light transition-colors" />
                              </div>
                              <div className="flex flex-col gap-1.5">
                                <label className="text-[9px] uppercase tracking-[0.2em] text-foreground/60 font-bold">Aspect Ratio</label>
                                <select value={video.aspect_ratio} onChange={(e) => handleVideoChange(index, 'aspect_ratio', e.target.value)} className="bg-transparent border-b border-foreground/15 focus:border-primary outline-none py-2 text-sm text-foreground cursor-pointer">
                                  <option value="Auto">Auto (Preserve)</option>
                                  <option value="16:9">16:9 (Standard)</option>
                                  <option value="9:16">9:16 (Vertical/Reels)</option>
                                  <option value="1:1">1:1 (Square)</option>
                                  <option value="4:5">4:5 (Portrait)</option>
                                  <option value="21:9">21:9 (Cinematic)</option>
                                </select>
                              </div>
                              <div className="flex flex-col gap-1.5 md:col-span-2">
                                <label className="text-[9px] uppercase tracking-[0.2em] text-foreground/60 font-bold">Source Type</label>
                                <select value={video.source_type} onChange={(e) => { handleVideoChange(index, 'source_type', e.target.value); handleVideoChange(index, 'videoInput', ''); }} className="bg-transparent border-b border-foreground/15 focus:border-primary outline-none py-2 text-sm text-foreground cursor-pointer">
                                  <option value="youtube">YouTube Embed</option>
                                  <option value="vimeo">Vimeo Embed</option>
                                  <option value="mp4">Direct MP4 Upload</option>
                                </select>
                              </div>

                              <div className="md:col-span-2">
                                {(video.source_type === 'youtube' || video.source_type === 'vimeo') && (
                                  <div className="flex flex-col gap-1.5">
                                    <label className="text-[9px] uppercase tracking-[0.2em] text-foreground/60 font-bold">{video.source_type === 'youtube' ? 'YouTube' : 'Vimeo'} URL</label>
                                    <input type="text" value={video.videoInput || ''} onChange={(e) => handleVideoChange(index, 'videoInput', e.target.value)} placeholder={`Paste ${video.source_type === 'youtube' ? 'YouTube' : 'Vimeo'} link here...`} className="bg-transparent border-b border-foreground/15 focus:border-primary outline-none py-2 text-sm text-foreground placeholder:text-foreground/30 font-light transition-colors" />
                                  </div>
                                )}
                                
                                {video.source_type === 'mp4' && (
                                  <div className="border border-dashed border-foreground/15 rounded p-5 flex flex-col items-center justify-center gap-2 bg-background/50 relative mt-2">
                                    {video.video_url ? (
                                      <div className="flex items-center justify-between w-full bg-foreground/5 px-4 py-2 rounded">
                                        <span className="text-xs text-foreground/80 font-medium truncate max-w-[200px]">{video.video_url.split('/').pop() || 'Uploaded Video'}</span>
                                        <button type="button" onClick={() => { handleVideoChange(index, 'video_url', ''); }} className="text-foreground/40 hover:text-destructive transition-colors"><X className="w-4 h-4" /></button>
                                      </div>
                                    ) : (
                                      <div className="relative w-full text-center py-2">
                                        <input type="file" accept="video/mp4,video/quicktime,video/webm" onChange={async (e) => { 
                                          const file = e.target.files?.[0];
                                          if (file) { 
                                            if (file.size > 104857600) { 
                                              alert("File size exceeds 100MB limit."); 
                                              return; 
                                            } 
                                            try {
                                              const url = await uploadFileToBucket(file, 'videos', (percent) => {
                                                setVideos(prev => {
                                                  const newVideos = [...prev];
                                                  newVideos[index].uploadProgress = percent;
                                                  return newVideos;
                                                });
                                              });
                                              handleVideoChange(index, 'video_url', url);
                                            } catch (err: any) {
                                              alert(`Failed to upload video: ${err.message}`);
                                            } finally {
                                              setVideos(prev => {
                                                const newVideos = [...prev];
                                                newVideos[index].uploadProgress = null;
                                                return newVideos;
                                              });
                                            }
                                          } 
                                        }} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10" />
                                        <button type="button" className="inline-flex items-center gap-2 px-5 py-2 text-[10px] font-bold uppercase tracking-widest bg-foreground text-background rounded hover:bg-foreground/90 transition-colors"><Upload className="w-3.5 h-3.5" /> Select MP4 (Max 100MB)</button>
                                      </div>
                                    )}
                                    {video.uploadProgress !== null && video.uploadProgress !== undefined && (
                                      <div className="absolute inset-x-0 bottom-0 h-1 bg-foreground/10 rounded-b overflow-hidden"><div className="h-full bg-emerald-500 transition-all duration-300" style={{ width: `${video.uploadProgress}%` }} /></div>
                                    )}
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                </div>
              </div>
              {/* Submit Block */}
              <div className="border-t border-foreground/10 pt-8 flex items-center justify-end">
                <motion.button
                  type="submit"
                  disabled={loading || success}
                  whileHover={{ scale: loading || success ? 1 : 1.01 }}
                  whileTap={{ scale: loading || success ? 1 : 0.99 }}
                  className="flex items-center justify-center gap-2.5 px-8 py-4 bg-primary hover:bg-primary/95 text-primary-foreground font-semibold tracking-widest uppercase text-[10px] rounded-md shadow-md transition-all cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? (
                    <>
                      <div className="w-3.5 h-3.5 border-2 border-primary-foreground/20 border-t-primary-foreground rounded-full animate-spin"></div>
                      <span>{isEdit ? 'Updating...' : 'Saving...'}</span>
                    </>
                  ) : success ? (
                    <>
                      <Check className="w-3.5 h-3.5" />
                      <span>{isEdit ? 'Updated!' : 'Saved!'}</span>
                    </>
                  ) : (
                    <span>{isEdit ? 'Update Project' : 'Save Project'}</span>
                  )}
                </motion.button>
              </div>

            </form>
          )}
        </main>
      </div>
    </div>
  );
}
