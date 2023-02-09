<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <header>
    <img alt="Pokemon logo" class="logo" src="@/assets/logo.svg" width="125" height="125" />
  </header>

  <div class="wrapper">


    <nav>
      <RouterLink to="/">Home</RouterLink>
      <RouterLink to="/about">About</RouterLink>
    </nav>
  </div>

  <RouterView />
</template>

<style lang="scss" scoped>
@use './assets/main.scss' as *;

.logo {
  width: 250px;
  height: 250px
}

header {
  width: 100%;
  @include flexCenter;
}

main {
  @include flexCenter;
  flex-direction: column;
  gap: 2rem;
}
</style>
