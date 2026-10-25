export interface MarketingCaseStudy {
  slug: string;
  campaignName: string;
  brand: string;
  category: string;
  year: number;
  shortDescription: string;
  heroUrl: string;
  challenge: string;
  strategy: string;
  execution: string;
  outcome: string;
  galleryUrls: string[];
  videoUrl?: string;
  relatedSlugs: string[];
}

export const marketing: MarketingCaseStudy[] = [
  {
    slug: 'aura-rebrand',
    campaignName: 'Aura Skincare Rebrand',
    brand: 'Aura Botanicals',
    category: 'Brand Identity System',
    year: 2024,
    shortDescription: 'Elevating a cult indie skincare brand into the luxury market.',
    heroUrl: '/attached_assets/generated_images/marketing_1.jpg',
    challenge: 'Aura was beloved by a niche audience but perceived as too "homemade" to compete with established luxury skincare lines. The packaging and messaging were holding back their pricing power.',
    strategy: 'Shift the narrative from "natural ingredients" to "clinical botanical efficacy." We redefined the brand archetype to the Magician, focusing on the transformative power of their serums, backed by a minimalist, authoritative aesthetic.',
    execution: 'A complete overhaul of visual identity, packaging, and digital presence. The campaign utilized stark, dramatic lighting on product textures, completely separating Aura from the bright, soft pastel aesthetics typical of natural skincare.',
    outcome: 'Increased average order value by 45% within three months. Successfully launched in three major luxury department stores, shifting brand perception entirely.',
    galleryUrls: [
      '/attached_assets/generated_images/marketing_1.jpg',
      '/attached_assets/generated_images/marketing_bg.jpg'
    ],
    relatedSlugs: ['nexus-launch']
  },
  {
    slug: 'nexus-launch',
    campaignName: 'Nexus X Global Launch',
    brand: 'Nexus Tech',
    category: 'Brand Identity System',
    year: 2023,
    shortDescription: 'A mysterious, drip-feed digital campaign for a flagship device.',
    heroUrl: '/attached_assets/generated_images/marketing_2.jpg',
    challenge: 'Entering a saturated smartphone market where consumers suffer from "feature fatigue." Standard tech specs no longer excited the demographic.',
    strategy: 'Treat the product launch like a sci-fi film premiere. Instead of listing specs, we created a lore-rich universe around the device, appealing to tech enthusiasts desire for exclusivity and mystery.',
    execution: 'A 6-week multi-channel ARG (Alternate Reality Game) scattered across Twitter, Reddit, and hidden web portals. The visual language was dark, geometric, and cybernetic, heavily utilizing deep reds and blacks.',
    outcome: 'Generated 2.4M organic impressions before the product was even officially revealed. First-day pre-orders sold out in 14 minutes.',
    galleryUrls: [
      '/attached_assets/generated_images/marketing_2.jpg',
      '/attached_assets/generated_images/hero_bg.jpg'
    ],
    relatedSlugs: ['aura-rebrand', 'solstice-social']
  },
  {
    slug: 'solstice-social',
    campaignName: 'Solstice Social Identity',
    brand: 'Solstice Boutique Hotels',
    category: 'Social and Content Strategy',
    year: 2023,
    shortDescription: 'Transforming a hospitality feed into an editorial mood board.',
    heroUrl: '/attached_assets/generated_images/marketing_3.jpg',
    challenge: 'The hotels Instagram feed looked like a booking catalogue—sterile, empty rooms and generic breakfast buffets. It lacked soul and failed to attract the intended creative class clientele.',
    strategy: 'Stop selling rooms. Start selling the lifestyle and the atmosphere. The strategy pivoted to "The Art of Slow Living," focusing on extreme close-ups, textural details, and the interesting people inhabiting the spaces.',
    execution: 'Implemented a strict editorial grid system. We mixed 35mm film photography with sleek typography overlays. Captions shifted from promotional copy to short, poetic vignettes.',
    outcome: '150% increase in social engagement. Direct bookings from Instagram increased by 60%, and the property became a recognized hub for the local creative community.',
    galleryUrls: [
      '/attached_assets/generated_images/marketing_3.jpg',
      '/attached_assets/generated_images/about_profile.jpg'
    ],
    relatedSlugs: ['aura-rebrand']
  }
];
