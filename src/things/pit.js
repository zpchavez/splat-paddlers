import AbstractThing from './abstract-thing';
import Ball from './ball';

class Pit extends AbstractThing
{
  constructor(g, x, y) {
    super(g, 'pit');

    this.sprite = g.rectangle(32, 32, '#000000', '#000000', 0, x, y);
    this.lostBalls = [];
  }

  handleCollision(otherThing) {
    if (otherThing instanceof Ball) {
      this.lostBalls.push(otherThing);
    }
  }
}

export default Pit;
