<template>
  <div id="wrapper">
    <header>
		<span class="flex_item">
			
		</span>
		<span class="flex_item flex_item_mid">
			<h1>Pictionary!</h1>
		</span>
		<span class="flex_item">
			<h2>Fisedush Ent.</h2>
		</span>
    </header>
    <main>
		<ul>
			<li>
				<router-link to="/host">Host game</router-link>
			</li>
			<li>
				<router-link to="/join">Join game</router-link>
			</li>
			<li>
				<router-link to="/exit" id="e">Exit</router-link>
			</li>
		</ul>
   	</main>
	<footer>
			
	</footer>

  </div>
</template>

<script>
  import SystemInformation from './LandingPage/SystemInformation'

  export default {
    name: 'start-screen',
    components: { SystemInformation },
    methods: {
      open (link) {
        this.$electron.shell.openExternal(link)
      }
    }
  }
</script>

<style>
@import url('https://fonts.googleapis.com/css?family=Source+Sans+Pro');
@import url('https://fonts.googleapis.com/css?family=Alice|Fredericka+the+Great|Righteous|ZCOOL+KuaiLe');
/*
	font-family: 'ZCOOL KuaiLe', cursive;               -Pictionary font
	font-family: 'Fredericka the Great', cursive;       -Pictionary font   
	font-family: 'Righteous', cursive;                  -FD Font
	font-family: 'Alice', serif;                        -FD Font
*/

* {
	box-sizing: border-box;
	margin: 0;
	padding: 0;
	text-decoration: none;
	list-style: none;
}
body { 
	font-family: 'Source Sans Pro', sans-serif; 
}

#wrapper {
	background:
	radial-gradient(
		ellipse at top left,
		rgba(255, 255, 255, 1) 40%,
		rgba(229, 229, 229, .9) 100%
	);
	height: 100vh;
	padding: 60px 80px;
	width: 100vw;
}
header{
	display: flex;
	justify-content: center;
	width: 100%;
}
header span.flex_item{
	font-family: 'Alice', serif;
	width: 25%;
	font-size: 18px;
	text-align: center;
}
header span.flex_item_mid{
	width: 50%;
	font-family: 'ZCOOL KuaiLe', cursive;
	font-size: 30px;
}
main {
	display: flex;
	justify-content: space-between;
}
main > div { flex-basis: 50%; }

main ul{
	margin: 0 auto;
	text-align: center;
	width: 200px;
	text-decoration: none;
	margin-top: 20px;
}
main ul li a{
	color: black;
	display: block;
	padding: 7px;
	font-size: 20px;
	transition: color 0.2s ease-out, transform 0.2s ease-out;
}
main ul li a:hover{
	color: darkorchid;
	transform: scale(1.3);
}
main ul li a#e:hover{
	cursor: not-allowed;
	transform: scale(0.01);
}
</style>
