import Ball from './ball';
import { getPlayerControls } from '../controls';

const BALL_RELEASE_SPEED = 4;
const PADDLE_MOVE_SPEED = 8;
const ANTI_COLLISION_FRAMES = 10;

class Paddle
{
  constructor(g) {
    const paddle = g.rectangle(
      64,
      16,
      "blue",
      "black",
    );

    this.id = g.getAutoIncrementedId()
    g.stage.putBottom(paddle, 0, -48);

    this.rightArrowDown = false;
    this.leftArrowDown = false;
    this.caught = true;
    this.g = g;
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

  handleInput() {
    this.controls.right.press = () => {
      this.rightArrowDown = true;
      this.sprite.vx = PADDLE_MOVE_SPEED;
      this.sprite.vy = 0;
    };
    this.controls.right.release = () => {
      this.rightArrowDown = false;
      if (!this.leftArrowDown) {
        this.sprite.vx = 0;
        this.sprite.vy = 0;
      }
    };
    this.controls.left.press = () => {
      this.leftArrowDown = true;
      this.sprite.vx = PADDLE_MOVE_SPEED * -1;
      this.sprite.vy = 0;
    };
    this.controls.left.release = () => {
      this.leftArrowDown = false;
      if (!this.rightArrowDown) {
        this.sprite.vx = 0;
        this.sprite.vy = 0;
      }
    };
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
      if (!this.antiCollisionFrames[ball.id]) {
        const collision = g.hitTestCircleRectangle(ball.sprite, this.sprite);
        if (collision) {
          console.log('ball.sprite.x', ball.sprite.x, 'paddle.sprite.x', this.sprite.x);
          console.log('paddle.sprite.width', this.sprite.width);
          if (ball.sprite.x > (this.sprite.x + this.sprite.width) || ball.sprite.x < this.sprite.x) {
            console.log('horizontal collision');
            ball.sprite.vx = (ball.sprite.vx * -1) + this.sprite.x;
          } else {
            console.log('vertical collision');
            ball.sprite.vy *= -1;
          }
          this.antiCollisionFrames[ball.id] = ANTI_COLLISION_FRAMES;
        }
      }
    })

    g.move(this.sprite);
  }
}

export default Paddle;
