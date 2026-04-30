<template>
  <aside class="w-full">
    <!-- Header -->
    <div class="flex items-center justify-between mb-6">
      <p class="font-condensed text-xs tracking-widest uppercase text-white/40">Filter</p>
      <button
        v-if="hasFilters"
        class="font-condensed text-xs tracking-widest uppercase text-primary hover:text-accent transition-colors"
        @click="clearAll"
      >
        Clear All
      </button>
    </div>

    <!-- Category -->
    <div class="mb-8">
      <p class="font-condensed text-xs tracking-widest uppercase text-white/30 mb-3">Category</p>
      <div class="flex flex-wrap gap-2">
        <button
          v-for="cat in categories"
          :key="cat.value"
          class="filter-chip"
          :class="{ active: modelValue.category === cat.value }"
          @click="set('category', modelValue.category === cat.value ? '' : cat.value)"
        >
          {{ cat.label }}
        </button>
      </div>
    </div>

    <!-- Size -->
    <div class="mb-8">
      <p class="font-condensed text-xs tracking-widest uppercase text-white/30 mb-3">Size</p>
      <div class="flex flex-wrap gap-2">
        <button
          v-for="size in sizes"
          :key="size"
          class="size-btn"
          :class="{ active: modelValue.size === size }"
          @click="set('size', modelValue.size === size ? '' : size)"
        >
          {{ size }}
        </button>
      </div>
    </div>

    <!-- Color -->
    <div class="mb-8">
      <p class="font-condensed text-xs tracking-widest uppercase text-white/30 mb-3">Color</p>
      <div class="flex flex-wrap gap-3">
        <button
          v-for="color in colors"
          :key="color.name"
          class="w-7 h-7 border-2 transition-all duration-150 relative"
          :class="[
            color.class,
            modelValue.color === color.name ? 'border-white scale-110' : 'border-transparent',
          ]"
          :title="color.name"
          @click="set('color', modelValue.color === color.name ? '' : color.name)"
        >
          <span
            v-if="modelValue.color === color.name"
            class="absolute inset-0 flex items-center justify-center"
          >
            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" :class="color.name === 'White' ? 'text-black' : 'text-white'">
              <polyline points="20 6 9 17 4 12"/>
            </svg>
          </span>
        </button>
      </div>
    </div>

    <!-- Price -->
    <div class="mb-8">
      <p class="font-condensed text-xs tracking-widest uppercase text-white/30 mb-3">
        Price — Up to ₱{{ modelValue.maxPrice.toLocaleString() }}
      </p>
      <input
        type="range"
        min="500"
        max="3000"
        step="100"
        :value="modelValue.maxPrice"
        class="w-full"
        @input="set('maxPrice', Number(($event.target as HTMLInputElement).value))"
      />
      <div class="flex justify-between font-condensed text-xs text-white/30 mt-2">
        <span>₱500</span>
        <span>₱3,000</span>
      </div>
    </div>
  </aside>
</template>

<script setup lang="ts">
export interface FilterState {
  category: string
  size: string
  color: string
  maxPrice: number
}

const props = defineProps<{ modelValue: FilterState }>()
const emit = defineEmits<{ 'update:modelValue': [FilterState] }>()

const categories = [
  { label: 'All', value: '' },
  { label: 'Tees', value: 'tees' },
  { label: 'Hoodies', value: 'hoodies' },
  { label: 'Bottoms', value: 'bottoms' },
  { label: 'Accessories', value: 'accessories' },
]

const sizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL']

const colors = [
  { name: 'Black', class: 'bg-black border border-white/20' },
  { name: 'White', class: 'bg-white' },
  { name: 'Red', class: 'bg-primary' },
  { name: 'Gray', class: 'bg-gray-500' },
]

const hasFilters = computed(() =>
  props.modelValue.category !== '' ||
  props.modelValue.size !== '' ||
  props.modelValue.color !== '' ||
  props.modelValue.maxPrice < 3000
)

function set(key: keyof FilterState, value: string | number) {
  emit('update:modelValue', { ...props.modelValue, [key]: value })
}

function clearAll() {
  emit('update:modelValue', { category: '', size: '', color: '', maxPrice: 3000 })
}
</script>
