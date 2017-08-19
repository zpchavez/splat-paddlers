import AbstractThing from './abstract-thing';
import Ball from './ball';
import { getPlayerControls } from '../controls';
import colors from '../colors';

const BALL_RELEASE_SPEED = 4;
const PADDLE_MOVE_SPEED = 8;
const ANTI_COLLISION_FRAMES = 10;
const MAX_BALL_SPEED = 10;

class Paddle extends AbstractThing
{
  constructor(g) {
    super(g);

    const paddle = g.rectangle(
      64,
      16,
      colors.blue.fill,
      colors.blue.stroke,
      2
    );

    g.stage.putBottom(paddle, 0, -48);

    this.rightArrowDown = false;
    this.leftArrowDown = false;
    this.upArrowDown = false;
    this.downArrowDown = false;
    this.caught = true;
    this.sprite = paddle;
    this.antiCollisionFrames = {};
    this.controls = getPlayerControls(g, 1);
  }

  attachStarterBall(ball) {
    ball.sprite.x = this.sprite.x + this.sprite.width/2 - 4,
    ball.sprite.y = this.sprite.y - 8
    this.starterBall = ball;
    ball.paddle = this;
  }

  handleVerticalControls() {
    this.controls.up.press = () => {
      this.upArrowDown = true;
      this.sprite.vy = PADDLE_MOVE_SPEED * -1;
    };
    this.controls.up.release = () => {
      this.upArrowDown = false;
      if (!this.downArrowDown) {
        this.sprite.vy = 0;
      }
    };
    this.controls.down.press = () => {
      this.downArrowDown = true;
      this.sprite.vy = PADDLE_MOVE_SPEED;
    };
    this.controls.down.release = () => {
      this.downArrowDown = false;
      if (!this.upArrowDown) {
        this.sprite.vy = 0;
      }
    };
  }

  handleHorizontalControls() {
    this.controls.right.press = () => {
      this.rightArrowDown = true;
      this.sprite.vx = PADDLE_MOVE_SPEED;
    };
    this.controls.right.release = () => {
      this.rightArrowDown = false;
      if (!this.leftArrowDown) {
        this.sprite.vx = 0;
      }
    };
    this.controls.left.press = () => {
      this.leftArrowDown = true;
      this.sprite.vx = PADDLE_MOVE_SPEED * -1;
    };
    this.controls.left.release = () => {
      this.leftArrowDown = false;
      if (!this.rightArrowDown) {
        this.sprite.vx = 0;
      }
    };
  }

  handleInput() {
    this.handleHorizontalControls();
    // this.handleVerticalControls();

    this.controls.action.press = () => {
      if (this.caught) {
        this.releaseBall();
      }
    }
  }

  releaseBall() {
    this.caught = false;
    if (this.starterBall) {
      this.starterBall.sprite.vy = BALL_RELEASE_SPEED * -1;
      this.starterBall.sprite.vx = this.sprite.vx;
    }
  }

  update() {
    const g = this.g;
    g.contain(this.sprite, g.stage.localBounds);
    this.handleInput();

    Object.keys(this.antiCollisionFrames).forEach(actorId => {
      this.antiCollisionFrames[actorId] -= 1;
      if (this.antiCollisionFrames[actorId] === 0) {
        delete this.antiCollisionFrames[actorId]
      }
    });

    g.collisionGroups.balls.forEach(ball => {
      if (!this.caught && !this.antiCollisionFrames[ball.id]) {
        const collision = g.hitTestRectangle(ball.sprite, this.sprite);
        if (collision) {

          const ballPos = ball.getPreviousPosition();
          const paddlePos = this.getPreviousPosition();

          let hitRegion = null;

          if (ballPos.y + ball.sprite.height <= paddlePos.y) {
            hitRegion = 'top';
          } else if (ballPos.x + ball.sprite.width <= paddlePos.x) {
            hitRegion = 'left';
          } else if (ballPos.y >= paddlePos.y + this.sprite.height) {
            hitRegion = 'bottom';
          } else if (ballPos.x >= paddlePos.x + this.sprite.width) {
            hitRegion = 'right';
          } else {
            return;
          }

          // if (ball.sprite.y > this.sprite.y && ball.sprite.y < (this.sprite.y + this.sprite.height)) {
          if (hitRegion === 'left' || hitRegion === 'right') {
            // If paddle moving in same direction as ball, add velocities
            if (ball.sprite.vx * this.sprite.vx > 0) {
              ball.sprite.vx += this.sprite.vx;
            } else {
              ball.sprite.vx = (ball.sprite.vx * -1) + this.sprite.vx;
            }
            // Limit max speed
            ball.sprite.vx = Math.min(Math.abs(ball.sprite.vx), MAX_BALL_SPEED) * (ball.sprite.vx < 0 ? -1 : 1);
          } else {
            // If paddle moving in same direction as ball, add velocities
            if (ball.sprite.vy * this.sprite.vy > 0) {
              ball.sprite.vy += this.sprite.vy;
            } else {
              ball.sprite.vy = (ball.sprite.vy * -1) + this.sprite.vy;
            }
            // Limit max speed
            ball.sprite.vy = Math.min(Math.abs(ball.sprite.vy), MAX_BALL_SPEED) * (ball.sprite.vy < 0 ? -1 : 1);
          }
          this.antiCollisionFrames[ball.id] = ANTI_COLLISION_FRAMES;
        }
      }
    });

    g.move(this.sprite);
  }
}

export default Paddle;
