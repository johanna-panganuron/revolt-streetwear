<template>
  <!-- Overlay -->
  <Teleport to="body">
    <Transition name="fade">
      <div v-if="cart.isOpen" class="fixed inset-0 overlay z-50" @click="cart.closeCart()" />
    </Transition>

    <!-- Drawer -->
    <div class="cart-drawer fixed top-0 right-0 h-full w-full max-w-md bg-surface z-50 flex flex-col"
      :class="cart.isOpen ? 'translate-x-0' : 'translate-x-full'">
      <!-- Header -->
      <div class="flex items-center justify-between px-6 py-5 border-b border-white/10">
        <div class="flex items-center gap-3">
          <p class="font-display text-2xl tracking-widest">CART</p>
          <span class="font-condensed text-xs text-white/40 tracking-widest">({{ cart.count }} items)</span>
        </div>
        <button class="text-white/40 hover:text-white transition-colors" @click="cart.closeCart()">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>
      </div>

      <!-- Empty -->
      <div v-if="cart.isEmpty" class="flex-1 flex flex-col items-center justify-center gap-4 px-6">
        <div class="w-16 h-16 border border-white/10 flex items-center justify-center">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1"
            class="text-white/30">
            <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
            <line x1="3" y1="6" x2="21" y2="6" />
            <path d="M16 10a4 4 0 01-8 0" />
          </svg>
        </div>
        <p class="font-condensed text-white/30 tracking-widest uppercase text-sm">Your cart is empty</p>
        <button class="btn-outline text-xs mt-2" @click="cart.closeCart(); navigateTo('/shop')">
          Browse Shop
        </button>
      </div>

      <!-- Items -->
      <div v-else class="flex-1 overflow-y-auto px-6 py-4 space-y-5">
        <div v-for="item in cart.items" :key="item.id" class="flex gap-4">
          <!-- Thumb -->
          <div class="w-20 h-24 bg-surface-light flex-shrink-0 overflow-hidden">
            <img :src="item.image" :alt="item.name" class="w-full h-full object-cover" />
          </div>

          <!-- Details -->
          <div class="flex-1 min-w-0">
            <p class="font-condensed font-semibold text-sm tracking-wide uppercase text-white">{{ item.name }}</p>
            <p class="font-condensed text-xs text-white/40 tracking-wider mt-0.5">
              {{ item.size }} · {{ item.color }}
            </p>
            <p class="font-condensed font-semibold text-sm text-white mt-2">
              ₱{{ (item.price * item.quantity).toLocaleString() }}
            </p>

            <!-- Qty -->
            <div class="flex items-center gap-0 mt-3">
              <button
                class="w-7 h-7 border border-white/20 text-white/60 hover:text-white hover:border-white/60 transition-colors flex items-center justify-center text-sm"
                @click="cart.updateQuantity(item.id, item.quantity - 1)">−</button>
              <span class="w-8 text-center font-condensed text-sm text-white">{{ item.quantity }}</span>
              <button
                class="w-7 h-7 border border-white/20 text-white/60 hover:text-white hover:border-white/60 transition-colors flex items-center justify-center text-sm"
                @click="cart.updateQuantity(item.id, item.quantity + 1)">+</button>
              <button class="ml-3 text-white/20 hover:text-primary transition-colors" @click="cart.removeItem(item.id)">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                  <polyline points="3 6 5 6 21 6" />
                  <path d="M19 6l-1 14H6L5 6" />
                  <path d="M10 11v6m4-6v6" />
                  <path d="M9 6V4h6v2" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Footer -->
      <div v-if="!cart.isEmpty" class="px-6 py-6 border-t border-white/10 space-y-4">
        <!-- Promo -->
        <div class="flex gap-2">
          <input v-model="promoInput" type="text" placeholder="Promo code"
            class="flex-1 bg-surface-light border border-white/10 px-3 py-2 font-condensed text-sm text-white placeholder-white/20 tracking-widest uppercase outline-none focus:border-white/30 transition-colors" />
          <button class="btn-primary text-xs px-4 py-2" @click="applyPromo">
            Apply
          </button>
        </div>
        <p v-if="promoMsg" class="font-condensed text-xs tracking-wide"
          :class="promoSuccess ? 'text-green-400' : 'text-red-400'">
          {{ promoMsg }}
        </p>

        <!-- Total -->
        <div class="space-y-2">
          <div class="flex justify-between font-condensed text-sm text-white/60">
            <span class="tracking-wide">Subtotal</span>
            <span>₱{{ cart.subtotal.toLocaleString() }}</span>
          </div>
          <div v-if="cart.promoDiscount > 0" class="flex justify-between font-condensed text-sm text-green-400">
            <span>Discount ({{ cart.promoCode }})</span>
            <span>−₱{{ cart.promoDiscount.toLocaleString() }}</span>
          </div>
          <div
            class="flex justify-between font-condensed font-semibold text-base text-white pt-2 border-t border-white/10">
            <span class="tracking-widest uppercase">Total</span>
            <span>₱{{ cart.total.toLocaleString() }}</span>
          </div>
        </div>

        <NuxtLink to="/cart" class="btn-primary w-full text-center block" @click="cart.closeCart()">
          View Cart & Checkout
        </NuxtLink>
      </div>
    </div>
  </Teleport>
</template>

<script setup lang="ts">
const cart = useCart()
const promoInput = ref('')
const promoMsg = ref('')
const promoSuccess = ref(false)

function applyPromo() {
  const ok = cart.applyPromo(promoInput.value)
  promoSuccess.value = ok
  promoMsg.value = ok ? 'Promo applied!' : 'Invalid promo code.'
}
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
