import type { Perfume } from '@/types';

export const perfumes: Perfume[] = [
  {
    id: 1,
    name: 'Midnight Gentleman',
    description: 'Elegant and deep, made for sophisticated evenings and black-tie moments.',
    price: 230,
    image: '/images/midnight-gentleman.png', // renamed from gentelman.PNG
    dataAiHint: 'black elegant perfume bottle night theme',
    notes: ['Black Pepper', 'Tonka Bean', 'Leather'],
    sizes: ['50ml', '100ml'],
  },
  {
    id: 2,
    name: 'Charmé Dusk',
    description: 'A romantic evening scent with an irresistible depth.',
    price: 210,
    image: '/images/charme-dusk.png', // renamed from charm dusk.PNG
    dataAiHint: 'romantic perfume bottle dusk evening',
    notes: ['Bergamot', 'Fig Leaf', 'Incense'],
    sizes: ['50ml', '100ml'],
  },
  {
    id: 3,
    name: 'Imperial Oud',
    description: 'A luxurious and deep scent made for the man who commands attention.',
    price: 260,
    image: '/images/imperial-oud.png', // renamed from imperial_oud.PNG
    dataAiHint: 'luxury oud perfume bottle royal',
    notes: ['Oud', 'Saffron', 'Patchouli'],
    sizes: ['50ml', '100ml'],
  },
  {
    id: 4,
    name: 'Dark Legend',
    description: 'Strong and bold, perfect for evening wear.',
    price: 240,
    image: '/images/dark-legend.png', // renamed from darklegend.PNG
    dataAiHint: 'bold leather amber perfume bottle',
    notes: ['Black Pepper', 'Leather', 'Amber'],
    sizes: ['50ml', '100ml'],
  },
  {
    id: 5,
    name: 'Royal Wood',
    description: 'Warm and rich, with a woody scent.',
    price: 200,
    image: '/images/royal-wood.png', // renamed from darkwood.PNG
    dataAiHint: 'woody natural warm perfume bottle',
    notes: ['Sandalwood', 'Cardamom', 'Musk'],
    sizes: ['50ml', '100ml'],
  },
  {
    id: 6,
    name: 'Midnight Smoke',
    description: 'Mysterious and deep, made for the night.',
    price: 200,
    image: '/images/midnight-smoke.png', // make sure this is a new unique image
    dataAiHint: 'smoky leather incense night perfume',
    notes: ['Cinnamon', 'Incense', 'Leather'],
    sizes: ['50ml', '100ml'],
  },
];

export const allPerfumeNames = perfumes.map(p => p.name);
