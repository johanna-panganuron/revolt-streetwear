<template>
  <main class="bg-dark min-h-screen pt-24">
    <!-- Header -->
    <div class="max-w-screen-xl mx-auto px-6 py-12">
      <div class="flex items-end justify-between mb-2">
        <div>
          <p class="font-condensed text-xs tracking-widest uppercase text-primary mb-2">Editorial</p>
          <h1 class="font-display text-5xl md:text-8xl tracking-widest text-white">LOOKBOOK</h1>
        </div>
        <p class="font-condensed text-xs text-white/30 tracking-widest uppercase hidden md:block">
          SS26 — Cordova, Cebu
        </p>
      </div>
      <div class="h-px bg-white/10 mt-6 mb-12" />

      <!-- Issue intro -->
      <div class="grid md:grid-cols-3 gap-8 mb-16">
        <div class="md:col-span-2">
          <p class="font-body text-white/50 leading-relaxed text-lg">
            Shot on the streets and rooftops of REVOLTS Streetwear Shop. The SS26 collection is about the weight of everyday life — the fabric we put on our backs, the ground beneath our feet.
          </p>
        </div>
        <div class="flex items-end">
          <p class="font-condensed text-xs tracking-widest uppercase text-white/20">
            Photography by REVOLT Creative House<br>
            Location: Catarman, Cordova, Cebu<br>
            Season: SS26
          </p>
        </div>
      </div>

      <!-- Full-width hero shot -->
      <div class="relative w-full aspect-[16/7] bg-surface-light mb-3 overflow-hidden">
        <img
        :src="heroImage"
          alt="Look 01 — REVOLT SS26"
          class="w-full h-full object-cover"
        />
      </div>

      <!-- Masonry grid -->
      <div class="grid grid-cols-2 md:grid-cols-3 gap-3">
        <div
          v-for="(look, idx) in looks"
          :key="look.id"
          class="masonry-item relative group cursor-pointer"
          :class="idx % 3 === 1 ? 'mt-10' : ''"
        >
          <div
            class="bg-surface-light overflow-hidden relative"
            :class="idx % 2 === 0 ? 'aspect-[3/4]' : 'aspect-square'"
          >
            <!-- Image -->
            <img
              :src="look.src"
              :alt="`Look ${String(look.id).padStart(2, '0')}`"
              class="w-full h-full object-cover"
            />

            <!-- Hover overlay -->
            <div class="absolute inset-0 bg-dark/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
              <p class="font-condensed text-xs tracking-widest uppercase text-white/60 mb-2">
                Look {{ String(look.id).padStart(2, '0') }}
              </p>
              <div class="flex flex-wrap gap-1">
                <button
                  v-for="pid in look.products"
                  :key="pid"
                  class="font-condensed text-xs bg-primary text-white px-2 py-0.5 tracking-wide hover:bg-accent transition-colors"
                  @click.stop="navigateTo(`/shop/${getProduct(pid)?.slug}`)"
                >
                  + {{ getProduct(pid)?.name }}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Pull quote -->
      <div class="my-24 border-l-4 border-primary pl-8">
        <p class="font-display text-3xl md:text-5xl text-white/80 tracking-wide leading-tight">
          "NOT MADE FOR EVERYONE.<br>MADE FOR THOSE<br>WHO GET IT."
        </p>
        <p class="font-condensed text-xs tracking-widest uppercase text-primary mt-4">— REVOLT STREETWEAR</p>
      </div>

      <!-- Second full-width -->
      <div class="w-full aspect-[16/9] bg-surface-light mb-3 overflow-hidden relative">
        <img
        :src="groupImage"
          alt="SS26 Group Shot"
          class="w-full h-full object-cover"
        />
        <div class="absolute inset-0 flex items-end p-8">
          <div>
            <p class="font-condensed text-xs tracking-widest uppercase text-white/30 mb-1">Group Shot</p>
            <p class="font-condensed text-sm text-white/60 tracking-wide">The full SS26 cast, REVOLT waterfront.</p>
          </div>
        </div>
      </div>

      <!-- Shop CTA -->
      <div class="text-center py-20">
        <p class="font-condensed text-xs tracking-widest uppercase text-white/30 mb-4">Ready to wear?</p>
        <h2 class="font-display text-5xl md:text-7xl tracking-widest text-white mb-8">SHOP SS26</h2>
        <NuxtLink to="/shop" class="btn-primary">Browse Collection</NuxtLink>
      </div>
    </div>
  </main>
</template>

<script setup lang="ts">
import { products, lookbookImages, heroImage, groupImage } from '~/data/products'

useHead({ title: 'Lookbook SS26 — REVOLT Streetwear' })

const looks = lookbookImages

function getProduct(id: number) {
  return products.find((p) => p.id === id)
}
</script>