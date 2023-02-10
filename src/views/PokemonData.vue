<template>
  <main v-if="!loading">
    <div class="pokemonCard">
      <img :src="pokemonData.value?.sprites.front_default" alt="pokemon" class="pokemonCard__image" />
      <h1 class="pokemonCard__title">{{ pokemonData.value?.name }}</h1>
    </div>
    <div class="evolutionsCard">
      <h2>Evoluções</h2>
      <div class="evolutionContainer">
        <div v-for="(pokemon, index) in evolutionData" :key="index" class="evolutionContainer__card">
          <router-link :to="'/pokemon/' + pokemon.id">
            <img :src="pokemon.image" alt="pokemon" class="evolutionContainer__image" />
            <h2 class="evolutionContainer__title">{{ pokemon.name }}</h2>
          </router-link>
        </div>
      </div>
    </div>
  </main>
</template>

<script setup>
import { reactive, ref } from 'vue';
import { useRoute, RouterLink } from 'vue-router';
import axios from 'axios';
const route = useRoute();

const baseUrl = 'https://pokeapi.co/api/v2';

const loading = ref(false);
const pokemonData = reactive({});
const evolutionData = ref([]);

const fetchPokemonData = async () => {
  loading.value = true;
  const fetchData = await axios.get(`${baseUrl}/pokemon/${route.params.id}`);
  pokemonData.value = fetchData.data;
  fetchSpecies(pokemonData.value.species.url);
  loading.value = false;
};
const fetchSpecies = async (url) => {
  const fetchData = await axios.get(url);
  fetchEvolutions(fetchData.data.evolution_chain.url);
};

const fetchEvolutions = async (url) => {
  const fetchData = await axios.get(url);

  let evolvesTo
  if (fetchData.data.chain.evolves_to.length > 1) {
    evolvesTo = fetchData.data.chain.evolves_to;
    const getUrl = evolvesTo.map((pokemon) => pokemon.species.url)
    getUrl.forEach(data => fetchEvolutionData(data))
  } else {
    const getUrl = [
      fetchData.data.chain.evolves_to[0].species.url,
      fetchData.data.chain.evolves_to[0].evolves_to[0].species.url,
    ]
    getUrl.forEach(data => fetchEvolutionData(data))
  }
};

const fetchEvolutionData = async (url) => {
  const fetchData = await axios.get(url.replace("pokemon-species", "pokemon"));
  const data = { name: fetchData.data.name, id: fetchData.data.id, image: fetchData.data.sprites.front_default }
  // console.log(data)
  evolutionData.value = [...evolutionData.value, data]
  return data
}

fetchPokemonData();
</script>

<style lang="scss">
@use '../assets/main.scss' as *;

.pokemonCard {
  @include flexCenter;
  flex-direction: column;
  padding: 2rem;
}

.pokemonCard__title {
  color: $yellow;
  text-transform: capitalize;
  font-weight: bold;
}

.pokemonCard__image {
  width: 150px;
}

.evolutionContainer__image {
  width: 100px;
}

.evolutionContainer {
  @include flexCenter;
  gap: 1rem;
}

.evolutionContainer__card {
  @include flexCenter;
  flex-direction: column;
  cursor: pointer;
}

.evolutionContainer__title {
  color: $yellow;
  text-transform: capitalize;
}
</style>
