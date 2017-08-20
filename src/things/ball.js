import AbstractThing from './abstract-thing';
import colors from '../colors';
import Paddle from './paddle';
import { TOP, LEFT, BOTTOM, RIGHT } from './paddle';

const MAX_BALL_SPEED = 10;

class Ball extends AbstractThing
{
  constructor(g, color) {
    super(g);

    this.sprite = g.circle(
      8,
      colors[color].fill,
      colors[color].stroke,
      2,
    );

    this.collidesWith = ['paddles', 'blocks'];

    this.color = color;
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
      this.sprite.x = 0;
    }
    if (this.sprite.y < this.sprite.height * -1) {
      this.sprite.y = this.g.stage.height;
    }
    if (this.sprite.y > this.g.stage.height) {
      this.sprite.y = 0;
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

  handleCollision(otherThing) {
    if (otherThing instanceof Paddle) {
      const ball = this;
      const paddle = otherThing;
      const ballPos = ball.getPreviousPosition();
      const paddlePos = paddle.getPreviousPosition();

      let hitRegion = null;

      if (ballPos.y + ball.sprite.height <= paddlePos.y) {
        hitRegion = 'top';
      } else if (ballPos.x + ball.sprite.width <= paddlePos.x) {
        hitRegion = 'left';
      } else if (ballPos.y >= paddlePos.y + paddle.sprite.height) {
        hitRegion = 'bottom';
      } else if (ballPos.x >= paddlePos.x + paddle.sprite.width) {
        hitRegion = 'right';
      } else {
        return;
      }

      if (hitRegion === 'left' || hitRegion === 'right') {
        // If paddle moving in same direction as ball, add velocities
        if (ball.sprite.vx * paddle.sprite.vx > 0) {
          ball.sprite.vx += paddle.sprite.vx;
        } else {
          ball.sprite.vx = (ball.sprite.vx * -1) + paddle.sprite.vx;
        }
        // Limit max speed
        ball.sprite.vx = Math.min(Math.abs(ball.sprite.vx), MAX_BALL_SPEED) * (ball.sprite.vx < 0 ? -1 : 1);
      } else {
        // If paddle moving in same direction as ball, add velocities
        if (ball.sprite.vy * paddle.sprite.vy > 0) {
          ball.sprite.vy += paddle.sprite.vy;
        } else {
          ball.sprite.vy = (ball.sprite.vy * -1) + paddle.sprite.vy;
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
