<template>
  <div class="about">
    <h1>{{ route.params.id }}</h1>
  </div>
</template>

<script setup>
import { useRoute } from "vue-router";


const route = useRoute();
console.log(route.params.id)
</script>

<style>
@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}
</style>
