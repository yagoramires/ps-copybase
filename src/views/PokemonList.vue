

<template>
  <main>

    <div class="listContainer">
      <h2 class="title">Pokemons</h2>

      <div>
        <ul class="list">
          <li v-for="(pokemon, index) in pokemonList" :key="index">
            <RouterLink :to="{ name: 'pokemon', params: { id: index } }" class="list___item">
              {{ pokemon.name }}
            </RouterLink>
          </li>

        </ul>
      </div>

      <div class="buttonContainer">
        <button @click="loadMorePokemon" class="buttonContainer__btn">{{
          fetchingPokemon? '...': 'Carregar mais'
        }}</button>
      </div>
    </div>
  </main>
</template>

<script>
import { defineComponent } from 'vue'
import axios from 'axios'

const baseUrl = 'https://pokeapi.co/api/v2'

export default defineComponent({
  name: 'PokemonList',
  data() {
    return {
      pokemonList: [],
      nextPage: null,
      fetchingPokemon: false,
    }
  },
  methods: {
    async fetchPokemons() {
      const pokemonsResponse = await axios.get(`${baseUrl}/pokemon`)
      this.pokemonList = pokemonsResponse.data.results
      this.nextPage = pokemonsResponse.data.next
    },
    async loadMorePokemon() {
      this.fetchingPokemon = true
      const pokemonsResponse = await axios.get(this.nextPage)
      this.pokemonList.push(...(pokemonsResponse.data.results || []))
      this.nextPage = pokemonsResponse.data.next
      this.fetchingPokemon = false
    }
  },
  async mounted() {
    await this.fetchPokemons()
  }
})
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
}

.buttonContainer__btn {
  font-size: 18px;
  margin-top: 2rem;
  border: none;
  color: #fff;
  border-radius: .5rem;
  background: $yellow;
  transition: all .3s;
  padding: 1rem;
  cursor: pointer;
}

.buttonContainer__btn:hover {
  background-color: $ltYellow;
}

@media (min-width: 1024px) {}
</style>
