import { createRouter, createWebHistory } from 'vue-router';
import PokemonList from '../views/PokemonList.vue';
// import PokemonData from "../views/PokemonData.vue";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      component: PokemonList,
    },
    {
      path: '/pokemon/:id',
      name: 'pokemon',
      component: () => import('../views/PokemonData.vue'),
    },
    {
      path: '/search/:id',
      name: 'search',
      component: () => import('../views/SearchResult.vue'),
    },
  ],
});

export default router;
