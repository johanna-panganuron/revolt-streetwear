<template>
  <div class="flex gap-4 md:gap-8">
    <div
      v-for="unit in units"
      :key="unit.label"
      class="flex flex-col items-center"
    >
      <div class="bg-surface border border-white/10 w-16 md:w-24 h-16 md:h-24 flex items-center justify-center relative overflow-hidden">
        <span class="font-display text-3xl md:text-5xl text-white tracking-widest">
          {{ String(unit.value).padStart(2, '0') }}
        </span>
        <div class="absolute bottom-0 left-0 right-0 h-px bg-white/5" />
      </div>
      <span class="font-condensed text-xs tracking-widest uppercase text-white/40 mt-2">
        {{ unit.label }}
      </span>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = withDefaults(defineProps<{
  targetDate?: string
}>(), {
  targetDate: () => {
    const d = new Date()
    d.setDate(d.getDate() + 7)
    return d.toISOString()
  },
})

const days = ref(0)
const hours = ref(0)
const minutes = ref(0)
const seconds = ref(0)

const units = computed(() => [
  { label: 'Days', value: days.value },
  { label: 'Hours', value: hours.value },
  { label: 'Mins', value: minutes.value },
  { label: 'Secs', value: seconds.value },
])

let timer: ReturnType<typeof setInterval> | null = null

function tick() {
  const target = new Date(props.targetDate).getTime()
  const now = Date.now()
  const diff = Math.max(0, target - now)

  days.value = Math.floor(diff / (1000 * 60 * 60 * 24))
  hours.value = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
  minutes.value = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))
  seconds.value = Math.floor((diff % (1000 * 60)) / 1000)
}

onMounted(() => {
  tick()
  timer = setInterval(tick, 1000)
})

onUnmounted(() => {
  if (timer) clearInterval(timer)
})
</script>
