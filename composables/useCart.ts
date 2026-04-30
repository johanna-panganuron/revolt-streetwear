import { useCartStore } from '~/stores/cart'

export const useCart = () => {
  const cart = useCartStore()
  return cart
}
