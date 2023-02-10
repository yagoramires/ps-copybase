<template>
  <main>
    <div class="listContainer">
      <h2 class="title">Pokemons</h2>

      <div>
        <ul class="list">
          <li v-for="(pokemon, index) in pokemons" :key="index">
            <RouterLink :to="{
              name: 'pokemon',
              params: {
                id: pokemon.url.replace(
                  'https://pokeapi.co/api/v2/pokemon/',
                  ''
                ),
              },
            }" class="list___item">
              {{ pokemon.name }}
            </RouterLink>
          </li>
        </ul>
      </div>

      <div class="buttonContainer">
        <button v-if="prevPage !== null" @click="loadPrevPage" class="buttonContainer__btn">
          {{ fetchingPokemon? '...': 'Voltar' }}
        </button>
        <button @click="loadNextPage" class="buttonContainer__btn">
          {{ fetchingPokemon? '...': 'Próxima' }}
        </button>
      </div>
    </div>
  </main>
</template>

<script>
import { defineComponent, ref, onMounted } from 'vue';
import api from '@/services/api';
import axios from 'axios';

export default defineComponent({
  name: 'PokemonList',
  setup() {
    const pokemons = ref([]);
    let nextPage = ref('');
    let prevPage = ref('');
    const fetchPokemons = async () => {
      const fetchData = await api.get('/pokemon');
      nextPage.value = fetchData.data.next;
      prevPage.value = fetchData.data.previous;
      pokemons.value = fetchData.data.results;
    };

    const loadNextPage = async () => {
      const fetchData = await axios.get(nextPage.value);
      pokemons.value = fetchData.data.results;
      nextPage.value = fetchData.data.next;
      prevPage.value = fetchData.data.previous;
    };

    const loadPrevPage = async () => {
      const fetchData = await axios.get(prevPage.value);
      pokemons.value = fetchData.data.results;
      nextPage.value = fetchData.data.next;
      prevPage.value = fetchData.data.previous;
    };

    onMounted(fetchPokemons);

    return { pokemons, loadNextPage, loadPrevPage, prevPage, nextPage };
  },
});
</script>

<style lang="scss" scoped>
@use '../assets/main.scss' as *;

.listContainer {
  @include flexCenter;
  flex-direction: column;
  padding: 1rem;
}

.title {
  font-weight: bold;
  font-size: 2.5rem;
  color: $yellow;
}

.list {
  list-style-type: none;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1rem;
}

.list___item {
  text-transform: capitalize;
  font-weight: 600;
  color: #fff;
}

.buttonContainer {
  width: 100%;
  @include flexCenter;
  gap: 1rem;
}

.buttonContainer__btn {
  font-size: 18px;
  margin-top: 2rem;
  border: none;
  color: #fff;
  border-radius: 0.5rem;
  background: $yellow;
  transition: all 0.3s;
  padding: 1rem;
  cursor: pointer;
}

.buttonContainer__btn:hover {
  background-color: $ltYellow;
}

@media (min-width: 1024px) {}
</style>
