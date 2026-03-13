import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export const useStore = create(
  persist(
    (set, get) => ({
      // Cart state
      cartItems: [],
      addToCart: (product, quantity = 1) => {
        set((state) => {
          const existing = state.cartItems.find(
            (item) => String(item.id) === String(product.id) && 
            JSON.stringify(item.variants) === JSON.stringify(product.variants)
          )
          if (existing) {
            return {
              cartItems: state.cartItems.map((item) =>
                item === existing
                  ? { ...item, quantity: item.quantity + quantity }
                  : item
              ),
            }
          }
          return {
            cartItems: [...state.cartItems, { ...product, quantity }],
          }
        })
      },
      removeFromCart: (productId, variants) => {
        set((state) => ({
          cartItems: state.cartItems.filter(
            (item) => !(String(item.id) === String(productId) && 
            JSON.stringify(item.variants) === JSON.stringify(variants))
          ),
        }))
      },
      updateCartQuantity: (productId, variants, quantity) => {
        set((state) => ({
          cartItems: state.cartItems.map((item) =>
            String(item.id) === String(productId) && 
            JSON.stringify(item.variants) === JSON.stringify(variants)
              ? { ...item, quantity }
              : item
          ).filter((item) => item.quantity > 0),
        }))
      },
      clearCart: () => set({ cartItems: [] }),

      // Wishlist
      wishlist: [],
      toggleWishlist: (product) => {
        set((state) => {
          const exists = state.wishlist.find((item) => String(item.id) === String(product.id))
          if (exists) {
            return {
              wishlist: state.wishlist.filter((item) => String(item.id) !== String(product.id)),
            }
          }
          return {
            wishlist: [...state.wishlist, product],
          }
        })
      },

      // User
      user: null,
      setUser: (user) => set({ user }),

      // Theme
      isDark: true,
      toggleTheme: () => set((state) => ({ isDark: !state.isDark })),

      // Filters
      filters: {
        priceRange: [0, 10000],
        brands: [],
        ratings: [],
        colors: [],
        sizes: [],
        availability: true,
      },
      setFilters: (filters) => set({ filters }),

      // Admin State
      isAdminOpen: false,
      setAdminOpen: (open) => set({ isAdminOpen: open }),
      isLockedDown: true,
      setLockedDown: (locked) => set({ isLockedDown: locked }),

      // Recent products
      recentProducts: [],
      addToRecent: (product) => {
        set((state) => {
          const filtered = state.recentProducts.filter((p) => p.id !== product.id)
          return {
            recentProducts: [product, ...filtered].slice(0, 10),
          }
        })
      },
    }),
    {
      name: 'cwh-cart-store',
      version: 1,
    }
  )
)
