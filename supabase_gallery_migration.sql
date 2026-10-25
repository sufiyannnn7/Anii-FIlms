-- Migration: Add gallery_urls column to public.projects table
ALTER TABLE public.projects
ADD COLUMN IF NOT EXISTS gallery_urls TEXT[];
