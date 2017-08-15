class Ball
{
  constructor(g) {
    const ball = g.circle(
      8,
      "blue",
      "black",
      1,
    );

    g.sprites.ball = this;
    this.g = g;
    this.sprite = ball;
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
    this.g.move(this.sprite);
  }
}

export default Ball;
