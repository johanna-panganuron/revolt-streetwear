import { defineStore } from 'pinia'

export interface CartItem {
  id: number
  productId: number
  name: string
  price: number
  size: string
  color: string
  quantity: number
  image: string
  slug: string
}

export const useCartStore = defineStore('cart', {
  state: () => ({
    items: [] as CartItem[],
    isOpen: false,
    promoCode: '',
    promoDiscount: 0,
  }),

  getters: {
    count: (state) => state.items.reduce((sum, item) => sum + item.quantity, 0),
    subtotal: (state) => state.items.reduce((sum, item) => sum + item.price * item.quantity, 0),
    total: (state) => {
      const subtotal = state.items.reduce((sum, item) => sum + item.price * item.quantity, 0)
      return subtotal - state.promoDiscount
    },
    isEmpty: (state) => state.items.length === 0,
  },

  actions: {
    addItem(item: Omit<CartItem, 'id'>) {
      const existing = this.items.find(
        (i) => i.productId === item.productId && i.size === item.size && i.color === item.color
      )
      if (existing) {
        existing.quantity += item.quantity
      } else {
        this.items.push({ ...item, id: Date.now() })
      }
      this.isOpen = true
    },

    removeItem(id: number) {
      this.items = this.items.filter((i) => i.id !== id)
    },

    updateQuantity(id: number, quantity: number) {
      const item = this.items.find((i) => i.id === id)
      if (item) {
        if (quantity <= 0) {
          this.removeItem(id)
        } else {
          item.quantity = quantity
        }
      }
    },

    applyPromo(code: string) {
      const codes: Record<string, number> = {
        REVOLT10: 0.1,
        STREETS20: 0.2,
      }
      const discount = codes[code.toUpperCase()]
      if (discount) {
        this.promoCode = code.toUpperCase()
        this.promoDiscount = Math.round(this.subtotal * discount)
        return true
      }
      return false
    },

    clearCart() {
      this.items = []
      this.promoCode = ''
      this.promoDiscount = 0
    },

    openCart() {
      this.isOpen = true
    },

    closeCart() {
      this.isOpen = false
    },
  },
})
