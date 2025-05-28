export interface Product {
  id: string;
  name: string;
  price: string;
  category: string[];
  brand: string;
  color: string[];
  material: string[];
  short_description: string;
  long_description: string;
  dimensions: string;
  features: string[];
  care_instructions: string;
  quantity: number;
  discount_percentage: number;
}
