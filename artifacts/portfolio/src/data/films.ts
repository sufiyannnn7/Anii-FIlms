export interface FilmProject {
  slug: string;
  title: string;
  category: string;
  year: number;
  shortDescription: string;
  posterUrl: string;
  heroUrl: string;
  videoEmbedUrl: string;
  overview: string;
  challenge: string;
  creativeProcess: string;
  galleryUrls: string[];
  credits: { role: string; name: string }[];
  relatedSlugs: string[];
}

export const films: FilmProject[] = [
  {
    slug: 'neon-echoes',
    title: 'Neon Echoes',
    category: 'Cinematography',
    year: 2023,
    shortDescription: 'A sci-fi short exploring memory and identity in a cybernetic future.',
    posterUrl: '/attached_assets/generated_images/film_1_poster.jpg',
    heroUrl: '/attached_assets/generated_images/film_1_poster.jpg',
    videoEmbedUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=0&controls=1&rel=0',
    overview: 'Neon Echoes is an atmospheric exploration of human consciousness wrapped in a neo-noir aesthetic. Shot entirely on location in Tokyo, the film blends practical cyberpunk elements with intimate character drama.',
    challenge: 'The primary challenge was creating a futuristic world entirely in-camera, relying on practical lighting and real locations rather than heavy VFX. We had limited nights to capture the citys kinetic energy.',
    creativeProcess: 'We embraced anamorphic lenses and a vibrant neon palette (teal and deep red) to contrast with the dark, rainy environments. The lighting was meticulously planned to reflect the internal state of the protagonist.',
    galleryUrls: [
      '/attached_assets/generated_images/film_1_poster.jpg',
      '/attached_assets/generated_images/filmmaking_bg.jpg'
    ],
    credits: [
      { role: 'Director', name: 'Julian Vance' },
      { role: 'Cinematographer', name: 'Elena Rostova' },
      { role: 'Composer', name: 'Kaelen Silva' }
    ],
    relatedSlugs: ['midnight-run', 'velvet-skies']
  },
  {
    slug: 'midnight-run',
    title: 'Midnight Run',
    category: 'Videography',
    year: 2024,
    shortDescription: 'High-octane commercial campaign for a luxury automotive brand.',
    posterUrl: '/attached_assets/generated_images/film_3_poster.jpg',
    heroUrl: '/attached_assets/generated_images/film_3_poster.jpg',
    videoEmbedUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=0&controls=1&rel=0',
    overview: 'Commissioned by a leading luxury automotive manufacturer, Midnight Run emphasizes performance, elegance, and raw power. The visual language speaks to thrill-seekers and design aficionados alike.',
    challenge: 'Capturing high-speed pursuits while maintaining a luxurious, cinematic look. The cars glossy finish needed to reflect the environment dynamically without looking like standard commercial lighting.',
    creativeProcess: 'We utilized a Russian Arm camera car and shot primarily during blue hour and magic hour in the desert. The grading leans heavily into contrasty, cinematic tones rather than typical bright commercial looks.',
    galleryUrls: [
      '/attached_assets/generated_images/film_3_poster.jpg',
      '/attached_assets/generated_images/hero_bg.jpg'
    ],
    credits: [
      { role: 'Director', name: 'Julian Vance' },
      { role: 'Client', name: 'Aero Automotive' },
      { role: 'VFX', name: 'Studio X' }
    ],
    relatedSlugs: ['neon-echoes']
  },
  {
    slug: 'velvet-skies',
    title: 'Velvet Skies',
    category: 'Cinematography',
    year: 2022,
    shortDescription: 'A surreal visual journey accompanying the hit indie track.',
    posterUrl: '/attached_assets/generated_images/film_2_poster.jpg',
    heroUrl: '/attached_assets/generated_images/film_2_poster.jpg',
    videoEmbedUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=0&controls=1&rel=0',
    overview: 'A dreamlike narrative music video that translates sonic textures into visual landscapes. Velvet Skies is a mood piece relying heavily on production design and fluid camera movement.',
    challenge: 'The artist wanted a continuous feeling of falling and floating without relying on wirework or heavy green screen. We had to achieve the dream state through camera mechanics.',
    creativeProcess: 'We built a rotating room set and used motion control rigs to create disorienting but smooth perspectives, keeping the viewer in a constant state of mesmerized suspension.',
    galleryUrls: [
      '/attached_assets/generated_images/film_2_poster.jpg',
      '/attached_assets/generated_images/hero_bg.jpg'
    ],
    credits: [
      { role: 'Director', name: 'Julian Vance' },
      { role: 'Artist', name: 'Luna Rae' },
      { role: 'Production Designer', name: 'Marcus Thorne' }
    ],
    relatedSlugs: ['neon-echoes', 'midnight-run']
  },
  {
    slug: 'the-craft-bts',
    title: 'The Craft: Behind The Lens',
    category: 'Videography',
    year: 2023,
    shortDescription: 'An intimate look at the chaos and beauty of a film set.',
    posterUrl: '/attached_assets/generated_images/filmmaking_bg.jpg',
    heroUrl: '/attached_assets/generated_images/filmmaking_bg.jpg',
    videoEmbedUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=0&controls=1&rel=0',
    overview: 'A documentary short exploring the unspoken communication and intense pressure between departments on a large-scale feature film set.',
    challenge: 'Staying invisible while capturing the most vulnerable and tense moments of a 100-person crew working against the clock.',
    creativeProcess: 'Shot entirely handheld on 16mm film to give it a raw, tactile documentary feel, contrasting with the pristine digital footage of the actual production being filmed.',
    galleryUrls: [
      '/attached_assets/generated_images/filmmaking_bg.jpg',
      '/attached_assets/generated_images/film_1_poster.jpg'
    ],
    credits: [
      { role: 'Director & DP', name: 'Julian Vance' },
      { role: 'Editor', name: 'Sarah Lin' }
    ],
    relatedSlugs: []
  }
];
