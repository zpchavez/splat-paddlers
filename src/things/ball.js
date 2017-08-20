import AbstractThing from './abstract-thing';
import Block from './block';
import colors from '../colors';
import Paddle from './paddle';
import { TOP, LEFT, BOTTOM, RIGHT } from './paddle';

const MAX_BALL_SPEED = 10;

class Ball extends AbstractThing
{
  constructor(g, color) {
    super(g);

    this.color = color;
    this.createSprite();
    this.collidesWith = ['paddles', 'blocks'];
  }

  createSprite() {
    this.sprite = this.g.circle(
      8,
      colors[this.color].fill,
      colors[this.color].stroke,
      2,
    );
  }

  screenWrap() {
    if (this.screenWrappedLastFrame) {
      this.sprite.visible = true;
      this.screenWrappedLastFrame = false;
    }

    let before = [this.sprite.x, this.sprite.y];
    if (this.sprite.x < this.sprite.width * -1) {
      this.sprite.x = this.g.stage.width;
    }
    if (this.sprite.x > this.g.stage.width) {
      this.sprite.x = this.sprite.width * -1;
    }
    if (this.sprite.y < this.sprite.height * -1) {
      this.sprite.y = this.g.stage.height;
    }
    if (this.sprite.y > this.g.stage.height) {
      this.sprite.y = this.sprite.height * -1;
    }

    // When changing a sprite's position, ga shows it moving across
    // the intervening space really fast, instead of just changing
    // its position instantanously, resulting in the sprite noticeably flickering
    // at some point on the screen. To get around this, make the sprite invisible
    // for one frame.
    if (before[0] !== this.sprite.x || before[1] !== this.sprite.y) {
      this.sprite.visible = false;
      this.screenWrappedLastFrame = true;
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

  handleCollision(otherThing) {
    if (
      otherThing instanceof Paddle ||
      (
        otherThing instanceof Block &&
        otherThing.color !== 'blank' &&
        otherThing.color !== this.color
      )
    ) {
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
        // Limit max speed
        ball.sprite.vx = Math.min(Math.abs(ball.sprite.vx), MAX_BALL_SPEED) * (ball.sprite.vx < 0 ? -1 : 1);
      } else {
        // If otherThing moving in same direction as ball, add velocities
        if (ball.sprite.vy * otherThing.sprite.vy > 0) {
          ball.sprite.vy += otherThing.sprite.vy;
        } else {
          ball.sprite.vy = (ball.sprite.vy * -1) + otherThing.sprite.vy;
        }
        // Limit max speed
        ball.sprite.vy = Math.min(Math.abs(ball.sprite.vy), MAX_BALL_SPEED) * (ball.sprite.vy < 0 ? -1 : 1);
      }
    }
  }

  update() {
    super.update();
    this.screenWrap();
    this.g.move(this.sprite);
  }
}

export default Ball;
