import { getPlayerControls } from '../controls';

class Paddle
{
  constructor(g) {
    const paddle = g.rectangle(
      64,
      16,
      "blue",
      "black",
    );

    g.stage.putBottom(paddle, 0, -48);

    this.rightArrowDown = false;
    this.leftArrowDown = false;
    this.g = g;
    this.sprite = paddle;
    this.controls = getPlayerControls(g, 1);
    g.sprites.paddle = this;
  }

  handleInput() {
    this.controls.right.press = () => {
      this.rightArrowDown = true;
      this.sprite.vx = 5;
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
      this.sprite.vx = -5;
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
      console.log('action pressed');
    }
    this.controls.action.release = () => {
      console.log('action released');
    }
  }

  update() {
    const g = this.g;
    g.contain(this.sprite, g.stage.localBounds);
    this.handleInput();
    g.move(this.sprite);
  }
}

export default Paddle;
