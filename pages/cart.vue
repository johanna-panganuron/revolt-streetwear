<template>
  <main class="bg-dark min-h-screen pt-24">
    <div class="max-w-screen-xl mx-auto px-6 py-12">
      <div class="flex items-end justify-between mb-10">
        <div>
          <p class="font-condensed text-xs tracking-widest uppercase text-primary mb-2">Review</p>
          <h1 class="font-display text-5xl md:text-7xl tracking-widest text-white">CART</h1>
        </div>
        <p class="font-condensed text-xs text-white/30 tracking-widest">{{ cart.count }} items</p>
      </div>

      <!-- Empty cart -->
      <div v-if="cart.isEmpty" class="py-32 text-center">
        <p class="font-display text-5xl text-white/10 tracking-widest mb-4">EMPTY</p>
        <p class="font-condensed text-sm text-white/30 tracking-wide mb-8">Your cart is waiting to be filled.</p>
        <NuxtLink to="/shop" class="btn-primary">Start Shopping</NuxtLink>
      </div>

      <!-- Cart content -->
      <div v-else class="grid lg:grid-cols-3 gap-12">
        <!-- Items (2/3) -->
        <div class="lg:col-span-2 space-y-0">
          <!-- Header -->
          <div
            class="hidden md:grid grid-cols-12 gap-4 pb-3 border-b border-white/10 font-condensed text-xs tracking-widest uppercase text-white/30">
            <div class="col-span-6">Product</div>
            <div class="col-span-2 text-center">Price</div>
            <div class="col-span-2 text-center">Qty</div>
            <div class="col-span-2 text-right">Total</div>
          </div>

          <!-- Items -->
          <TransitionGroup name="list">
            <div v-for="item in cart.items" :key="item.id"
              class="grid grid-cols-12 gap-4 py-6 border-b border-white/10 items-center">
              <!-- Product -->
              <div class="col-span-12 md:col-span-6 flex gap-4 items-start">
                <NuxtLink :to="`/shop/${item.slug}`"
                  class="w-20 h-24 bg-surface-light flex-shrink-0 overflow-hidden hover:opacity-80 transition-opacity">
                  <img :src="item.image" :alt="item.name" class="w-full h-full object-cover" />
                </NuxtLink>
                <div>
                  <NuxtLink :to="`/shop/${item.slug}`"
                    class="font-condensed font-semibold text-sm tracking-wide uppercase text-white hover:text-primary transition-colors">
                    {{ item.name }}
                  </NuxtLink>
                  <p class="font-condensed text-xs text-white/40 tracking-wider mt-1">
                    {{ item.size }} · {{ item.color }}
                  </p>
                  <p class="font-condensed text-sm text-white mt-1 md:hidden">
                    ₱{{ item.price.toLocaleString() }}
                  </p>
                  <button
                    class="font-condensed text-xs text-white/20 hover:text-primary transition-colors tracking-widest uppercase mt-3"
                    @click="cart.removeItem(item.id)">
                    Remove
                  </button>
                </div>
              </div>

              <!-- Price -->
              <div class="hidden md:flex md:col-span-2 justify-center font-condensed text-sm text-white/70">
                ₱{{ item.price.toLocaleString() }}
              </div>

              <!-- Qty -->
              <div class="col-span-7 md:col-span-2 flex justify-start md:justify-center">
                <div class="flex border border-white/20">
                  <button
                    class="w-8 h-9 flex items-center justify-center text-white/60 hover:text-white hover:bg-white/5 transition-colors text-sm"
                    @click="cart.updateQuantity(item.id, item.quantity - 1)">−</button>
                  <span class="w-10 h-9 flex items-center justify-center font-condensed text-sm text-white">{{
                    item.quantity }}</span>
                  <button
                    class="w-8 h-9 flex items-center justify-center text-white/60 hover:text-white hover:bg-white/5 transition-colors text-sm"
                    @click="cart.updateQuantity(item.id, item.quantity + 1)">+</button>
                </div>
              </div>

              <!-- Total -->
              <div
                class="col-span-5 md:col-span-2 flex justify-end items-center font-condensed font-semibold text-sm text-white">
                ₱{{ (item.price * item.quantity).toLocaleString() }}
              </div>
            </div>
          </TransitionGroup>

          <!-- Continue shopping -->
          <div class="pt-6">
            <NuxtLink to="/shop"
              class="flex items-center gap-2 font-condensed text-xs tracking-widest uppercase text-white/40 hover:text-white transition-colors">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                <path d="M19 12H5M12 19l-7-7 7-7" />
              </svg>
              Continue Shopping
            </NuxtLink>
          </div>
        </div>

        <!-- Order Summary (1/3) -->
        <div class="lg:col-span-1">
          <div class="bg-surface border border-white/10 p-6">
            <p class="font-display text-xl tracking-widest text-white mb-6">ORDER SUMMARY</p>

            <!-- Promo code -->
            <div class="flex gap-2 mb-4">
              <input v-model="promoInput" type="text" placeholder="Promo code"
                class="flex-1 bg-dark border border-white/10 px-3 py-2.5 font-condensed text-sm text-white placeholder-white/20 tracking-widest uppercase outline-none focus:border-white/30 transition-colors" />
              <button class="btn-primary text-xs px-4 py-2" @click="applyPromo">
                Apply
              </button>
            </div>
            <p v-if="promoMsg" class="font-condensed text-xs tracking-wide mb-4"
              :class="promoSuccess ? 'text-green-400' : 'text-red-400'">
              {{ promoMsg }}
            </p>

            <!-- Line items -->
            <div class="space-y-3 py-4 border-t border-white/10">
              <div class="flex justify-between font-condensed text-sm text-white/60">
                <span class="tracking-wide">Subtotal</span>
                <span>₱{{ cart.subtotal.toLocaleString() }}</span>
              </div>
              <div class="flex justify-between font-condensed text-sm text-white/60">
                <span class="tracking-wide">Shipping</span>
                <span :class="cart.subtotal >= 3000 ? 'text-green-400' : ''">
                  {{ cart.subtotal >= 3000 ? 'Free' : '₱150' }}
                </span>
              </div>
              <div v-if="cart.promoDiscount > 0" class="flex justify-between font-condensed text-sm text-green-400">
                <span>Discount</span>
                <span>−₱{{ cart.promoDiscount.toLocaleString() }}</span>
              </div>
            </div>

            <!-- Total -->
            <div
              class="flex justify-between font-condensed font-semibold text-lg text-white pt-4 border-t border-white/10 mb-6">
              <span class="tracking-widest uppercase">Total</span>
              <span>₱{{ (cart.total + (cart.subtotal >= 3000 ? 0 : 150)).toLocaleString() }}</span>
            </div>

            <button class="btn-primary w-full text-center">
              Proceed to Checkout
            </button>

            <p v-if="cart.subtotal < 3000" class="font-condensed text-xs text-white/30 tracking-wide text-center mt-3">
              Add ₱{{ (3000 - cart.subtotal).toLocaleString() }} more for free shipping
            </p>

            <!-- Trust badges -->
            <div class="flex justify-center gap-6 mt-6 pt-6 border-t border-white/10">
              <div class="flex items-center gap-1.5 font-condensed text-xs text-white/30 tracking-wide">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                </svg>
                Secure
              </div>
              <div class="flex items-center gap-1.5 font-condensed text-xs text-white/30 tracking-wide">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
                Local
              </div>
              <div class="flex items-center gap-1.5 font-condensed text-xs text-white/30 tracking-wide">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                  <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
                  <polyline points="17 6 23 6 23 12" />
                </svg>
                Returns
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script setup lang="ts">
useHead({ title: 'Cart — REVOLT Streetwear' })

const cart = useCart()
const promoInput = ref('')
const promoMsg = ref('')
const promoSuccess = ref(false)

function applyPromo() {
  const ok = cart.applyPromo(promoInput.value)
  promoSuccess.value = ok
  promoMsg.value = ok ? 'Promo code applied!' : 'Invalid promo code.'
}
</script>

<style scoped>
.list-enter-active,
.list-leave-active {
  transition: opacity 0.3s ease;
}

.list-enter-from,
.list-leave-to {
  opacity: 0;
}
</style>
