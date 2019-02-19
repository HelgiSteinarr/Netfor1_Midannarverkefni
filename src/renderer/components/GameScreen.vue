<template>
    <main>
      <span></span>
      <div>
        <ul>
          <li><h3>Playerlist</h3></li>
        </ul>
      </div>
      <canvas ref="canvas" width="900px" height="600px"
              @mousemove="mouseMove" @mouseup="mouseUp"
              @mousedown="mouseDown" @mouseleave="mouseLeave"></canvas>
    </main>
</template>

<script>
export default {
  name: 'game-screen'
}
</script>

<script>
export default {
  mounted() {
    this.context = this.$refs.canvas.getContext("2d");
  },

  data() {
    return {
      paint: false,
      context: null,
      clickX: new Array(),
      clickY: new Array(),
      clickDrag: new Array()
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
      this.redraw()
    },
    mouseLeave(e) {
      this.paint = false;
    },
    redraw() {
      this.context.clearRect(0, 0, this.context.canvas.width, this.context.canvas.height); // Clears the canvas
  
      this.context.strokeStyle = "#df4b26";
      this.context.lineJoin = "round";
      this.context.lineWidth = 5;
          
      for(let i=0; i < this.clickX.length; i++) {		
        this.context.beginPath();
        if(this.clickDrag[i] && i){
          this.context.moveTo(this.clickX[i-1], this.clickY[i-1]);
        }else{
          this.context.moveTo(this.clickX[i]-1, this.clickY[i]);
        }
        this.context.lineTo(this.clickX[i], this.clickY[i]);
        this.context.closePath();
        this.context.stroke();
      }
    },
    addClick(x, y, dragging)
    {
      this.clickX.push(x);
      this.clickY.push(y);
      this.clickDrag.push(dragging);
    }
  }
}
</script>


<style scoped>
* {
	background-color: white;
	text-decoration: none;
	list-style: none;
}

canvas {
	display: block;
	margin: 20px auto;

	border: solid black 2px;
}
ul{
	position: absolute;
	margin: 5px;
	padding: 0;
}

</style>
