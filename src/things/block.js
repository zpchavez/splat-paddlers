import AbstractThing from './abstract-thing';
import Ball from './ball';
import colors from '../colors';

class Block extends AbstractThing
{
  constructor(g, fillColor, position) {
    super(g);
    this.color = 'blank';
    this.fillColor = fillColor;
    this.position = position;
    this.createSprite();
  }

  createSprite() {
    this.sprite = this.g.rectangle(
      30,
      30,
      `#${this.fillColor}`,
      colors[this.color].fill,
      2,
      this.position.x,
      this.position.y
    );
    if (this.color === 'blank') {
      this.sprite.alpha = 0;
    } else {
      this.sprite.alpha = 0.5;
    }
  }

  handleCollision(otherThing) {
    if (otherThing instanceof Ball) {
      const ball = otherThing;
      if (this.color === 'blank') {
        this.g.remove(this.sprite);
        this.color = ball.color;
        this.createSprite();
      }
      if (this.color !== ball.color) {
        this.g.remove(this.sprite);
        this.color = ball.color;
        this.createSprite();
      }
    }
  }
}

export default Block;
