export type Sku = {
  label: string;
  price: number;
};

export type Product = {
  id: number;
  slug: string;
  name: string;
  tagline: string;
  description: string;
  longDescription: string;
  highlights: string[];
  nutritionNote: string;
  pricing: Sku[];
  color: string;
  accent: string;
  image: string;
  heroImage: string;
};

export const products: Product[] = [
  {
    id: 1,
    slug: 'muesli',
    name: 'Grabfabs Muesli',
    tagline: 'ZERO ADDED SUGAR',
    description:
      'Revolutionary muesli that comes with your choice of condiments — honey, fresh milk powder, chocolate sauce, or peanut butter. Just like Maggi has its spice mix, now muesli has its moment.',
    longDescription:
      'We reimagined how muesli is eaten. Instead of a plain, dry cereal that begs for toppings you have to hunt down separately, Grabfabs Muesli comes with a condiment kit — chosen by you at checkout. Drizzle honey, stir in fresh milk powder, melt in dark chocolate sauce, or swirl through peanut butter. Every bowl becomes your own. No added sugar in the base. Clean oats, real nuts, dried fruit. Just the good stuff.',
    highlights: ['Zero Added Sugar', 'Condiment Kit Included', 'No separate sides needed', 'Real Oats & Dried Fruit'],
    nutritionNote: 'High in fibre · Natural sugars only · Good source of protein',
    pricing: [
      { label: '100g', price: 50 },
      { label: '35g', price: 20 },
    ],
    color: '#1a5c28',
    accent: '#c87c2e',
    image: 'https://images.unsplash.com/photo-1517093157656-b9eccef91cb1?w=160&h=160&fit=crop&q=80',
    heroImage: 'https://images.unsplash.com/photo-1517093157656-b9eccef91cb1?w=1800&h=1200&fit=crop&q=90',
  },
  {
    id: 2,
    slug: 'peanut-butter',
    name: 'Grabfabs Peanut Butter',
    tagline: 'PALM OIL FREE',
    description:
      'Smooth peanut butter with a twist — pre-loaded with pumpkin, chia, and sunflower seeds. Magnesium, potassium, selenium and calcium already in the jar.',
    longDescription:
      'Most peanut butters give you peanuts and palm oil. Ours gives you peanuts, pumpkin seeds, chia seeds, and sunflower seeds — blended smooth, with no palm oil, no hydrogenated fats, no rubbish. The seeds bring magnesium, potassium, selenium, and calcium. You get a nutrition upgrade with every spoonful, without any extra shopping or measuring. Spread it, stir it into your muesli, or eat it straight from the jar.',
    highlights: ['Palm Oil Free', 'Seeds Pre-Added', 'No extra shopping needed', 'Rich in Micronutrients'],
    nutritionNote: 'High in healthy fats · Magnesium & potassium rich · No hydrogenated oils',
    pricing: [
      { label: '30g', price: 50 },
    ],
    color: '#0d3314',
    accent: '#e8a04e',
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=160&h=160&fit=crop&q=80',
    heroImage: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1800&h=1200&fit=crop&q=90',
  },
  {
    id: 3,
    slug: 'bites',
    name: 'Grabfabs Bites',
    tagline: 'MINI ENERGY BAR',
    description:
      'Perfectly portioned mini energy bars coated in premium dark Couverture chocolate. Every bite keeps your portion in check without sacrificing indulgence.',
    longDescription:
      'Portion control is a myth when energy bars are the size of a brick. Grabfabs Bites are intentionally small — one or two at a time, coated in Belgian dark Couverture chocolate that actually snaps and melts. Dates, oats, and nuts inside. The portion is built in, so you stop worrying and start enjoying. Toss a few in your bag, your desk drawer, your car. Real energy, real chocolate, real portion sense.',
    highlights: ['Portion Controlled', 'Dark Couverture Chocolate', 'Energy on demand', 'Dates & Oat Base'],
    nutritionNote: 'Natural energy · No artificial sweeteners · Dark chocolate coated',
    pricing: [
      { label: 'Pack of 4', price: 45 },
      { label: 'Single', price: 12 },
    ],
    color: '#2d4a1e',
    accent: '#d4943a',
    image: 'https://images.unsplash.com/photo-1481391319762-47dff72954d9?w=160&h=160&fit=crop&q=80',
    heroImage: 'https://images.unsplash.com/photo-1481391319762-47dff72954d9?w=1800&h=1200&fit=crop&q=90',
  },
  {
    id: 4,
    slug: 'loaf',
    name: 'Grabfabs Loaf',
    tagline: 'YEAST-FREE BREAD',
    description:
      'Gluten-free flax and buckwheat bread priced like your regular brown bread. Fiber-rich, mineral-packed, and tastes genuinely great.',
    longDescription:
      'Gluten-free bread has a reputation for being dry, crumbly, and expensive. We fixed all three. Grabfabs Loaf is made from flax and buckwheat — naturally gluten-free grains with serious fibre and mineral credentials. No yeast, which makes it easier on sensitive digestion. And we priced it at brown bread rates, not specialty store rates. Dense, moist, and honestly delicious. Toast it, stack it, slice it thick.',
    highlights: ['Yeast Free', 'Gluten Free', 'Flax & Buckwheat Base', 'Brown Bread Price Point'],
    nutritionNote: 'High in fibre · Gluten free · Good source of minerals',
    pricing: [
      { label: 'Flax Loaf', price: 40 },
      { label: 'Buckwheat Loaf', price: 35 },
    ],
    color: '#3d5c1a',
    accent: '#b87030',
    image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=160&h=160&fit=crop&q=80',
    heroImage: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=1800&h=1200&fit=crop&q=90',
  },
  {
    id: 5,
    slug: 'makhana',
    name: 'Grabfabs Makhana',
    tagline: 'ONION CHEESE FLAVOR',
    description:
      'When the chip craving hits, reach for something better. Our Onion Cheese Makhana satisfies the munch without the guilt trip.',
    longDescription:
      'Makhana — lotus seed pops — are one of the most underrated snacks on the planet. Light, airy, and naturally high in protein and magnesium. We coat ours in a bold Onion Cheese seasoning that gives you that savoury chip-craving satisfaction with none of the deep-fried aftermath. Grab the bag. Eat the whole thing. Feel fine about it.',
    highlights: ['Chip Alternative', 'Onion Cheese Flavor', 'Light & Crunchy', 'High in Protein'],
    nutritionNote: 'High in protein · Low calorie · Naturally gluten free',
    pricing: [
      { label: '20g', price: 30 },
    ],
    color: '#1e4a28',
    accent: '#e0a050',
    image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=160&h=160&fit=crop&q=80',
    heroImage: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=1800&h=1200&fit=crop&q=90',
  },
  {
    id: 6,
    slug: 'fruit-gels',
    name: 'Grabfabs Fruit Gels',
    tagline: 'CRANBERRY · JAGGERY',
    description:
      'Made with real cranberry and jaggery — clean ingredients you can actually read. A sweet treat that respects your body.',
    longDescription:
      'Sweet things don\'t have to come with a label you need a chemistry degree to understand. Grabfabs Fruit Gels are made with real cranberry and sweetened with jaggery — that\'s it. No glucose syrup, no artificial colours, no "natural flavours" that aren\'t really natural. A chewy, tangy-sweet treat you can hand to your kid or snack on between meetings without second-guessing yourself.',
    highlights: ['Real Fruit', 'Jaggery Sweetened', 'Clean Ingredients', 'No Artificial Colour'],
    nutritionNote: 'Real fruit · Jaggery sweetened · No refined sugar',
    pricing: [
      { label: '30g', price: 50 },
    ],
    color: '#5c1a2e',
    accent: '#c85a3a',
    image: 'https://images.unsplash.com/photo-1615485500704-8e990f9900f7?w=160&h=160&fit=crop&q=80',
    heroImage: 'https://images.unsplash.com/photo-1615485500704-8e990f9900f7?w=1800&h=1200&fit=crop&q=90',
  },
  {
    id: 7,
    slug: 'snowball-coco',
    name: 'Snowball & Coco',
    tagline: 'COCONUT LADDUS',
    description:
      'Handcrafted coconut laddus — Snowball (white) and Coco (dark) — made with clean ingredients and zero refined sugar. Soft, bite-sized, and genuinely indulgent.',
    longDescription:
      'Two versions of the same beautiful idea: a soft, handcrafted laddu that tastes like it was made by someone who actually cares. Snowball is the classic white coconut version — delicate, subtly sweet, with a clean finish. Coco goes darker — toasted coconut, deeper flavour, a hint of richness. Both are made without refined sugar, using jaggery and real desiccated coconut. Pack of 8 because one is never enough.',
    highlights: ['Zero Refined Sugar', 'Jaggery Sweetened', 'Real Desiccated Coconut', 'Handcrafted'],
    nutritionNote: 'Jaggery sweetened · Real coconut · No preservatives',
    pricing: [
      { label: 'Pack of 8', price: 40 },
    ],
    color: '#3b2a1a',
    accent: '#c87c2e',
    image: 'https://images.unsplash.com/photo-1548365328-8c6db3220e4c?w=160&h=160&fit=crop&q=80',
    heroImage: 'https://images.unsplash.com/photo-1548365328-8c6db3220e4c?w=1800&h=1200&fit=crop&q=90',
  },
];

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}
