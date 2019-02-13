<template>
    <main>
        <h1>Joing game</h1>
        <span>
            <input type="text" :textInput="gameId">
        </span>
    </main>
</template>

<script>
export default {
    name: 'join-screen',
    data() {
        return {
            gameId: String
        }
    }
}
</script>

<style>

</style>
