import {Product} from "./types";
import katsu from "@/public/images/katsu.jpeg";
import teriyaki from "@/public/images/teriyaki.jpeg";
import mojito from "@/public/images/mojito.jpeg";
import mixplatter from "@/public/images/mix-platter.jpeg";
import combo1 from "@/public/images/combo-1.jpeg";
import combo2 from "@/public/images/combo-2.jpeg";
import combo3 from "@/public/images/combo-3.jpeg";

export const PRODUCTS: Product[] = [
  {
    id: "bento-1",
    name: "Golden Katsu Bento",
    price: 15000,
    category: "Nasi Bento",
    image: katsu,
    description:
      "Nasi pulen hangat dengan dada ayam katsu keemasan yang super renyah. Dilengkapi salad segar dan saus spesial yang bikin nagih.",
    isAvailable: true,
    preOrderInfo: "PO Batch 1 - Pengiriman Jumat",
  },
  {
    id: "bento-2",
    name: "Classic Teriyaki Bento",
    price: 15000,
    category: "Nasi Bento",
    image: teriyaki,
    description:
      "Potongan daging pilihan dengan bumbu teriyaki manis gurih yang meresap sempurna. Disajikan dengan nasi hangat yang pas buat ngisi tenaga.",
    isAvailable: true,
    preOrderInfo: "PO Batch 1 - Pengiriman Jumat",
  },
  {
    id: "platter-1",
    name: "Solo Mix Platter",
    price: 15000,
    category: "Mix Platter",
    image: mixplatter,
    description:
      "Pilihan snack komplit dalam satu piring! Isian kentang goreng, sosis, dan nugget dengan porsi yang pas banget buat nemenin lu ngemil sendirian tanpa sisa.",
    isAvailable: true,
    preOrderInfo: "PO Batch 2 - Pengiriman Sabtu",
  },
  {
    id: "combo-1",
    name: "Katsu & Sip Combo",
    price: 20000,
    category: "Combo",
    image: combo1,
    description:
      "Makan kenyang, minum segar. Perpaduan sempurna dari renyahnya Golden Katsu Bento dan dinginnya Signature Mojito.",
    isAvailable: true,
    preOrderInfo: "Pengiriman Setiap Hari",
  },
  {
    id: "combo-2",
    name: "Teriyaki Breeze Combo",
    price: 20000,
    category: "Combo",
    image: combo2,
    description:
      "Paket komplit buat harimu! Nikmati manis gurihnya Classic Teriyaki Bento yang dibilas dengan kesegaran Signature Mojito.",
    isAvailable: true,
    preOrderInfo: "Pengiriman Setiap Hari",
  },
  {
    id: "combo-3",
    name: "Single Chill Combo",
    price: 20000,
    category: "Combo",
    image: combo3,
    description:
      "Amunisi paling pas buat nyantai. Kombinasi Solo Mix Platter yang gurih dan renyah, dibilas dengan kesegaran Signature Mojito yang bikin mood balik lagi.",
    isAvailable: true,
    preOrderInfo: "Pengiriman Setiap Hari",
  },
  {
    id: "mojito-1",
    name: "Signature Mojito",
    price: 8000,
    category: "Mojito",
    image: mojito,
    description:
      "Sensasi dingin soda dengan perpaduan daun mint segar dan perasan jeruk nipis. Ampuh banget buat balikin mood dan ngilangin haus.",
    isAvailable: true,
    preOrderInfo: "Pengiriman Setiap Hari",
  },
];

export const WHATSAPP_NUMBER = "6289657393880";
