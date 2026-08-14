<script setup lang="ts">
import { ref, computed, watch, onMounted } from 'vue';

const count = ref(0)
const isEvenOrOdd = computed(() => count.value % 2 === 0 ? "even" : "odd")

const incrementCount = () => {
    count.value++;
} 

const decrementCount = () => {
    count.value--;
}

watch(count,(newVal, prevVal) => {
    console.log(`count changed from ${prevVal} to ${newVal}`)
})

onMounted(() => {
    console.log(`Mounted and the count is ${count.value}`)
})
</script>

<template>
    <section class="flex min-h-screen items-center justify-center bg-slate-50 px-4">
      <div class="w-full max-w-xs rounded-2xl border border-slate-200 bg-white p-8 text-center shadow-sm">
  
        <h1 class="text-sm font-medium uppercase tracking-wide text-slate-500">My Counter</h1>
  
        <p class="mt-3 text-6xl font-semibold tabular-nums tracking-tight text-slate-900">{{ count }}</p>
  
        <span
          class="mt-2 inline-block rounded-full px-2.5 py-0.5 text-xs font-medium"
          :class="isEvenOrOdd === 'even' ? 'bg-indigo-50 text-indigo-700' : 'bg-amber-50 text-amber-700'"
        >
          {{ isEvenOrOdd }}
        </span>
  
        <div class="mt-6 flex items-center justify-center gap-2">
          <Button @click="decrementCount">–</Button>
          <Button @click="incrementCount">+</Button>
        </div>
  
      </div>
    </section>
  </template>