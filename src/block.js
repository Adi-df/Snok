import CONFIG from "./config.json";


export default class Block {
  constructor(x, y){
    this.x = x;
    this.y = y;
  }

  collideWith(b2){
    return this.x === b2.x && this.y === b2.y;
  }

  draw(context, color){
    let lastColor = context.fillStyle;
    context.fillStyle = color;
    context.fillRect(this.x*CONFIG.CELL_SIZE.x, this.y*CONFIG.CELL_SIZE.y, CONFIG.CELL_SIZE.x, CONFIG.CELL_SIZE.y);
    context.fillStyle = lastColor;
  }
}