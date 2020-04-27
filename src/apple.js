import CONFIG from "./config.json";
import STORE from "./store";
import Block from "./block";


export default class Snake {
	constructor(){
		this.position = new Block(5, 5);

		document.addEventListener("keydown", e => {
			e.preventDefault();
			this.keydown(e.key);
		})
	}

	keydown(key){
		if (key === "ArrowUp" && this.position.y > 0) {
			this.position.y--;
		}else if(key === "ArrowDown" && this.position.y < CONFIG.GRID_SIZE.y-1) {
			this.position.y++;
		}else if (key === "ArrowLeft" && this.position.x > 0) {
			this.position.x--;
		}else if (key === "ArrowRight" && this.position.x < CONFIG.GRID_SIZE.x-1) {
			this.position.x++;
		}
	}

	update(snake){
		snake.queue.forEach(b => {
			if (b.collideWith(this.position)){
				STORE.dispatch({type: "STOP"});
			}
		});
	}

	draw(context){
		this.position.draw(context, "red");
  	}
}
