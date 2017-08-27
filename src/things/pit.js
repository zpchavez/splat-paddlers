import AbstractThing from './abstract-thing';
import Ball, { MODS } from './ball';
import { HUD_HEIGHT } from './hud';

export const PIT_SIZE = 32;

class Pit extends AbstractThing
{
  constructor(g, position) {
    super(g, 'pit');

    let x, y;
    switch (position) {
      case 'TOP LEFT':
        x = 0;
        y = HUD_HEIGHT;
        break;
      case 'TOP RIGHT':
        x = g.stage.width - PIT_SIZE;
        y = HUD_HEIGHT;
        break;
      case 'BOTTOM LEFT':
        x = 0;
        y = g.stage.height - PIT_SIZE;
        break;
      case 'BOTTOM RIGHT':
        x = g.stage.width - PIT_SIZE;
        y = g.stage.height - PIT_SIZE;
        break;
      default:
        g.pause();
        throw new Error(`Invalid pit position: ${position}`);
    }

    this.sprite = g.rectangle(32, 32, '#000000', '#000000', 0, x, y);

    this.position = position;
    this.lostBallTimers = [];
  }

  handleCollision(otherThing) {
    if (otherThing instanceof Ball) {
      this.lostBallTimers.push({
        ball: otherThing,
        frames: 60 * this.g.randomInt(2, 5)
      });
    }
  }

  releaseModifiedBall(ball) {
    ball.mod = MODS[this.g.randomInt(0, MODS.length - 1)];
    const randomPit = this.g.collisionGroups.pit[
      this.g.randomInt(0, this.g.collisionGroups.pit.length - 1)
    ];
    ball.releaseFromPit(randomPit);
  }

  update() {
    super.update();

    this.lostBallTimers.forEach((timer, index) => {
      timer.frames -= 1;
      if (timer.frames === 0) {
        this.releaseModifiedBall(timer.ball);
        delete(this.lostBallTimers[index]);
      }
    });
  }
}

export default Pit;
