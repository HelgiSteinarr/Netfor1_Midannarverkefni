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
                    <input type="text" :textInput="gameId" required placeholder="ABC123.." title="ID of the game you wish to join">
                </li>
                <li>
                    <span>In-game Name</span><br>
                    <input type="text" :textInput="usrName" required placeholder="Biggus Dickus.." title="Any name you want!">
                </li>
            </ul>
            
        </span>
    </main>
</template>

<script>
export default {
    name: 'join-screen',
    data() {
        return {
            gameId: String,
            usrName: String
        }
    }
}
</script>

<style scoped>
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
</style>
