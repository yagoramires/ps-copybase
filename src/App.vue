<script setup>
import { RouterLink, RouterView } from 'vue-router'
import SearchForm from './components/SearchForm.vue';
</script>

<template>
  <header>
    <RouterLink to="/">
      <img alt="Pokemon logo" class="logo" src="@/assets/logo.svg" width="125" height="125" />
    </RouterLink>
    <SearchForm />
  </header>

  <RouterView />
</template>

<style lang="scss" scoped>
@use './assets/main.scss' as *;

.logo {
  width: 250px;
  height: 250px;
  margin-top: -3rem;
}

header {
  width: 100%;
  @include flexCenter;
  flex-direction: column
}

main {
  @include flexCenter;
  flex-direction: column;
  gap: 2rem;
}

@media (min-width: 1024px) {
  .logo {
    width: 300px;
    height: 300px;
  }
}
</style>
