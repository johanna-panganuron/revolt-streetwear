<template>
  <main class="bg-dark">
    <!-- Hero -->
    <section class="relative min-h-screen flex flex-col justify-center overflow-hidden bg-dark">

<!-- Diagonal red slash -->
<div class="absolute inset-0 pointer-events-none">
  <div class="absolute top-0 right-[18%] md:right-[28%] w-px h-full bg-primary/20 -skew-x-12 origin-top" />
  <div class="absolute top-0 right-[18.3%] md:right-[28.3%] w-[2px] h-full bg-primary/40 -skew-x-12 origin-top" />
</div>

<!-- Top-left corner bracket -->
<div class="absolute top-10 left-8 md:left-16 pointer-events-none">
  <div class="w-8 h-8 border-l-2 border-t-2 border-primary/60" />
</div>

<!-- Bottom-right corner bracket -->
<div class="absolute bottom-10 right-8 md:right-16 pointer-events-none">
  <div class="w-8 h-8 border-r-2 border-b-2 border-primary/60" />
</div>

<!-- Horizontal scan line -->
<div class="absolute left-0 right-0 top-[62%] h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent pointer-events-none" />

<!-- Grid dots background -->
<div class="absolute inset-0 grid-bg opacity-40 pointer-events-none" />

<!-- Content -->
<div class="relative max-w-screen-xl mx-auto px-6 md:px-16 w-full pt-24 md:pt-32 pb-16 md:pb-24">

  <!-- Label row -->
  <div class="flex items-center gap-4 mb-6 md:mb-8 ml-1">
    <div class="w-8 md:w-12 h-px bg-primary" />
    <p class="font-condensed text-[10px] md:text-xs tracking-widest uppercase text-white/40">
      SS26 Collection — Now Live
    </p>
    <div class="w-2 h-2 bg-primary rotate-45 flex-shrink-0" />
  </div>

  <!-- Main title block — FIXED: removed ml-[8vw] on mobile, tightened font sizes -->
  <div class="relative">
    <h1 class="font-display text-[20vw] sm:text-[16vw] md:text-[11vw] leading-none tracking-wide text-white mb-0 relative z-10">
      REVOLT
    </h1>
    <!-- Removed ml-[8vw] on mobile — was causing overflow. Only shift on md+ -->
    <h1 class="font-display text-[20vw] sm:text-[16vw] md:text-[11vw] leading-none tracking-wide text-stroke mb-0 relative z-10 md:ml-[2vw]">
      STREETWEAR
    </h1>
  </div>

<!-- Bottom row -->
<div class="flex flex-col md:flex-row md:items-end md:justify-between gap-6 md:gap-8 mt-8 md:mt-10">
  <!-- Left: tagline + CTA -->
  <div class="max-w-sm">
    <div class="w-8 h-px bg-primary mb-4" />
    <p class="font-body text-white/50 text-sm md:text-base leading-relaxed mb-6 md:mb-8">
      Rooted in Cordova. Built for the streets.<br>No compromises.
    </p>
    <div class="flex flex-row gap-3">
      <NuxtLink to="/shop" class="btn-primary flex-1 text-center sm:flex-none">
        Shop Now
      </NuxtLink>
      <NuxtLink to="/lookbook" class="btn-outline flex-1 text-center sm:flex-none">
        View Lookbook
      </NuxtLink>
    </div>

    <!-- Since 2022 — standalone, below CTAs -->
    <div class="flex items-center gap-3 mt-6">
      <div class="w-4 h-px bg-primary/40" />
      <p class="font-condensed text-[10px] tracking-[0.5em] uppercase text-white/25">
        Est. 2022
      </p>
      <div class="w-4 h-px bg-primary/40" />
    </div>
  </div>

  <!-- Desktop: rotated location + scroll indicator -->
  <div class="hidden md:flex items-end gap-8">
    <div class="flex flex-col items-center gap-3">
      <p class="font-condensed text-xs tracking-[0.4em] uppercase text-white/20 rotate-90 origin-center whitespace-nowrap mb-6">
        Cordova · Cebu · PH
      </p>
    </div>
    <div class="flex flex-col items-center gap-2">
      <div class="w-px h-16 bg-gradient-to-b from-transparent to-primary" />
      <p class="font-condensed text-[10px] tracking-widest uppercase text-white/30 rotate-90 origin-bottom mt-4 whitespace-nowrap">
        Scroll
      </p>
    </div>
  </div>

  <!-- Mobile-only: location + scroll -->
  <div class="flex md:hidden items-end justify-between mt-2">
    <p class="font-condensed text-[10px] tracking-[0.4em] uppercase text-white/20">
      Cordova · Cebu · PH
    </p>
    <div class="flex flex-col items-center gap-2">
      <p class="font-condensed text-[10px] tracking-widest uppercase text-white/30">
        Scroll
      </p>
      <div class="w-px h-12 bg-gradient-to-b from-transparent to-primary" />
    </div>
  </div>

