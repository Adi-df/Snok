import CONFIG from "./config.json";
import STORE from "./store";
import Block from "./block";
import Snake from "./snake";
import Apple from "./apple";

const canvas = document.querySelector("canvas#game");
const context = canvas.getContext("2d");

let SNAKE;
let APPLE;

async function start(){
  	//Start
  	SNAKE = new Snake();
  	APPLE = new Apple();

  	canvas.setAttribute("width", `${CONFIG.GRID_SIZE.x*CONFIG.CELL_SIZE.x}px`);
  	canvas.setAttribute("height", `${CONFIG.GRID_SIZE.y*CONFIG.CELL_SIZE.y}px`);
}
function loop(){
  	//Loop
	context.fillStyle = "black";
	context.fillRect(0, 0, CONFIG.GRID_SIZE.x*CONFIG.CELL_SIZE.x,CONFIG.GRID_SIZE.y*CONFIG.CELL_SIZE.y);

	SNAKE.update(APPLE);
	APPLE.update(SNAKE);

	SNAKE.draw(context);
	APPLE.draw(context);

	if (STORE.getState().running){
		setTimeout(() => loop(), 1000/CONFIG.FRAME_RATE);
	}else {
		alert(`Loose... you have : ${STORE.getState().score}`);
	}
}

(async function main(){
	await start();
	STORE.dispatch({type: "START"});
	loop();
})();

export default {
	CONFIG,
	STORE,
	SNAKE,
	APPLE,
	Block
}
