import { defineStore } from 'pinia'

export const useWishlistStore = defineStore('wishlist', {
  state: () => ({
    items: [] as number[],
  }),

  getters: {
    count: (state) => state.items.length,
    isWishlisted: (state) => (id: number) => state.items.includes(id),
  },

  actions: {
    toggle(id: number) {
      const idx = this.items.indexOf(id)
      if (idx === -1) {
        this.items.push(id)
      } else {
        this.items.splice(idx, 1)
      }
    },
  },
})
