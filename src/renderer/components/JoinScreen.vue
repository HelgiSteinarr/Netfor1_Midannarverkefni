<template>
    <main>
        <div id="back" title="Go back">
            <i class="fas fa-angle-double-left" onclick='window.history.back()'></i>
        </div>
        
        <h1>Join game</h1>
        <span>
            <ul>
                <li>
                    <span>Game ID</span><br>
                    <input type="text" v-model="gameId" required placeholder="ABC123.." title="ID of the game you wish to join">
                </li>
                <li>
                    <span>In-game Name</span><br>
                    <input type="text" v-model="usrName" required placeholder="Biggus Dickus.." title="Any name you want!">
                </li>
            </ul>
            <a id="startButton" @click="startGame">Start</a>
        </span>
    </main>
</template>

<script>
export default {
    name: 'join-screen',
    data() {
        return {
            gameId: "",
            usrName: ""
        }
    },
    methods: {
        startGame()
        {
            game.start(0, this.gameId);
            this.$router.push("/game");
        }
    }
}
</script>

<style lang="scss" scoped>
    ul{
        list-style: none;
        text-align: center;
        padding: 0;
    }
    ul li{
        padding: 5px;
    }
    h1{
        display: block;
        text-align: center;
        margin: 5px;
        font-family: 'Source Sans Pro', sans-serif; 
    }
    #back{
        width: 35px;
        font-size: 35px;
        padding: 7px;
        position: absolute;
    }
    #back:hover{
        color: purple;
        cursor: pointer;
    }
    #startButton {
        display: block;
        width: 100px;
        text-align: center;
        margin: 0 auto;
        &:hover {
            cursor: default;
            color: green;
        }
    }
</style>
