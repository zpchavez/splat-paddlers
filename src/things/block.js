import AbstractThing from './abstract-thing';

class Block extends AbstractThing
{
  constructor(g, position) {
    super(g);

    this.sprite = g.rectangle(
      32,
      32,
      '#FFFFFF',
      '#000000',
      2,
      position.x,
      position.y
    );
  }
}

export default Block;
