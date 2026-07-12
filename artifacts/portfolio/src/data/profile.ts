export interface Profile {
  name: string;
  role: string;
  tagline: string;
  bio: string;
  creativePhilosophy: string;
  skills: {
    marketing: string[];
    filmmaking: string[];
  };
  timeline: {
    year: string;
    title: string;
    company: string;
    description: string;
  }[];
  socials: {
    email: string;
    instagram: string;
    whatsapp: string;
  };
}

export const profile: Profile = {
  name: 'Anii Films',
  role: 'Filmmaker & Marketing Strategist',
  tagline: 'Strategic Marketing Meets Cinematic Storytelling',
  bio: 'Driven by curiosity and built through creativity, I\'m passionate about marketing, branding, and building ideas that connect with people. Alongside strategy and digital storytelling, I explore filmmaking, cinematography, and editing to create visuals that combine aesthetics, emotion, and purpose while constantly evolving both creatively and strategically.',
  creativePhilosophy: 'My philosophy is simple: beautiful visuals mean nothing if they don\'t serve a clear business objective. I bridge the gap between creative execution and marketing strategy. When approaching a new task, I don\'t start with the camera; I start with the consumer. By understanding audience psychology and market gaps, I create content that doesn\'t just look cinematic -- it performs with purpose.',
  skills: {
    marketing: [
      'Brand Strategy',
      'Creative Direction',
      'Social Media Strategy',
      'Content Marketing',
      'Digital Campaigns',
      'Audience Psychology'
    ],
    filmmaking: [
      'Cinematography',
      'Directing',
      'Video Editing',
      'Color Grading',
      'Lighting Design',
      'Visual Storytelling'
    ]
  },
  timeline: [
    {
      year: '2021 - Present',
      title: 'Independent Creative Director',
      company: 'Anii Films',
      description: 'Consulting for brands, directing commercial campaigns, and developing brand architectures.'
    }
  ],
  socials: {
    email: 'aniket24007@gmail.com',
    instagram: 'https://instagram.com/_aniifilms',
    whatsapp: 'https://wa.me/919172255729'
  }
};