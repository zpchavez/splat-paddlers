import AbstractThing from './abstract-thing';
import Ball from './ball';
import colors from '../colors';

class Block extends AbstractThing
{
  constructor(g, position) {
    super(g);
    this.color = 'blank';
    this.position = position;
    this.createSprite();
  }

  createSprite() {
    this.sprite = this.g.rectangle(
      32,
      32,
      colors[this.color].fill,
      colors[this.color].stroke,
      2,
      this.position.x,
      this.position.y
    );
    this.sprite.alpha = 0.5;
  }

  handleCollision(otherThing) {
    if (otherThing instanceof Ball) {
      const ball = otherThing;
      if (this.color === 'blank') {
        this.g.remove(this.sprite);
        this.color = ball.color;
        this.createSprite();
      }
    }
  }
}

export default Block;
