<template>
    <div className='loading'>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
    </div>
</template>

<script>
export default {
    name: 'Loading'
}
</script>

<style lang="scss" scoped>
.loading div {
    box-sizing: border-box;
    display: block;
    position: absolute;
    margin: 8px;
    border: 4px solid #fff;
    border-radius: 50%;
    animation: loading 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
    border-color: rgb(255, 210, 60) transparent transparent transparent;
}

.loading div:nth-child(1) {
    animation-delay: -0.45s;
    width: 60px;
    height: 60px;
}

.loading div:nth-child(2) {
    animation-delay: -0.3s;
    width: 60px;
    height: 60px;
}

.loading div:nth-child(3) {
    animation-delay: -0.15s;
    width: 60px;
    height: 60px;
}

.loading div:nth-child(4) {
    width: 60px;
    height: 60px;
}

@keyframes loading {
    0% {
        transform: rotate(0deg);
    }

    100% {
        transform: rotate(360deg);
    }
}
</style>