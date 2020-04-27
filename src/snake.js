import PF from "pathfinding";

import CONFIG from "./config.json";
import STORE from "./store";
import Block from "./block";


export default class Snake {
	constructor(){
		this.queue = [new Block(1, 0), new Block(0, 0)];
		this.finder = new PF.BestFirstFinder({
			allowDiagonal: false
		});
        this.growValue = 0;
        this.speed = CONFIG.BASE_SNAKE_SPEED;
	}

	generateGrid(){
		let grid = new PF.Grid(CONFIG.GRID_SIZE.x, CONFIG.GRID_SIZE.y);

		this.queue.forEach(b => {
			grid.setWalkableAt(b.x, b.y, false);
		});

		return grid;
	}

	update(apple){
		this.growValue++;

		if (this.growValue % (CONFIG.FRAME_RATE / ( 1000 / this.speed )) === 0) {
			let head = this.queue[0];
			let newHead = this.finder.findPath(head.x, head.y, apple.position.x, apple.position.y, this.generateGrid())[1];
			this.queue.unshift(new Block(newHead[0], newHead[1]));
		}

		if (this.growValue % ( CONFIG.FRAME_RATE / ( 1000 / this.speed ) ) === 0 && this.growValue % ( CONFIG.FRAME_RATE / ( 1000 / CONFIG.GROWING_RATE ) ) !== 0){
			this.queue.pop();
		}

		if (this.growValue % ( CONFIG.FRAME_RATE / ( 1000 / CONFIG.SPEED_INCREMENT_RATE ) ) === 0) {
            this.speed++;
            STORE.dispatch({type: "INCREMENT_SCORE"});
		}
	}

    draw(context){
      this.queue.forEach(block => {
        block.draw(context, "green");
      });
      this.queue[0].draw(context, "yellow");
    }

    destroy(){}
}
