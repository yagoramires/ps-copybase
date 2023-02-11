<template>
  <main v-if="!loading">
    <div class="mainContainer"></div>
    <div class="pokemonCard" v-if="pokemonData.length > 0">
      <h1 class="pokemonCard__title">{{ `${pokemonData.value?.name} #${pokemonData.value?.id}` }}</h1>
      <img :src="pokemonData.value?.image" alt="pokemon" class="pokemonCard__image" />
      <div class="dataContainer">
        <div class="dataInfoContainer">
          <h3 class="dataInfoContainer__title">Habitat:</h3>
          <p class="dataInfoContainer__paragraph">{{ pokemonData.value?.habitat }}</p>
        </div>
        <div class="dataInfoContainer">
          <h3 class="dataInfoContainer__title">Types:</h3>
          <ul class="dataInfoContainer__list">
            <li v-for="(type, index) in pokemonData.value?.types" :key="index" class="dataInfoContainer__listItem">{{
              type
            }}</li>
          </ul>
        </div>
        <div class="dataInfoContainer">
          <h3 class="dataInfoContainer__title">Abilities:</h3>
          <ul class="dataInfoContainer__list">
            <li v-for="(ability, index) in pokemonData.value?.abilities" :key="index"
              class="dataInfoContainer__listItem">
              {{ ability }}</li>
          </ul>
        </div>
      </div>
    </div>

    <div class="pokemonCard" v-if="error">
      <p style="color:white">{{ error }}</p>
    </div>

    <div v-if="evolutionData.length > 0" class="evolutionsCard">
      <h2 class="evolutionCard__title">Evolution Chain</h2>
      <div class="evolutionContainer">
        <div v-for="(pokemon, index) in evolutionData" :key="index" class="evolutionContainer__card">
          <RouterLink :to="'/pokemon/' + pokemon.id">
            <img :src="pokemon.image" alt="pokemon" class="evolutionContainer__image" />
            <h2 class="evolutionContainer__title">{{ pokemon.name }}</h2>
          </RouterLink>
        </div>
      </div>
    </div>
    <div v-if="loading" class="loadingContainer">
      <Loading />
    </div>
  </main>
</template>

<script>
import { defineComponent, ref, reactive, onMounted, onUpdated } from 'vue';
import { useRoute, RouterLink } from 'vue-router';
import Loading from '../components/Loading.vue';
import axios from 'axios';

const baseUrl = 'https://pokeapi.co/api/v2';

export default defineComponent({
  name: 'PokemonList',
  components: { Loading, RouterLink },
  setup() {
    const route = useRoute()
    let oldId = route.params.id
    const loading = ref(false);
    const pokemonData = reactive({});
    const evolutionData = ref([]);
    const error = ref('');

    const fetchPokemonData = async () => {
      loading.value = true;
      error.value = '';

      try {

        const fetchData = await axios.get(`${baseUrl}/pokemon/${route.params.id}`);

        const data = {
          id: fetchData.data.id,
          name: fetchData.data.name,
          abilities: fetchData.data.abilities.map(ability => ability.ability.name),
          image: fetchData.data.sprites.front_default,
          types: fetchData.data.types.map(type => type.type.name),
        };

        fetchSpecies(fetchData.data.species.url, data);
        loading.value = false;
      } catch (e) {
        error.value = 'Nenhum pokémon encontrado!'
        loading.value = false;
      }
    };

    const fetchSpecies = async (url, data) => {
      const fetchData = await axios.get(url);
      const newData = {
        ...data,
        color: fetchData.data.color.name,
        evolvesFrom: fetchData.data.evolves_from_species?.url,
        habitat: fetchData.data.habitat.name,
      };

      pokemonData.value = newData

      fetchEvolutions(fetchData.data.evolution_chain.url, data.id);
    };

    const fetchEvolutions = async (url, id) => {
      const fetchData = await axios.get(url);

      const evolutionChain = [
        fetchData.data?.chain.species.url,
        fetchData.data?.chain.evolves_to[0].species.url,
        fetchData.data?.chain.evolves_to[0].evolves_to[0].species.url
      ];
      evolutionChain.forEach(data => fetchEvolutionData(data, id));
    };

    const fetchEvolutionData = async (url, id) => {
      const fetchData = await axios.get(url.replace("pokemon-species", "pokemon"));
      if (fetchData.data.id === id) return
      const data = { name: fetchData.data.name, id: fetchData.data.id, image: fetchData.data.sprites.front_default };
      evolutionData.value = [...evolutionData.value, data];
      return data;
    };

    onMounted(fetchPokemonData);

    onUpdated(() => {
      if (route.params.id !== oldId) {
        console.log(route.params.id)
        fetchPokemonData()
        evolutionData.value = [];
        oldId = route.params.id
      }
    });

    return { pokemonData, loading, evolutionData, error };
  },
});
</script>

<style lang="scss">
@use '../assets/main.scss' as *;

.mainContainer {
  width: 100%;
  padding: 1rem;
}

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
  justify-content: space-between;
  padding: 2rem;
  gap: 1rem
}

.evolutionContainer__card {
  @include flexCenter;
  flex-direction: column;
  cursor: pointer;
}

.evolutionCard__title {
  width: 100%;
  text-align: center;
  color: $yellow;
  text-transform: capitalize;
}

.evolutionContainer__title {
  color: $ltGray;
  text-transform: capitalize;
}

.dataContainer {
  @include flexCenter;
  flex-direction: column;
  gap: .5rem;
}

.dataInfoContainer {
  color: #000;
  border: 4px solid $yellow;
  background: #fff;
  border-radius: .5rem;
  padding: .5rem 1rem;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
  text-align: start;
}

.dataInfoContainer__title {
  font-weight: bold;
}

.dataInfoContainer__paragraph {
  text-transform: capitalize;
  font-style: italic;
}


.dataInfoContainer__list {
  list-style-type: none;
  padding: 0;
}

.dataInfoContainer__listItem {
  text-transform: capitalize;
  font-style: italic;
}

.loadingContainer {
  width: 100%;
  height: 30vh;
  @include flexCenter;
}
</style>