</div>

</div>
</section>

    <!-- Marquee -->
    <MarqueeBanner />

    <!-- Featured Collection -->
    <section class="max-w-screen-xl mx-auto px-6 py-24">
      <div class="flex items-end justify-between mb-12">
        <div>
          <p class="font-condensed text-xs tracking-widest uppercase text-primary mb-2">Featured</p>
          <h2 class="font-display text-5xl md:text-7xl tracking-widest text-white red-underline">
            SS26 DROP
          </h2>
        </div>
        <NuxtLink to="/shop"
          class="hidden md:flex items-center gap-2 font-condensed text-xs tracking-widest uppercase text-white/40 hover:text-white transition-colors">
          All Products
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </NuxtLink>
      </div>

      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
        <ProductCard v-for="product in featuredProducts" :key="product.id" :product="product"
          @quickview="openQuickView" />
      </div>

      <div class="text-center mt-10 md:hidden">
        <NuxtLink to="/shop" class="btn-outline">View All</NuxtLink>
      </div>
    </section>

    <!-- Countdown Drop -->
    <section class="bg-surface border-y border-white/10 py-20">
      <div class="max-w-screen-xl mx-auto px-6">
        <div class="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <p class="font-condensed text-xs tracking-widest uppercase text-primary mb-3">Next Drop</p>
            <h2 class="font-display text-5xl md:text-6xl tracking-widest text-white mb-4">
              FALL/WINTER<br>2026
            </h2>
            <p class="font-body text-white/40 text-sm leading-relaxed max-w-sm">
              The next collection drops soon. Sign up to get early access before it goes live to the public.
            </p>
            <div class="flex gap-0 mt-8 max-w-sm">
              <input v-model="email" type="email" placeholder="your@email.com"
                class="flex-1 bg-dark border border-white/20 px-4 py-3 font-body text-sm text-white placeholder-white/20 outline-none focus:border-white/40 transition-colors" />
              <button class="btn-primary px-6 py-3">Notify Me</button>
            </div>
          </div>
          <div class="flex justify-center md:justify-end">
            <CountdownTimer />
          </div>
        </div>
      </div>
    </section>

    <!-- Brand Statement -->
    <section class="max-w-screen-xl mx-auto px-6 py-28">
      <div class="grid md:grid-cols-2 gap-16 items-center">
        <!-- Visual block -->
        <div class="relative">
          <div class="aspect-square bg-surface-light relative overflow-hidden">
            <!-- Image -->
            <img src="/images/brand/shop.png" alt="REVOLT Streetwear — Born in the Streets"
              class="w-full h-full object-cover" />
            <div class="absolute bottom-0 left-0 right-0 h-1 bg-primary" />
          </div>
          <!-- Red block accent -->
          <div class="absolute -bottom-4 -right-4 w-24 h-24 bg-primary/20 border border-primary/40" />
        </div>

        <!-- Text -->
        <div>
          <p class="font-condensed text-xs tracking-widest uppercase text-primary mb-6">Our Story</p>
          <h2 class="font-display text-4xl md:text-5xl tracking-widest text-white leading-tight mb-6">
            BUILT FOR<br>THOSE WHO<br>MOVE.
          </h2>
          <p class="font-body text-white/50 leading-relaxed mb-4">
            REVOLT Streetwear was born from the streets of Cordova, Cebu — a brand for those who live and breathe the
            culture. No hype, no shortcuts. Just quality garments built to last.
          </p>
          <p class="font-body text-white/50 leading-relaxed mb-8">
            Every piece is designed with intention: heavyweight fabrics, oversized silhouettes, and graphics that mean
            something to the community that wears them.
          </p>
          <NuxtLink to="/about" class="btn-outline">
            Read Our Story
          </NuxtLink>
        </div>
      </div>
    </section>

    <!-- Instagram Grid -->
    <section class="py-4 overflow-hidden">
      <div class="max-w-screen-xl mx-auto px-6 mb-8">
        <div class="flex items-center justify-between">
          <p class="font-condensed text-xs tracking-widest uppercase text-white/40">@revoltstreets</p>
          <a href="#"
            class="font-condensed text-xs tracking-widest uppercase text-primary hover:text-accent transition-colors">
            Follow Us
          </a>
        </div>
      </div>
      <div class="grid grid-cols-3 md:grid-cols-6 gap-1">
        <div v-for="i in 6" :key="i" class="aspect-square overflow-hidden relative group cursor-pointer">
          <img :src="`/images/instagram/ig-${i}.png`" :alt="`REVOLT Instagram ${i}`"
            class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
          <div
            class="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity bg-dark/50 flex items-center justify-center">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" class="text-white">
              <path
                d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
            </svg>
          </div>
        </div>
      </div>
    </section>

    <!-- Quick View Modal -->
    <Teleport to="body">
      <Transition name="fade">
        <div v-if="quickViewProduct" class="fixed inset-0 overlay z-50 flex items-center justify-center p-4"
          @click.self="quickViewProduct = null">
          <div class="bg-surface border border-white/10 w-full max-w-2xl flex flex-col md:flex-row">
            <!-- Image -->
            <div class="w-full md:w-2/5 aspect-square bg-surface-light flex items-center justify-center flex-shrink-0">
              <p class="font-display text-5xl text-white/10 tracking-widest">CRDV</p>
            </div>
            <!-- Info -->
            <div class="p-6 md:p-8 flex-1">
              <div class="flex justify-between items-start">
                <div>
                  <p class="font-condensed text-xs tracking-widest uppercase text-primary mb-1">{{
                    quickViewProduct.category }}</p>
                  <h3 class="font-display text-2xl tracking-widest text-white">{{ quickViewProduct.name }}</h3>
                </div>
                <button class="text-white/30 hover:text-white transition-colors ml-4" @click="quickViewProduct = null">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                    <line x1="18" y1="6" x2="6" y2="18" />
                    <line x1="6" y1="6" x2="18" y2="18" />
                  </svg>
                </button>
              </div>
              <p class="font-condensed font-semibold text-xl text-white mt-3 mb-6">
                ₱{{ quickViewProduct.price.toLocaleString() }}
              </p>
              <p class="font-body text-sm text-white/50 leading-relaxed mb-6">
                {{ quickViewProduct.description }}
              </p>
              <NuxtLink :to="`/shop/${quickViewProduct.slug}`" class="btn-primary w-full text-center block"
                @click="quickViewProduct = null">
                View Full Details
              </NuxtLink>
            </div>
          </div>
        </div>
      </Transition>
    </Teleport>
  </main>
</template>

<script setup lang="ts">
import { products } from '~/data/products'
import type { Product } from '~/data/products'

useHead({ title: 'REVOLT Streetwear — Born in the Streets. Built in Cordova.' })

const featuredProducts = products.slice(0, 3)
const email = ref('')
const quickViewProduct = ref<Product | null>(null)

function openQuickView(product: Product) {
  quickViewProduct.value = product
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
