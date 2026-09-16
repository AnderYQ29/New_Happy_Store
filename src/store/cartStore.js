import { create } from "zustand";
import { persist } from "zustand/middleware";

const MAX_QUANTITY = 20;

/**
 * Carrito de compras.
 * Se guarda en localStorage, así el usuario no pierde su selección
 * al recargar o cerrar la pestaña.
 */
const useCartStore = create(
  persist(
    (set) => ({
      cartItems: [],

      addToCart: (product, quantity = 1) =>
        set((state) => {
          const exists = state.cartItems.find((item) => item.id === product.id);

          if (!exists) {
            return {
              cartItems: [
                ...state.cartItems,
                { ...product, quantity: Math.min(quantity, MAX_QUANTITY) },
              ],
            };
          }

          return {
            cartItems: state.cartItems.map((item) =>
              item.id === product.id
                ? {
                    ...item,
                    quantity: Math.min(item.quantity + quantity, MAX_QUANTITY),
                  }
                : item
            ),
          };
        }),

      setQuantity: (id, quantity) =>
        set((state) => ({
          cartItems: state.cartItems
            .map((item) =>
              item.id === id
                ? { ...item, quantity: Math.min(quantity, MAX_QUANTITY) }
                : item
            )
            // Si baja a 0 se elimina del carrito.
            .filter((item) => item.quantity > 0),
        })),

      removeFromCart: (id) =>
        set((state) => ({
          cartItems: state.cartItems.filter((item) => item.id !== id),
        })),

      clearCart: () => set({ cartItems: [] }),
    }),
    { name: "happy-store-cart" }
  )
);

/* Selectores: devuelven primitivos, por lo que no provocan renders extra. */
export const selectTotalItems = (state) =>
  state.cartItems.reduce((total, item) => total + item.quantity, 0);

export const selectTotalPrice = (state) =>
  state.cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

export { MAX_QUANTITY };
export default useCartStore;
