export interface Perfume {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
  dataAiHint: string;
  notes: string[];
  sizes: string[];
}

export interface CartItem {
  id: number;
  name: string;
  price: number;
  image: string;
  quantity: number;
  size: string;
}
