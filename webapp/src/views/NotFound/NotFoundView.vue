<template>
    <div class="wrapper">
        <div id="notFound">
            <h1>404</h1>
            <h2>Page not found</h2>
            <p>Maybe a typo?</p>
            <b-button to="/">BACK TO OVERVIEW</b-button>
        </div>
    </div>
</template>

<script>
/**
 * @author Marcel Stepien
 * @version 2022.11.1
 */

export default {
    name: "NotFoundView"
}
</script>

<style scoped>
.wrapper {
    display: flex;
    flex-direction: row;
    justify-content: center;
    gap: 10px;
    height: calc(100vh);
    min-height: 500px;
    background: linear-gradient(0, #202239, #ffffff);
}

#notFound {
    width: 400px;
    height: 400px;
    align-self: center;
    z-index: 0;
    font-family: Roboto, sans-serif;
    background: #0D0C1E;
    border-radius: 10px;
    overflow: hidden;
    box-shadow: 0 5px 15px rgba(0, 0, 0, .3);
    text-align: center;
    color: #CDD4DE;
}

h1 {
    font-weight: 900;
    font-size: 165px;
    line-height: 1;
    margin-bottom: -10px;
    opacity: 0.6;
}

h2 {
    font-weight: 700;
    font-size: 34px;
    margin-bottom: 6px;
    opacity: 0.9;
}

p {
    font-weight: 300;
    font-size: 14px;
    opacity: 0.7;
    margin-bottom: 120px;
}
</style>
