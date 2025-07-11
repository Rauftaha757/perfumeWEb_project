import type { Perfume } from '@/types';

export const perfumes: Perfume[] = [
  // 🕴️ Male Perfumes
  {
    id: 1,
    name: 'Midnight Gentleman',
    description: 'Elegant and deep, made for sophisticated evenings and black-tie moments.',
    price: 230,
    image: '/images/gentelman.PNG',
    dataAiHint: 'black elegant perfume bottle night theme',
    notes: ['Black Pepper', 'Tonka Bean', 'Leather'],
    sizes: ['50ml', '100ml'],
  },
  {
    id: 2,
    name: 'Charmé Dusk',
    description: 'A romantic evening scent with an irresistible depth.',
    price: 210,
    image: '/images/charm dusk.PNG',
    dataAiHint: 'romantic perfume bottle dusk evening',
    notes: ['Bergamot', 'Fig Leaf', 'Incense'],
    sizes: ['50ml', '100ml'],
  },
  {
    id: 3,
    name: 'Imperial Oud',
    description: 'A luxurious and deep scent made for the man who commands attention.',
    price: 260,
    image: '/images/imperial_oud.PNG',
    dataAiHint: 'luxury oud perfume bottle royal',
    notes: ['Oud', 'Saffron', 'Patchouli'],
    sizes: ['50ml', '100ml'],
  },
  {
    id: 4,
    name: 'Dark Legend',
    description: 'Strong and bold, perfect for evening wear.',
    price: 240,
    image: '/images/darklegend.PNG',
    dataAiHint: 'bold leather amber perfume bottle',
    notes: ['Black Pepper', 'Leather', 'Amber'],
    sizes: ['50ml', '100ml'],
  },
  {
    id: 5,
    name: 'Royal Wood',
    description: 'Warm and rich, with a woody scent.',
    price: 200,
    image: '/images/darkwood.PNG',
    dataAiHint: 'woody natural warm perfume bottle',
    notes: ['Sandalwood', 'Cardamom', 'Musk'],
    sizes: ['50ml', '100ml'],
  },
  {
    id: 6,
    name: 'Midnight Smoke',
    description: 'Mysterious and deep, made for the night.',
    price: 200,
    image: '/images/midnight_smoke.PNG',
    dataAiHint: 'smoky leather incense night perfume',
    notes: ['Cinnamon', 'Incense', 'Leather'],
    sizes: ['50ml', '100ml'],
  },

  // 🌸 Female Perfumes
  {
    id: 7,
    name: 'Floral Kiss',
    description: 'Soft and sweet, with a floral touch.',
    price: 190,
    image: '/images/floral.PNG',
    dataAiHint: 'soft floral perfume bottle feminine',
    notes: ['Rose', 'Jasmine', 'Vanilla'],
    sizes: ['50ml', '100ml'],
  },
  {
    id: 8,
    name: 'Dreams',
    description: 'Warm and cozy, like a soft hug.',
    price: 195,
    image: '/images/dreams.PNG',
    dataAiHint: 'cozy vanilla almond perfume bottle',
    notes: ['Vanilla', 'Almond', 'Musk'],
    sizes: ['50ml', '100ml'],
  },
  {
    id: 9,
    name: 'Golden Petal',
    description: 'A mix of fruity and floral, very charming.',
    price: 210,
    image: '/images/golden_perl.PNG',
    dataAiHint: 'fruity floral golden perfume bottle',
    notes: ['Peach', 'Orange Blossom', 'Sandalwood'],
    sizes: ['50ml', '100ml'],
  },
  {
    id: 10,
    name: 'Moonlight',
    description: 'Elegant and calm, like a quiet night.',
    price: 200,
    image: '/images/moonlight.PNG',
    dataAiHint: 'lavender calm night perfume bottle',
    notes: ['Lavender', 'Iris', 'Soft Woods'],
    sizes: ['50ml', '100ml'],
  },
  {
    id: 11,
    name: 'Rose Charm',
    description: 'A modern rose scent, fresh and soft.',
    price: 205,
    image: '/images/rosecharm.PNG',
    dataAiHint: 'modern rose fresh feminine perfume bottle',
    notes: ['Rose', 'Lychee', 'Musk'],
    sizes: ['50ml', '100ml'],
  },
];

export const allPerfumeNames = perfumes.map(p => p.name);
