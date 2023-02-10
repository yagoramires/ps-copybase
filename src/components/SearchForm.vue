<template>
    <form class="form" @submit="submitForm($event)">
        <input type="text" v-model="search" placeholder="Pesquisar Pokemon" class="form__input form__input--text" />
        <input type="submit" value="Pesquisar" class="form__input form__input--submit" />
    </form>
</template>

<script>
import { defineComponent, ref } from 'vue';
import { useRouter } from 'vue-router'


export default defineComponent({
    name: 'PokemonSearch',
    setup() {
        const search = ref('');
        const router = useRouter()
        const submitForm = (e) => {
            e.preventDefault();
            router.push(`/search/${search.value}`)
        }
        return { search, submitForm };
    },
});
</script>

<style lang="scss" scoped>
@use '../assets/main.scss' as *;

.form {
    margin-top: -3rem;
}

.form__input {
    outline: none;
    border: none;
    padding: 1rem;
}

.form__input--text {
    border-top-left-radius: 0.5rem;
    border-bottom-left-radius: 0.5rem;
}

.form__input--submit {
    border-top-right-radius: 0.5rem;
    border-bottom-right-radius: 0.5rem;
    background: $yellow;
    transition: all 0.3s;
    font-weight: bold;
    color: #fff;
    cursor: pointer;
}

.form__input--submit {
    border-top-right-radius: 0.5rem;
    border-bottom-right-radius: 0.5rem;
    background: $ltYellow;
}
</style>
