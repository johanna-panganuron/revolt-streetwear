<template>
  <Teleport to="body">
    <Transition name="fade">
      <div
        v-if="isOpen"
        class="fixed inset-0 overlay z-50 flex items-center justify-center p-4"
        @click.self="emit('close')"
      >
        <div class="bg-surface border border-white/10 w-full max-w-lg max-h-[80vh] overflow-y-auto">
          <div class="flex items-center justify-between px-6 py-4 border-b border-white/10">
            <p class="font-display text-xl tracking-widest">SIZE GUIDE</p>
            <button class="text-white/40 hover:text-white transition-colors" @click="emit('close')">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
              </svg>
            </button>
          </div>

          <div class="px-6 py-6">
            <div class="flex gap-4 mb-6">
              <button
                v-for="unit in ['CM', 'IN']"
                :key="unit"
                class="font-condensed text-xs tracking-widest uppercase px-4 py-2 border transition-colors"
                :class="selectedUnit === unit ? 'bg-primary border-primary text-white' : 'border-white/20 text-white/60 hover:border-white/40'"
                @click="selectedUnit = unit"
              >
                {{ unit }}
              </button>
            </div>

            <table class="w-full font-condensed text-sm">
              <thead>
                <tr class="border-b border-white/10">
                  <th class="text-left py-2 text-white/40 tracking-widest font-normal text-xs uppercase">Size</th>
                  <th class="text-center py-2 text-white/40 tracking-widest font-normal text-xs uppercase">Chest</th>
                  <th class="text-center py-2 text-white/40 tracking-widest font-normal text-xs uppercase">Length</th>
                  <th class="text-center py-2 text-white/40 tracking-widest font-normal text-xs uppercase">Shoulder</th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="row in table"
                  :key="row.size"
                  class="border-b border-white/5 hover:bg-white/5 transition-colors"
                >
                  <td class="py-3 font-semibold text-white">{{ row.size }}</td>
                  <td class="py-3 text-center text-white/70">{{ selectedUnit === 'CM' ? row.chest_cm : row.chest_in }}</td>
                  <td class="py-3 text-center text-white/70">{{ selectedUnit === 'CM' ? row.length_cm : row.length_in }}</td>
                  <td class="py-3 text-center text-white/70">{{ selectedUnit === 'CM' ? row.shoulder_cm : row.shoulder_in }}</td>
                </tr>
              </tbody>
            </table>

            <p class="font-body text-xs text-white/30 mt-6 leading-relaxed">
              All measurements are in {{ selectedUnit === 'CM' ? 'centimeters' : 'inches' }}. Measurements may vary ±1–2 {{ selectedUnit === 'CM' ? 'cm' : 'in' }}.
              When in doubt, size up for a more relaxed fit.
            </p>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
defineProps<{ isOpen: boolean }>()
const emit = defineEmits<{ close: [] }>()

const selectedUnit = ref('CM')

const table = [
  { size: 'XS', chest_cm: '96', length_cm: '67', shoulder_cm: '44', chest_in: '37.8', length_in: '26.4', shoulder_in: '17.3' },
  { size: 'S', chest_cm: '100', length_cm: '70', shoulder_cm: '46', chest_in: '39.4', length_in: '27.6', shoulder_in: '18.1' },
  { size: 'M', chest_cm: '106', length_cm: '73', shoulder_cm: '48', chest_in: '41.7', length_in: '28.7', shoulder_in: '18.9' },
  { size: 'L', chest_cm: '112', length_cm: '76', shoulder_cm: '50', chest_in: '44.1', length_in: '29.9', shoulder_in: '19.7' },
  { size: 'XL', chest_cm: '118', length_cm: '79', shoulder_cm: '53', chest_in: '46.5', length_in: '31.1', shoulder_in: '20.9' },
  { size: 'XXL', chest_cm: '126', length_cm: '82', shoulder_cm: '56', chest_in: '49.6', length_in: '32.3', shoulder_in: '22.0' },
]
</script>

<style scoped>
.fade-enter-active, .fade-leave-active { transition: opacity 0.2s ease; }
.fade-enter-from, .fade-leave-to { opacity: 0; }
</style>
