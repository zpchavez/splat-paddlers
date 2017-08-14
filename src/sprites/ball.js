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
      this.sprite.vx = this.paddle.sprite.vx;
      this.sprite.vy = this.paddle.sprite.vy;
    }
    this.g.move(this.sprite);
  }
}

export default Ball;
