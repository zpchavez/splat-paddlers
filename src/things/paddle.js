import AbstractThing from './abstract-thing';
import Ball from './ball';
import { getPlayerControls } from '../controls';
import colors from '../colors';

const BALL_RELEASE_SPEED = 4;
const PADDLE_MOVE_SPEED = 8;

class Paddle extends AbstractThing
{
  constructor(g) {
    super(g);

    this.sprite = g.rectangle(
      64,
      16,
      colors.blue.fill,
      colors.blue.stroke,
      2
    );

    g.stage.putBottom(this.sprite, 0, -48);

    this.rightArrowDown = false;
    this.leftArrowDown = false;
    this.upArrowDown = false;
    this.downArrowDown = false;
    this.caught = true;
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
    super.update();
    const g = this.g;
    g.contain(this.sprite, g.stage.localBounds);
    this.handleInput();

    g.move(this.sprite);
  }
}

export default Paddle;
