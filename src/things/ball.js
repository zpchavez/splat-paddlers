import AbstractThing from './abstract-thing';
import Block from './block';
import colors from '../colors';
import Paddle from './paddle';
import { TOP, LEFT, BOTTOM, RIGHT } from './paddle';

const TOP_BOUNDS = 32;
const MAX_BALL_SPEED = 5;
const EDGE_BOUNCES_BEFORE_TURNING_BLANK = 2;

class Ball extends AbstractThing
{
  constructor(g, color) {
    super(g, 'ball');

    this.color = color;
    this.createSprite();
    this.edgeBounces = 0;
    this.collidesWith = ['paddle', 'block'];
  }

  createSprite() {
    this.sprite = this.g.circle(
      8,
      colors[this.color].fill,
      colors[this.color].stroke,
      3,
    );
  }

  bounceOffBounds() {
    let bounced = false;
    if (this.sprite.x <= 0 || this.sprite.x >= this.g.stage.width - this.sprite.width) {
      console.log('side bounce');
      this.sprite.vx *= -1; // left or right side bounce
      bounced = true;
    } else if (this.sprite.y <= TOP_BOUNDS || this.sprite.y >= this.g.stage.height - this.sprite.height) {
      console.log('top/bottom bounce');
      this.sprite.vy *= -1; // top or bottom side bounce
      bounced = true;
    }
    if (bounced) {
      this.edgeBounces += 1;
    }
    if (this.edgeBounces >= EDGE_BOUNCES_BEFORE_TURNING_BLANK) {
      this.changeBallColor('blank');
      this.edgeBounces = 0;
    }
  }

  changeBallColor(newColor) {
    const oldSprite = this.sprite;
    this.g.remove(this.sprite);
    this.color = newColor;
    this.createSprite();
    this.sprite.x = oldSprite.x;
    this.sprite.y = oldSprite.y;
    this.sprite.vx = oldSprite.vx;
    this.sprite.vy = oldSprite.vy;
  }

  bounceOff(otherThing) {
    this.edgeBounces = 0; // reset edge bounces
    const ball = this;
    const ballPos = ball.getPreviousPosition();
    const otherThingPos = otherThing.getPreviousPosition();

    if (otherThing instanceof Paddle && otherThing.color !== this.color) {
      this.changeBallColor(otherThing.color);
    }

    let hitRegion = null;

    if (ballPos.y + ball.sprite.height <= otherThingPos.y) {
      hitRegion = 'top';
    } else if (ballPos.x + ball.sprite.width <= otherThingPos.x) {
      hitRegion = 'left';
    } else if (ballPos.y >= otherThingPos.y + otherThing.sprite.height) {
      hitRegion = 'bottom';
    } else if (ballPos.x >= otherThingPos.x + otherThing.sprite.width) {
      hitRegion = 'right';
    } else {
      return;
    }

    if (hitRegion === 'left' || hitRegion === 'right') {
      // If otherThing moving in same direction as ball, add velocities
      if (ball.sprite.vx * otherThing.sprite.vx > 0) {
        ball.sprite.vx += otherThing.sprite.vx;
      } else {
        ball.sprite.vx = (ball.sprite.vx * -1) + otherThing.sprite.vx;
      }
      ball.sprite.vy += otherThing.sprite.vy;
      // Limit max speed
      ball.sprite.vx = Math.min(Math.abs(ball.sprite.vx), MAX_BALL_SPEED) * (ball.sprite.vx < 0 ? -1 : 1);
      ball.sprite.vy = Math.min(Math.abs(ball.sprite.vy), MAX_BALL_SPEED) * (ball.sprite.vy < 0 ? -1 : 1);
    } else {
      // If otherThing moving in same direction as ball, add velocities
      if (ball.sprite.vy * otherThing.sprite.vy > 0) {
        ball.sprite.vy += otherThing.sprite.vy;
      } else {
        ball.sprite.vy = (ball.sprite.vy * -1) + otherThing.sprite.vy;
      }
      ball.sprite.vx += otherThing.sprite.vx;
      // Limit max speed
      ball.sprite.vy = Math.min(Math.abs(ball.sprite.vy), MAX_BALL_SPEED) * (ball.sprite.vy < 0 ? -1 : 1);
      ball.sprite.vx = Math.min(Math.abs(ball.sprite.vx), MAX_BALL_SPEED) * (ball.sprite.vx < 0 ? -1 : 1);
    }
  }

  handleCollision(otherThing) {
    if (
      otherThing instanceof Paddle ||
      (
        otherThing instanceof Block &&
        otherThing.color !== 'blank' &&
        otherThing.color !== this.color
      )
    ) {
      this.bounceOff(otherThing);
    }
  }

  update() {
    super.update();
    this.bounceOffBounds();
    this.g.move(this.sprite);
  }
}

export default Ball;
