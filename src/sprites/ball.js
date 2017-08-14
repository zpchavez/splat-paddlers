class Ball
{
  constructor(g) {
    const paddle = g.sprites.paddle.sprite;
    const ball = g.circle(
      8,
      "blue",
      "black",
      1,
      paddle.x + paddle.width/2 - 4,
      paddle.y - 8
    );

    g.sprites.ball = this;
  }

  update() {

  }
}

export default Ball;
