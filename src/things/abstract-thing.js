export const ANTI_COLLISION_FRAMES = 2;

class AbstractThing
{
  constructor(g, name) {
    if (!g.getAutoIncrementedId) {
      let thingIdIncrementor = 0;
      g.getAutoIncrementedId = () => {
        return thingIdIncrementor += 1;
      }
    }

    if (!g.collisionGroups) {
      g.collisionGroups = {};
    }
    if (!g.collisionGroups[name]) {
      g.collisionGroups[name] = [];
    }

    this.id = g.getAutoIncrementedId()
    g.collisionGroups[name].push(this);
    this.name = name;
    this.collidesWith = [];
    this.antiCollisionFrames = [];
    this.g = g;

    if (!g.things) {
      g.things = [];
    }
    g.things.push(this);
  }

  getPreviousPosition() {
    return {
      x: this.sprite.x - this.sprite.vx,
      y: this.sprite.y - this.sprite.vy,
    };
  }

  handleCollisions() {
    const g = this.g;

    this.collidesWith.forEach(collisionGroup => {
      g.collisionGroups[collisionGroup].forEach(otherThing => {
        if (
          this.sprite &&
          this.sprite.visible &&
          otherThing.sprite &&
          otherThing.sprite.visible &&
          this.sprite !== otherThing.sprite &&
          g.hitTestRectangle(this.sprite, otherThing.sprite) &&
          !this.antiCollisionFrames[otherThing.id] &&
          !otherThing.antiCollisionFrames[this.id]
        ) {
          this.antiCollisionFrames[otherThing.id] = ANTI_COLLISION_FRAMES;
          otherThing.antiCollisionFrames[this.id] = ANTI_COLLISION_FRAMES;
          this.handleCollision(otherThing);
          otherThing.handleCollision(this);
        }
      });
    });
  }

  handleCollision(otherThing) {
    // Override
  }

  remove() {
    if (this.sprite) {
      this.g.remove(this.sprite);
    }
  }

  updateAntiCollisionFrames() {
    Object.keys(this.antiCollisionFrames).forEach(thingId => {
      this.antiCollisionFrames[thingId] -= 1;
      if (this.antiCollisionFrames[thingId] === 0) {
        delete this.antiCollisionFrames[thingId]
      }
    });
  }

  update() {
    this.updateAntiCollisionFrames();

    if (this.sprite) {
      this.handleCollisions()
    }
  }
}

export default AbstractThing;
