import {StaticImageData} from "next/image";

export interface Product {
  id: string;
  name: string;
  price: number;
  category: Category;
  image: StaticImageData;
  description: string;
  isAvailable: boolean;
  preOrderInfo: string;
}

export type Category =
  | "Semua"
  | "Nasi Bento"
  | "Mix Platter"
  | "Mojito"
  | "Combo";

export interface CartItem {
  product: Product;
  quantity: number;
}
