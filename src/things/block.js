import AbstractThing from './abstract-thing';
import Ball from './ball';
import colors from '../colors';

class Block extends AbstractThing
{
  constructor(g, position) {
    super(g, 'block');
    this.color = 'blank';
    this.position = position;
    this.preDrawAllSprites();
  }

  preDrawAllSprites() {
    const playerColors = ['blank', 'blue', 'red'];
    this.sprites = {};
    if (this.g.globals.player === 4 || !this.g.globals.teams) {
      playerColors.push('green', 'yellow')
    }
    playerColors.forEach(color => {
      this.sprites[color] = this.g.rectangle(
        32,
        32,
        colors[color].light,
        colors[color].stroke,
        2,
        this.position.x,
        this.position.y
      );
      if (color !== this.color) {
        this.sprites[color].visible = false;
      } else {
        this.sprite = this.sprites[color];
      }
    });
    this.sprites.blank.alpha = 0.0;
  }

  changeColor(newColor) {
    this.sprites[this.color].visible = false;
    this.sprites[newColor].visible = true;
    this.sprite = this.sprites[newColor];
    this.color = newColor;
  }

  remove() {
    Object.keys(this.sprites).forEach(color => {
      this.g.remove(this.sprites[color]);
    });
  }

  handleCollision(otherThing) {
    if (otherThing instanceof Ball) {
      const ball = otherThing;
      if (this.color === 'blank' && ball.color !== 'blank') {
        this.g.globals.roundScore[ball.color] += 1;
        this.changeColor(ball.color);
      }
      if (this.color !== ball.color) {
        if (this.color !== 'blank') {
          this.g.globals.roundScore[this.color] -= 1;
        }
        if (ball.color !== 'blank') {
          this.g.globals.roundScore[ball.color] += 1;
        }
        this.changeColor(ball.color);
      }
    }
  }
}

export default Block;
