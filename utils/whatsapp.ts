/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import {CartItem} from "@/types";
import {WHATSAPP_NUMBER} from "@/constants";

export const generateWhatsAppUrl = (cart: CartItem[], totalPrice: number) => {
  let message = `Halo OkSoGood! Saya ingin ikut Pre-Order:\n\n`;

  cart.forEach((item, index) => {
    message += `${index + 1}. *${item.product.name}*\n`;
    message += `   Jumlah: ${item.quantity} porsi\n`;
    message += `   Harga: Rp ${item.product.price.toLocaleString("id-ID")}\n\n`;
  });

  message += `*Total Pesanan: Rp ${totalPrice.toLocaleString("id-ID")}*\n\n`;
  message += `Apakah kuota masih tersedia? Mohon informasikan detail pembayarannya. Terima kasih!`;

  const encodedMessage = encodeURIComponent(message);
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`;
};

export const generateSingleProductWhatsAppUrl = (
  productName: string,
  quantity: number,
  variant?: string,
) => {
  const message = `Halo OkSoGood! Saya ingin ikut Pre-Order: ${quantity}x *${productName}* ${variant ? `(${variant})` : ""}. Apakah kuota masih tersedia?`;
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
};
