import { create } from "zustand";

export const useAddItem = create((set) => ({
  product: 0,
  addProductID: () => set((state) => ({ product: state.product + 1 })),
  removeProductQuantity: () => set({ product: 0 }),
}));

export const useCart = create((set) => ({
  products: [],
  allProducts: [], // Tambahkan properti allProducts
  addToCart: (productId) => {
    set((state) => ({
      products: [...state.products, productId],
    }));
  },
  removeFromCart: (productId) => {
    set((state) => ({
      products: state.products.filter((id) => id !== productId),
    }));
  },
  clearCart: () => {
    set({ products: [] });
  },

  initializeProducts: (products) => {
    set({ allProducts: products });
  },
}));
