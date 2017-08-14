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
    g.sprites.paddle = this;
  }

  update() {
    const g = this.g;
    g.contain(this.sprite, g.stage.localBounds);
    g.key.rightArrow.press = () => {
      this.rightArrowDown = true;
      this.sprite.vx = 5;
      this.sprite.vy = 0;
    };
    g.key.rightArrow.release = () => {
      this.rightArrowDown = false;
      if (!this.leftArrowDown) {
        this.sprite.vx = 0;
        this.sprite.vy = 0;
      }
    };
    g.key.leftArrow.press = () => {
      this.leftArrowDown = true;
      this.sprite.vx = -5;
      this.sprite.vy = 0;
    };
    g.key.leftArrow.release = () => {
      this.leftArrowDown = false;
      if (!this.rightArrowDown) {
        this.sprite.vx = 0;
        this.sprite.vy = 0;
      }
    };
    g.move(this.sprite);
  }
}

export default Paddle;
