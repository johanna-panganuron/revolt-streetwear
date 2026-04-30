<template>
  <div class="overflow-hidden bg-primary py-3 select-none">
    <div class="flex animate-marquee whitespace-nowrap">
      <span
        v-for="i in 2"
        :key="i"
        class="flex items-center"
      >
        <span
          v-for="item in items"
          :key="item"
          class="font-display text-base tracking-widest text-white mx-6"
        >
          {{ item }}
          <span class="text-white/40 mx-3">✦</span>
        </span>
      </span>
    </div>
  </div>
</template>

<script setup lang="ts">
withDefaults(defineProps<{
  items?: string[]
}>(), {
  items: () => [
    'NEW DROP — REVOLT SS26',
    'LIMITED ONLY',
    'FREE SHIPPING OVER ₱3,000',
    'BORN IN THE STREETS',
    'BUILT IN REVOLT',
    'USE CODE REVOLT10',
  ],
})
</script>
