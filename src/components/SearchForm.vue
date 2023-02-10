<template>
    <form class="form">
        <input type="text" v-model="input" placeholder="Pesquisar Pokemon" class="form__input form__input--text" />
        <input type="submit" value="Pesquisar" class="form__input form__input--submit">
    </form>
</template>

<script>
export default {

}
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
    border-top-left-radius: .5rem;
    border-bottom-left-radius: .5rem;
}

.form__input--submit {
    border-top-right-radius: .5rem;
    border-bottom-right-radius: .5rem;
    background: $yellow;
    transition: all .3s;
    font-weight: bold;
    color: #fff;
    cursor: pointer;
}

.form__input--submit {
    border-top-right-radius: .5rem;
    border-bottom-right-radius: .5rem;
    background: $ltYellow;
}
</style>