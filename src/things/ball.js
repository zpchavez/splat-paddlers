import AbstractThing from './abstract-thing';
import colors from '../colors';

class Ball extends AbstractThing
{
  constructor(g) {
    super(g);

    const ball = g.circle(
      8,
      colors.blue.fill,
      colors.blue.stroke,
      2,
    );

    this.sprite = ball;
  }

  screenWrap() {
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

  update() {
    if (this.paddle && this.paddle.caught) {
      this.sprite.x = (
        this.paddle.sprite.x +
        (this.paddle.sprite.width / 2) -
        (this.sprite.width / 2)
      );
      this.sprite.y = this.paddle.sprite.y - this.sprite.height;
    }

    if (this.screenWrappedLastFrame) {
      this.sprite.visible = true;
      this.screenWrappedLastFrame = false;
    }
    this.screenWrap();

    this.g.move(this.sprite);
  }
}

export default Ball;
