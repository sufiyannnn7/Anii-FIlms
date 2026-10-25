import { useEffect } from "react";
import { supabase } from "./lib/supabase";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Router } from "./Router";
import { AuthProvider } from "./lib/auth-context";
import { useSiteSettings } from "./lib/settings";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      gcTime: 10 * 60 * 1000, // 10 minutes (cacheTime is deprecated in v5, using gcTime)
      refetchOnWindowFocus: false, // Don't refetch on tab switch to prevent layout shifts/flickers
      retry: 1, // Only retry once on failure to prevent spamming the database
    },
  },
});

function AppContent() {
  const { data: settings } = useSiteSettings();

  useEffect(() => {
    if (settings) {
      document.title = settings.meta_title || settings.brand_name;
      
      const metaDesc = document.querySelector('meta[name="description"]');
      if (metaDesc) {
        metaDesc.setAttribute('content', settings.meta_description || '');
      }

      const favicon = document.querySelector('link[rel="icon"]');
      if (favicon && settings.favicon_url) {
        favicon.setAttribute('href', settings.favicon_url);
      }
    }
  }, [settings]);

  return <Router />;
}

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </QueryClientProvider>
  );
}