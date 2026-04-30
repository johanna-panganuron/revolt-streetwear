<template>
  <main class="bg-dark min-h-screen pt-24">
    <MarqueeBanner />

    <div class="max-w-screen-xl mx-auto px-6 py-12">
      <!-- Header -->
      <div class="flex items-end justify-between mb-10">
        <div>
          <p class="font-condensed text-xs tracking-widest uppercase text-primary mb-2">Collection</p>
          <h1 class="font-display text-5xl md:text-7xl tracking-widest text-white">SHOP</h1>
          <p class="font-condensed text-xs text-white/30 tracking-wide mt-2">
            {{ filteredProducts.length }} products
          </p>
        </div>
        <!-- Sort -->
        <div class="flex items-center gap-3">
          <p class="font-condensed text-xs tracking-widest uppercase text-white/30 hidden md:block">Sort:</p>
          <select v-model="sortBy"
            class="bg-surface border border-white/10 text-white font-condensed text-xs tracking-widest uppercase px-4 py-2 outline-none hover:border-white/30 transition-colors cursor-pointer">
            <option value="latest">Latest</option>
            <option value="price-asc">Price: Low–High</option>
            <option value="price-desc">Price: High–Low</option>
          </select>
        </div>
      </div>

      <div class="flex gap-10">
        <!-- Filter Sidebar (desktop) -->
        <aside class="hidden md:block w-52 flex-shrink-0">
          <FilterSidebar v-model="filters" />
        </aside>

        <!-- Mobile filter toggle -->
        <div class="w-full">
          <button
            class="md:hidden flex items-center gap-2 mb-6 font-condensed text-xs tracking-widest uppercase text-white/60 border border-white/20 px-4 py-2 hover:border-white/40 transition-colors"
            @click="mobileFilter = !mobileFilter">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
              <line x1="4" y1="6" x2="20" y2="6" />
              <line x1="8" y1="12" x2="20" y2="12" />
              <line x1="12" y1="18" x2="20" y2="18" />
            </svg>
            Filters
          </button>

          <!-- Mobile filter panel -->
          <Transition name="slide">
            <div v-if="mobileFilter" class="md:hidden mb-8 bg-surface border border-white/10 p-6">
              <FilterSidebar v-model="filters" />
            </div>
          </Transition>

          <!-- Product grid -->
          <div v-if="filteredProducts.length > 0" class="grid grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            <ProductCard v-for="product in filteredProducts" :key="product.id" :product="product"
              @quickview="quickViewProduct = $event" />
          </div>

          <!-- Empty state -->
          <div v-else class="py-24 text-center">
            <p class="font-display text-4xl text-white/10 tracking-widest mb-4">NO RESULTS</p>
            <p class="font-condensed text-sm text-white/30 tracking-wide mb-6">No products match your filters.</p>
            <button class="btn-outline text-xs" @click="filters = { category: '', size: '', color: '', maxPrice: 3000 }">
              Clear Filters
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Quick View -->
    <Teleport to="body">
      <Transition name="fade">
        <div v-if="quickViewProduct" class="fixed inset-0 overlay z-50 flex items-center justify-center p-4"
          @click.self="quickViewProduct = null">
          <div class="bg-surface border border-white/10 w-full max-w-2xl flex flex-col md:flex-row">
            <div class="w-full md:w-2/5 aspect-square bg-surface-light flex-shrink-0 overflow-hidden">
              <img v-if="quickViewProduct.images?.[0]" :src="quickViewProduct.images[0]" :alt="quickViewProduct.name"
                class="w-full h-full object-cover" />
              <div v-else class="w-full h-full flex items-center justify-center">
                <p class="font-display text-5xl text-white/10 tracking-widest">REVOLT</p>
              </div>
            </div>
            <div class="p-6 md:p-8 flex-1">
              <div class="flex justify-between items-start">
                <div>
                  <p class="font-condensed text-xs tracking-widest uppercase text-primary mb-1">{{
                    quickViewProduct.category }}</p>
                  <h3 class="font-display text-2xl tracking-widest text-white">{{ quickViewProduct.name }}</h3>
                </div>
                <button class="text-white/30 hover:text-white transition-colors" @click="quickViewProduct = null">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                    <line x1="18" y1="6" x2="6" y2="18" />
                    <line x1="6" y1="6" x2="18" y2="18" />
                  </svg>
                </button>
              </div>
              <p class="font-condensed font-semibold text-xl text-white mt-3 mb-6">
                ₱{{ quickViewProduct.price.toLocaleString() }}
              </p>
              <p class="font-body text-sm text-white/50 leading-relaxed mb-6">{{ quickViewProduct.description }}</p>
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
import type { FilterState } from '~/components/FilterSidebar.vue'

useHead({ title: 'Shop — REVOLT Streetwear' })

const route = useRoute()
const sortBy = ref('latest')
const mobileFilter = ref(false)
const quickViewProduct = ref<Product | null>(null)

const filters = ref<FilterState>({
  category: (route.query.category as string) || '',
  size: '',
  color: '',
  maxPrice: 3000,
})

const filteredProducts = computed(() => {
  let list = [...products]

  if (filters.value.category) {
    list = list.filter((p) => p.category === filters.value.category)
  }
  if (filters.value.size) {
    list = list.filter((p) => p.sizes.includes(filters.value.size))
  }
  if (filters.value.color) {
    list = list.filter((p) => p.colors.includes(filters.value.color))
  }
  list = list.filter((p) => p.price <= filters.value.maxPrice)

  if (sortBy.value === 'price-asc') list.sort((a, b) => a.price - b.price)
  else if (sortBy.value === 'price-desc') list.sort((a, b) => b.price - a.price)

  return list
})
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

.slide-enter-active,
.slide-leave-active {
  transition: opacity 0.2s ease, transform 0.2s ease;
}

.slide-enter-from,
.slide-leave-to {
  opacity: 0;
  transform: translateY(-8px);
}
</style>
