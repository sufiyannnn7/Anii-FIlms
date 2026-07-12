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
    linkedin: string;
  };
}

export const profile: Profile = {
  name: 'Julian Vance',
  role: 'Creative Director & Filmmaker',
  tagline: 'Strategic Marketing Meets Cinematic Storytelling',
  bio: 'Driven by curiosity and built through creativity, I\'m passionate about marketing, branding, and building ideas that connect with people. Alongside strategy and digital storytelling, I explore filmmaking, cinematography, and editing to create visuals that combine aesthetics, emotion, and purpose while constantly evolving both creatively and strategically.',
  creativePhilosophy: 'My philosophy is simple: Beautiful visuals mean nothing if they don\'t serve a clear business objective. I bridge the gap between creative execution and marketing strategy. When approaching a new task, I don\'t start with the camera. I start with the audience, the business objective, and the story.',
  skills: {
    marketing: [
      'Brand Strategy',
      'Creative Direction',
      'Campaign Development',
      'Social Media Strategy',
      'Content Marketing',
      'Audience Psychology'
    ],
    filmmaking: [
      'Cinematography',
      'Directing',
      'Video Editing (Premiere/Resolve)',
      'Color Grading',
      'Lighting Design',
      'Visual Storytelling'
    ]
  },
  timeline: [
    {
      year: '2021 - Present',
      title: 'Independent Creative Director',
      company: 'Studio Vance',
      description: 'Consulting for luxury and tech brands, directing commercial campaigns, and developing brand architectures.'
    },
    {
      year: '2018 - 2021',
      title: 'Head of Visual Strategy',
      company: 'Oculus Agency',
      description: 'Led a team of 12 creatives bridging the gap between performance marketing and high-end brand storytelling.'
    },
    {
      year: '2015 - 2018',
      title: 'Cinematographer & Editor',
      company: 'Freelance',
      description: 'Shot and edited short films, music videos, and digital content for emerging artists and boutique brands.'
    }
  ],
  socials: {
    email: 'hello@julianvance.com',
    instagram: 'https://instagram.com',
    linkedin: 'https://linkedin.com'
  }
};
