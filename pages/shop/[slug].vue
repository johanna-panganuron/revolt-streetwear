<template>
  <main v-if="product" class="bg-dark min-h-screen pt-24">
    <div class="max-w-screen-xl mx-auto px-6 py-12">
      <!-- Breadcrumb -->
      <nav class="flex items-center gap-2 font-condensed text-xs tracking-widest uppercase text-white/30 mb-10">
        <NuxtLink to="/" class="hover:text-white transition-colors">Home</NuxtLink>
        <span>/</span>
        <NuxtLink to="/shop" class="hover:text-white transition-colors">Shop</NuxtLink>
        <span>/</span>
        <span class="text-white/60">{{ product.name }}</span>
      </nav>

      <div class="grid md:grid-cols-2 gap-12 lg:gap-20">
        <!-- Gallery -->
        <div class="space-y-3">
          <!-- Main image -->
          <div class="zoom-container aspect-[4/5] bg-surface-light relative">
            <img :src="product.images[activeThumb - 1]" :alt="product.name" class="w-full h-full object-cover" />
            <!-- Badges -->
            <div class="absolute top-4 left-4 flex flex-col gap-1">
              <span v-if="product.isNew" class="badge-new">New</span>
              <span v-if="product.isSoldOut" class="badge-sold">Sold Out</span>
            </div>
          </div>

          <!-- Thumbnails -->
          <div class="grid grid-cols-4 gap-2">
            <div v-for="(img, index) in product.images" :key="index"
              class="aspect-square bg-surface-light cursor-pointer border transition-colors"
              :class="activeThumb === index + 1 ? 'border-primary' : 'border-transparent hover:border-white/20'"
              @click="activeThumb = index + 1">
              <img :src="img" :alt="`${product.name} view ${index + 1}`" class="w-full h-full object-cover" />
            </div>
          </div>
        </div>

        <!-- Product Info -->
        <div class="flex flex-col">
          <!-- Category & Name -->
          <p class="font-condensed text-xs tracking-widest uppercase text-primary mb-2">{{ product.category }}</p>
          <h1 class="font-display text-4xl md:text-5xl tracking-widest text-white mb-2">{{ product.name }}</h1>
          <p class="font-condensed font-semibold text-2xl text-white mb-6">
            ₱{{ product.price.toLocaleString() }}
          </p>

          <!-- Stock label -->
          <div class="flex items-center gap-2 mb-6">
            <div class="w-1.5 h-1.5 rounded-full"
              :class="product.isSoldOut ? 'bg-red-500' : totalStock <= 5 ? 'bg-yellow-400' : 'bg-green-400'" />
            <p class="font-condensed text-xs tracking-widest uppercase text-white/50">
              {{ product.isSoldOut ? 'Sold Out' : totalStock <= 5 ? `Low Stock — ${totalStock} left` : 'In Stock' }} </p>
          </div>

          <!-- Color selector -->
          <div class="mb-6">
            <p class="font-condensed text-xs tracking-widest uppercase text-white/30 mb-3">
              Color — <span class="text-white/60">{{ selectedColor }}</span>
            </p>
            <div class="flex gap-2">
              <button v-for="color in product.colors" :key="color" class="w-8 h-8 border-2 transition-all duration-150"
                :class="[
                  colorClass(color),
                  selectedColor === color ? 'border-white scale-110' : 'border-transparent',
                ]" :title="color" @click="selectedColor = color" />
            </div>
          </div>

          <!-- Size selector -->
          <div class="mb-8">
            <div class="flex items-center justify-between mb-3">
              <p class="font-condensed text-xs tracking-widest uppercase text-white/30">Size</p>
              <button
                class="font-condensed text-xs tracking-widest uppercase text-primary hover:text-accent transition-colors underline"
                @click="sizeGuideOpen = true">
                Size Guide
              </button>
            </div>
            <div class="flex flex-wrap gap-2">
              <button v-for="size in product.sizes" :key="size" class="size-btn" :class="{
                active: selectedSize === size,
                'sold-out': product.stock[size] === 0,
              }" :disabled="product.stock[size] === 0" @click="product.stock[size] > 0 && (selectedSize = size)">
                {{ size }}
              </button>
            </div>
            <p v-if="selectedSize && product.stock[selectedSize] > 0 && product.stock[selectedSize] <= 3"
              class="font-condensed text-xs text-yellow-400 tracking-wide mt-2">
              Only {{ product.stock[selectedSize] }} left in {{ selectedSize }}
            </p>
          </div>

          <!-- Quantity + Add to cart -->
          <div class="flex gap-3 mb-6">
            <div class="flex border border-white/20">
              <button
                class="w-10 h-12 flex items-center justify-center text-white/60 hover:text-white hover:bg-white/5 transition-colors"
                @click="qty = Math.max(1, qty - 1)">−</button>
              <span class="w-12 h-12 flex items-center justify-center font-condensed text-white">{{ qty }}</span>
              <button
                class="w-10 h-12 flex items-center justify-center text-white/60 hover:text-white hover:bg-white/5 transition-colors"
                @click="qty++">+</button>
            </div>
            <button class="btn-primary flex-1 disabled:opacity-40 disabled:cursor-not-allowed"
              :disabled="product.isSoldOut || !selectedSize" @click="addToCart">
              {{ product.isSoldOut ? 'Sold Out' : !selectedSize ? 'Select Size' : 'Add to Cart' }}
            </button>
          </div>

          <!-- Added confirmation -->
          <Transition name="fade">
            <div v-if="addedMsg" class="flex items-center gap-2 font-condensed text-xs tracking-wide text-green-400 mb-4">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <polyline points="20 6 9 17 4 12" />
              </svg>
              Added to cart!
            </div>
          </Transition>

          <!-- Wishlist -->
          <button
            class="flex items-center gap-2 font-condensed text-xs tracking-widest uppercase text-white/40 hover:text-white transition-colors mb-8"
            @click="wishlist.toggle(product.id)">
            <svg width="14" height="14" viewBox="0 0 24 24"
              :fill="wishlist.isWishlisted(product.id) ? 'currentColor' : 'none'" stroke="currentColor"
              stroke-width="1.5">
              <path
                d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
            </svg>
            {{ wishlist.isWishlisted(product.id) ? 'Saved to Wishlist' : 'Add to Wishlist' }}
          </button>

          <!-- Accordion -->
          <div class="border-t border-white/10">
            <div v-for="item in accordionItems" :key="item.label" class="border-b border-white/10">
              <button
                class="w-full flex items-center justify-between py-4 font-condensed text-sm tracking-widest uppercase text-white/70 hover:text-white transition-colors"
                @click="toggleAccordion(item.label)">
                {{ item.label }}
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"
                  class="transition-transform duration-200" :class="openAccordion === item.label ? 'rotate-45' : ''">
                  <line x1="12" y1="5" x2="12" y2="19" />
                  <line x1="5" y1="12" x2="19" y2="12" />
                </svg>
              </button>
              <div v-if="openAccordion === item.label" class="pb-4">
                <p class="font-body text-sm text-white/50 leading-relaxed">{{ item.content }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- You might also like -->
      <div class="mt-24">
        <h2 class="font-display text-4xl tracking-widest text-white mb-10 red-underline">YOU MIGHT ALSO LIKE</h2>
        <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          <ProductCard v-for="p in related" :key="p.id" :product="p" />
        </div>
      </div>
    </div>

    <SizeGuideModal :is-open="sizeGuideOpen" @close="sizeGuideOpen = false" />
  </main>

  <main v-else class="bg-dark min-h-screen pt-40 flex items-center justify-center">
    <div class="text-center">
      <p class="font-display text-6xl text-white/10 tracking-widest mb-4">404</p>
      <p class="font-condensed text-sm text-white/30 tracking-wide mb-6">Product not found.</p>
      <NuxtLink to="/shop" class="btn-outline">Back to Shop</NuxtLink>
    </div>
  </main>
</template>

<script setup lang="ts">
import { products } from '~/data/products'
import { useWishlistStore } from '~/stores/wishlist'

const route = useRoute()
const cart = useCart()
const wishlist = useWishlistStore()

const product = computed(() => products.find((p) => p.slug === route.params.slug))
const related = computed(() =>
  products.filter((p) => p.id !== product.value?.id && p.category === product.value?.category).slice(0, 4)
)

useHead(() => ({
  title: product.value ? `${product.value.name} — REVOLT Streetwear` : 'REVOLT Streetwear',
}))

const activeThumb = ref(1)
const selectedColor = ref(product.value?.colors[0] || '')
const selectedSize = ref('')
const qty = ref(1)
const openAccordion = ref<string | null>('Description')
const sizeGuideOpen = ref(false)
const addedMsg = ref(false)

const totalStock = computed(() =>
  Object.values(product.value?.stock || {}).reduce((a, b) => a + b, 0)
)

const accordionItems = computed(() => [
  { label: 'Description', content: product.value?.description || '' },
  { label: 'Details & Materials', content: '100% heavyweight cotton. Screen-printed graphics. Pre-washed for softness. Ribbed crewneck collar. Double-stitched seams throughout.' },
  { label: 'Shipping & Returns', content: 'Free shipping on orders over ₱3,000. Standard delivery 3–5 business days. Returns accepted within 14 days of delivery for unworn, unwashed items.' },
  { label: 'Care Instructions', content: 'Machine wash cold with similar colors. Do not bleach. Tumble dry low. Do not iron on print. Wash inside out to preserve graphics.' },
])

function toggleAccordion(label: string) {
  openAccordion.value = openAccordion.value === label ? null : label
}

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

function addToCart() {
  if (!product.value || !selectedSize.value) return
  cart.addItem({
    productId: product.value.id,
    name: product.value.name,
    price: product.value.price,
    size: selectedSize.value,
    color: selectedColor.value,
    quantity: qty.value,
    image: product.value.images[0],
    slug: product.value.slug,
  })
  addedMsg.value = true
  setTimeout(() => { addedMsg.value = false }, 2500)
}
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
