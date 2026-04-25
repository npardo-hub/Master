export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: 'Apparel' | 'Accessories' | 'Headwear';
  features?: string[];
  inStock: boolean;
}

export interface CartItem extends Product {
  quantity: number;
}
