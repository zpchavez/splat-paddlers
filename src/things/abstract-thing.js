class AbstractThing
{
  constructor(g) {
    this.id = g.getAutoIncrementedId()
    this.g = g;
  }

  getPreviousPosition() {
    return {
      x: this.sprite.x - this.sprite.vx,
      y: this.sprite.y - this.sprite.vy,
    };
  }
}

export default AbstractThing;
