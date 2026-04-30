<template>
  <div class="product-card group relative">
    <!-- Image -->
    <NuxtLink :to="`/shop/${product.slug}`" class="block">
      <div class="zoom-container relative aspect-[3/4] bg-surface overflow-hidden">
        <!-- Product image -->
        <img v-if="product.images?.[0]" :src="product.images[0]" :alt="product.name"
          class="zoom-image w-full h-full object-cover" />
        <div v-else class="zoom-image w-full h-full bg-surface-light flex items-center justify-center">
          <p class="font-display text-4xl text-white/10 tracking-widest">REVOLT</p>
        </div>

        <!-- Badges -->
        <div class="absolute top-3 left-3 flex flex-col gap-1">
          <span v-if="product.isNew" class="badge-new">New</span>
          <span v-if="product.isSoldOut" class="badge-sold">Sold Out</span>
          <span v-else-if="lowStock"
            class="bg-white/10 text-white/80 text-xs font-condensed tracking-widest uppercase px-2 py-0.5">
            Low Stock
          </span>
        </div>

        <!-- Quick view overlay -->
        <div
          class="absolute inset-0 bg-dark/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-6">
          <button
            class="btn-outline text-xs px-6 py-2 translate-y-2 group-hover:translate-y-0 transition-transform duration-300"
            @click.prevent="emit('quickview', product)">
            Quick View
          </button>
        </div>

        <!-- Wishlist -->
        <button
          class="absolute top-3 right-3 w-8 h-8 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 bg-dark/80 hover:bg-primary"
          @click.prevent="wishlistStore.toggle(product.id)">
          <svg width="14" height="14" viewBox="0 0 24 24" :fill="isWishlisted ? 'currentColor' : 'none'"
            stroke="currentColor" stroke-width="1.5" class="text-white">
            <path
              d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
          </svg>
        </button>
      </div>
    </NuxtLink>

    <!-- Info -->
    <div class="mt-3">
      <div class="flex items-start justify-between gap-2">
        <NuxtLink :to="`/shop/${product.slug}`">
          <p
            class="font-condensed font-semibold text-sm tracking-wide text-white hover:text-primary transition-colors uppercase">
            {{ product.name }}
          </p>
          <p class="font-condensed text-xs text-white/40 tracking-widest uppercase mt-0.5">
            {{ product.category }}
          </p>
        </NuxtLink>
        <p class="font-condensed font-semibold text-sm text-white whitespace-nowrap">
          ₱{{ product.price.toLocaleString() }}
        </p>
      </div>

      <!-- Color dots -->
      <div class="flex gap-1.5 mt-2">
        <span v-for="color in product.colors.slice(0, 3)" :key="color" class="w-3 h-3 border border-white/20"
          :class="colorClass(color)" :title="color" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Product } from '~/data/products'
import { useWishlistStore } from '~/stores/wishlist'

const props = defineProps<{ product: Product }>()
const emit = defineEmits<{ quickview: [product: Product] }>()

const wishlistStore = useWishlistStore()
const isWishlisted = computed(() => wishlistStore.isWishlisted(props.product.id))

const lowStock = computed(() => {
  if (props.product.isSoldOut) return false
  const total = Object.values(props.product.stock).reduce((a, b) => a + b, 0)
  return total > 0 && total <= 5
})

function colorClass(color: string): string {
  const map: Record<string, string> = {
    // Basic colors
    Black: 'bg-black',
    White: 'bg-white',
    Red: 'bg-primary',
    Gray: 'bg-gray-500',
    // Denim colors
    Blue: 'bg-indigo-700',
    'Black Wash': 'bg-zinc-900',
    'Indigo Blue': 'bg-indigo-700',
    'Distressed Gray': 'bg-gray-500',
    'Off White': 'bg-stone-100',
    // Varsity colors
    'Black/Red': 'bg-black',
    'White/Black': 'bg-white',
    'Red/Black': 'bg-primary',
  }
  return map[color] || 'bg-gray-400'
}
</script>
