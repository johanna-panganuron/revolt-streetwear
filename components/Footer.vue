<template>
  <footer class="bg-surface border-t border-white/10 mt-24">
    <div class="max-w-screen-xl mx-auto px-6 py-16">
      <div class="grid grid-cols-1 md:grid-cols-4 gap-12">
        <!-- Brand -->
        <div class="md:col-span-2">
          <p class="font-display text-5xl tracking-widest text-white mb-4">REVOLT</p>
          <p class="font-condensed text-white/50 tracking-widest uppercase text-sm mb-6">
            Born in the Streets. Built in Cordova.
          </p>
          <div class="flex gap-4">
            <a href="#" class="text-white/40 hover:text-primary transition-colors">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
              </svg>
            </a>
            <a href="#" class="text-white/40 hover:text-primary transition-colors">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.27 6.27 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V9.05a8.16 8.16 0 004.77 1.52V7.12a4.85 4.85 0 01-1-.43z"/>
              </svg>
            </a>
          </div>
        </div>

        <!-- Links -->
        <div>
          <p class="font-condensed text-xs tracking-widest uppercase text-white/30 mb-4">Shop</p>
          <ul class="space-y-3">
            <li v-for="link in shopLinks" :key="link.href">
              <NuxtLink :to="link.href" class="font-body text-sm text-white/60 hover:text-white transition-colors">
                {{ link.label }}
              </NuxtLink>
            </li>
          </ul>
        </div>

        <div>
          <p class="font-condensed text-xs tracking-widest uppercase text-white/30 mb-4">Info</p>
          <ul class="space-y-3">
            <li v-for="link in infoLinks" :key="link.label">
              <a href="#" class="font-body text-sm text-white/60 hover:text-white transition-colors">
                {{ link.label }}
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div class="border-t border-white/10 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
        <p class="font-condensed text-xs tracking-widest uppercase text-white/30">
          © {{ new Date().getFullYear() }} Revolt Streetwear. All rights reserved.
        </p>
        <p class="font-condensed text-xs tracking-widest uppercase text-white/20">
          Cordova, Cebu, Philippines
        </p>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
const shopLinks = [
  { href: '/shop?category=tees', label: 'Tees' },
  { href: '/shop?category=hoodies', label: 'Hoodies' },
  { href: '/shop?category=bottoms', label: 'Bottoms' },
  { href: '/shop?category=accessories', label: 'Accessories' },
  { href: '/lookbook', label: 'Lookbook' },
]

const infoLinks = [
  { label: 'About Us' },
  { label: 'Shipping & Returns' },
  { label: 'Size Guide' },
  { label: 'Contact' },
  { label: 'FAQ' },
]
</script>
