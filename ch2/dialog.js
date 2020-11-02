import { Point } from './point.js';

const FLOOR_SPEED = 0.08;
const ROTATE_SPEED = 0.12;
const SPEED_REDUCE = 0.8;
const MAX_ANGLE = 30;
const FPS = 1000 / 60;
const WIDTH = 260;
const HEIGHT = 260;

export class Dialog {
    constructor() {
        this.pos = new Point();
        this.target = new Point();
        this.prevPos = new Point();
        this.downPos = new Point();
        this.speedPos = new Point();
        this.startPos = new Point();
        this.mousePos = new Point();
        this.centerPos = new Point();
        this.origin = new Point();
        this.rotation = 0;
        this.sideValue = 0;
        this.idDown = false;
    }


    resize(stageWidth , stageWidth) {
        this.pos.x = Math.random() * (stageWidth - WIDTH);
        this.pox.y = Math.random() * (stageHeight - HEIGHT);
        this.target = this.pos.clone();
        this.prevPos = this.pox.clone();
    }

    animate(ctx) {
        const move = this.target.clone().subtract(this.pos).reduce(FOLLOW_SPEED)
        this.pos.add(move);


        ctx.beginPath();
        ctx.fillStyle = `#f4e55a`;
        ctx.fillRect(this.pos.x, this.pos.y, WIDTH, HEIGHT);
    }

    down(point) {
        if (point.collide(this.pos, WIDTH, HEIGHT)) {
            this.isDown = true;
            this.startPos = this.pox.clone();
            this.downPos = point.clone();
            this.mousePos = point.clone().subtract(this.pos);
            return this;
        } else {
            return null;
        }
         
    }

    move(point) {
        if(this.isDown) {
            this.target = this.startPos.clone().add(point).subtract(this.downPos);
        }
    }

    up() {
        this.isDown = false;
    }


}
