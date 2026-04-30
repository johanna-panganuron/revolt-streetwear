<template>
  <header
    class="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
    :class="scrolled ? 'bg-dark/95 backdrop-blur-sm border-b border-white/10' : 'bg-transparent'"
  >
    <div class="max-w-screen-xl mx-auto px-6 flex items-center justify-between h-16">
      <!-- Logo -->
      <NuxtLink to="/" class="font-display text-2xl tracking-widest text-white hover:text-primary transition-colors">
        REVOLT
      </NuxtLink>

      <!-- Desktop Nav -->
      <nav class="hidden md:flex items-center gap-8">
        <NuxtLink
          v-for="link in navLinks"
          :key="link.href"
          :to="link.href"
          class="font-condensed text-sm tracking-widest uppercase text-white/70 hover:text-white transition-colors"
          active-class="text-white"
        >
          {{ link.label }}
        </NuxtLink>
      </nav>

      <!-- Actions -->
      <div class="flex items-center gap-4">
        <!-- Wishlist -->
        <NuxtLink to="/shop" class="relative text-white/70 hover:text-white transition-colors p-1">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
          </svg>
        </NuxtLink>

        <!-- Cart -->
        <button
          class="relative text-white/70 hover:text-white transition-colors p-1"
          @click="cart.openCart()"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
            <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/>
            <line x1="3" y1="6" x2="21" y2="6"/>
            <path d="M16 10a4 4 0 01-8 0"/>
          </svg>
          <span
            v-if="cart.count > 0"
            class="absolute -top-1 -right-1 bg-primary text-white text-xs w-4 h-4 flex items-center justify-center font-condensed font-semibold"
          >
            {{ cart.count }}
          </span>
        </button>

        <!-- Mobile menu -->
        <button
          class="md:hidden text-white/70 hover:text-white transition-colors p-1"
          @click="mobileOpen = !mobileOpen"
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
            <template v-if="!mobileOpen">
              <line x1="3" y1="6" x2="21" y2="6"/>
              <line x1="3" y1="12" x2="21" y2="12"/>
              <line x1="3" y1="18" x2="21" y2="18"/>
            </template>
            <template v-else>
              <line x1="18" y1="6" x2="6" y2="18"/>
              <line x1="6" y1="6" x2="18" y2="18"/>
            </template>
          </svg>
        </button>
      </div>
    </div>

    <!-- Mobile Nav -->
    <Transition name="mobile-nav">
      <div
        v-if="mobileOpen"
        class="md:hidden bg-dark/98 border-t border-white/10 px-6 py-6"
      >
        <nav class="flex flex-col gap-6">
          <NuxtLink
            v-for="link in navLinks"
            :key="link.href"
            :to="link.href"
            class="font-display text-3xl tracking-widest text-white/70 hover:text-white transition-colors"
            @click="mobileOpen = false"
          >
            {{ link.label }}
          </NuxtLink>
        </nav>
      </div>
    </Transition>
  </header>
</template>

<script setup lang="ts">
import { useScroll } from '@vueuse/core'

const cart = useCart()
const mobileOpen = ref(false)

const { y } = useScroll(process.client ? window : null)
const scrolled = computed(() => y.value > 40)

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/shop', label: 'Shop' },
  { href: '/lookbook', label: 'Lookbook' },
  { href: '/about', label: 'About' },
]
</script>

<style scoped>
.mobile-nav-enter-active,
.mobile-nav-leave-active {
  transition: opacity 0.2s ease, transform 0.2s ease;
}
.mobile-nav-enter-from,
.mobile-nav-leave-to {
  opacity: 0;
  transform: translateY(-8px);
}
</style>