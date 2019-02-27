<template>
	<main>
		<span></span>
		<div>
		<ul id="playerList">
			<li><h3>Playerlist</h3></li>
		</ul>
		</div>
		<canvas ref="canvas" width="900px" height="600px"
				@mousemove="mouseMove" @mouseup="mouseUp"
				@mousedown="mouseDown" @mouseleave="mouseLeave"
				@mouseenter="mouseEnter"></canvas>
		<ul id="colorPicker">
			<li id="clear" @click="clearCanvas()"> Clear canvas</li>
			<li id="clear" @click="colorSelected(8)"> Eraser</li>
			<li v-for="size of sizes" :key="sizes.indexOf(size) + colors.length" @click="sizeSelected(sizes.indexOf(size))" :style="{transform: (curSize == sizes.indexOf(size) ? 'scale(0.9)' : 'scale(1)') }">{{sizes[curSize].name}}</li>
			<li v-for="color of colors" :key="colors.indexOf(color)" @click="colorSelected(colors.indexOf(color))" :style="{background: color.code, transform: (curColor == colors.indexOf(color) ? 'scale(0.9)' : 'scale(1)') }"></li>
		</ul>
	</main>
</template>

<script>
export default {
  name: 'game-screen'
}
</script>

<script>
import Game from '../gamelogic/game';

export default {
mounted() {
	this.context = this.$refs.canvas.getContext("2d");
	document.onmousedown = () => {
		this._mouseDown = true;
	};
	document.onmouseup = () => {
		this._mouseDown = false;	
	};

	if (game.isHost) {
		game.updateCanvas = this.updateCanvas;
	} else {
		game.updateCanvas = this.updateCanvas;
	}
},
data() {
	return {
		paint: false,
		context: null,
		clickX: new Array(),
		clickY: new Array(),
		clickDrag: new Array(),
		clickColor: new Array(),
		_mouseDown: false,
		clickSize: new Array(),
		curSize: 1,
		sizes: [{
			name: "small",
			radius: 2
		},
		{
			name: "normal",
			radius: 5
		},
		{
			name: "large",
			radius: 10
		},
		{
			name: "huge",
			radius: 16
		}],
		curColor: 0,
		colors: [{
			name:"Red",
			code:"#FF0000"
		},
		{
			name:"Orange",
			code:"#FF7F00"
		},
		{
			name:"Yellow",
			code:"#FFFF00"
		},
		{
			name:"Green",
			code:"#00FF00"
		},
		{
			name:"Blue",
			code:"#0000FF"
		},
		{
			name:"Indigo",
			code:"#4B0082"
		},
		{
			name:"Violet",
			code:"#9400D3"
		},
		{
			name:"Black",
			code:"#000000"
		},
		{
			name:"White",
			code:"#FFF"
		}]
	}
},

methods: {
    mouseMove(e) {
		if(this.paint){
			this.addClick(e.pageX - this.$refs.canvas.offsetLeft, e.pageY - this.$refs.canvas.offsetTop, true);
			this.redraw();
		}
    },
    mouseUp(e) {
      	this.paint = false;
    },
    mouseDown(e) {
      	const mouseX = e.pageX - this.$refs.canvas.offsetLeft;
      	const mouseY = e.pageY - this.$refs.canvas.offsetTop;

      	this.paint = true;
      	this.addClick(mouseX, mouseY);
      	this.redraw();
    },
    mouseLeave(e) {
      	this.paint = false;
	},
	mouseEnter(e) {
		if (this._mouseDown) {
			const mouseX = e.pageX - this.$refs.canvas.offsetLeft;
			const mouseY = e.pageY - this.$refs.canvas.offsetTop;

			this.paint = true;
			this.addClick(mouseX, mouseY, false);
		}
	},
    redraw() {
      	this.context.clearRect(0, 0, this.context.canvas.width, this.context.canvas.height); // Clears the canvas
  
      	/*this.context.strokeStyle = "#df4b26";*/
			this.context.lineJoin = "round";
			/*this.context.lineWidth = 5;*/
          
		for(let i=0; i < this.clickX.length; i++) {		
			this.context.beginPath();
			if(this.clickDrag[i] && i){
				this.context.moveTo(this.clickX[i-1], this.clickY[i-1]);
			}else{
				this.context.moveTo(this.clickX[i]-1, this.clickY[i]);
			}
			this.context.lineTo(this.clickX[i], this.clickY[i]);
			this.context.closePath();

			this.context.strokeStyle = this.colors[this.clickColor[i]].code;
			this.context.lineWidth = this.sizes[this.clickSize[i]].radius;
			this.context.stroke();
		}
    },
    addClick(x, y, dragging)
    {
      this.clickX.push(x);
      this.clickY.push(y);
      this.clickDrag.push(dragging);
	  this.clickColor.push(this.curColor);
	  this.clickSize.push(this.curSize);
				game.sendDrawUpdate(this.clickX, this.clickY, this.clickDrag, this.clickColor, this.clickSize);
		},
		colorSelected(color) {
			this.curColor = color;
		},
		sizeSelected(size){
			this.curSize = size;
		},
		clearCanvas()
		{
			this.clickX = new Array();
			this.clickY = new Array();
			this.clickDrag = new Array();
			this.clickColor = new Array();
			this.redraw();
		},
		updateCanvas(clickX, clickY, clickDrag, clickColor, clickSize)
		{
			this.clickX = clickX;
			this.clickY = clickY;
			this.clickDrag = clickDrag;
			this.clickColor = clickColor;
			this.clickSize = clickSize;
			this.redraw();
		}
	}
	

}
</script>


<style scoped>
* {
	
	text-decoration: none;
	list-style: none;
	user-select: none;
}
canvas {
	background-color: white;
	display: block;
	margin: 20px auto;
	margin-bottom:10px;
	border: solid black 2px;
}
ul{
	margin: 5px;
	padding: 0;
	height: 40px;
}
ul#playerList{
	position: absolute;
}
ul#colorPicker li{
	height: 40px;
	width: 40px;
	display: inline-block;
	transition: transform 0.3s ease-out;
}
ul li:hover{
	cursor: pointer;
}
ul#colorPicker li#clear{
	display: block;
	width: 90px;
	height: 20px;
	padding: 10px;
	border: solid black 1px;
	text-align: center;
}


</style>
