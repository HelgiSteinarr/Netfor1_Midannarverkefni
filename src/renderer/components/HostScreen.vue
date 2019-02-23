<template>
    <main>
        <div id="back" title="Go back">
            <i class="fas fa-angle-double-left" onclick='window.history.back()'></i>
        </div>
        
        <h1>Host game</h1>
        <span>
            <ul>
                <li>
                    <span>Game name</span><br>
                    <input type="text" :textInput="gameName" required placeholder="D*ck drawing contest.." title="Any name">
                </li>
                <li>
                    <span>In-game Name</span><br>
                    <input type="text" :textInput="usrName" required placeholder="Biggus Dickus.." title="Any name you want!">
                </li>
                <li>
                    <span>Time limit &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
                    <input type="number" :textInput="timeLimit" required placeholder="60.." min="5" max="300" title="Time in seconds each player has to draw" content="60">
                </li>
                <li>
                    <span>Player slots &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
                    <input type="number" :textInput="playerAmount" required placeholder="5.." min="2" max="15" title="How many players can play (including you, the host)" content="5">
                </li>
                <li>
                    <span>TODO: ADD MORE SETTINGS</span><br>
                </li>
				<li>
					<span @click="startGame" id="startBtn">Start Game</span>
				</li>
            </ul>
            
        </span>
    </main>
</template>

<script>
export default {
    name: 'host-screen',
    data() {
        return {
            gameName: "",
            usrName: "",
            timeLimit: "",
            playerAmount: ""
        }
    },
    methods: {
        startGame()
        {
            game.start(1);
            this.$router.push("/game");
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
		font-family: Cambria, Cochin, Georgia, Times, 'Times New Roman', serif;
        padding: 5px;
    }
    ul li input{
		height: 20px;
		border-radius: 5px;
    }
	ul li #startBtn{
		border: solid black 1px;
		border-radius: 5px;
		padding: 5px;
		margin: 5px;
		display: inline-block;
		transition: transform ease-out 0.2s, box-shadow ease-out 0.2s;
	}
	ul li #startBtn:hover{
		box-shadow: 2px 2px 4px gray;
		cursor: pointer;
		transform: scale(1.05);
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
