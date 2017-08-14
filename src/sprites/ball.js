class Ball
{
  constructor(g) {
    const paddle = g.sprites.paddle;
    const ball = g.circle(
      8,
      "blue",
      "black",
      1,
      paddle.sprite.x + paddle.sprite.width/2 - 4,
      paddle.sprite.y - 8
    );

    g.sprites.ball = this;
    this.g = g;
    this.caught = true;
    this.paddle = g.sprites.paddle;
    this.sprite = ball;
  }

  update() {
    if (this.caught) {
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
