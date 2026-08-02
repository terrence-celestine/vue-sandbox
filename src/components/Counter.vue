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
  <section>
    <div>
        <h1>My Counter</h1>
        <p>{{ count }} - Number is even/odd?: {{ isEvenOrOdd }}</p>
        <button @click="incrementCount">Increase the counter</button>
        <button @click="decrementCount">Decrease the counter</button>
    </div>
  </section>
</template>
