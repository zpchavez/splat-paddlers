import AbstractThing from './abstract-thing';
import Ball from './ball';
import colors from '../colors';
import { getPlayerControls } from '../controls';
import { HUD_HEIGHT } from './hud';
import { PIT_SIZE } from './pit';

const BALL_RELEASE_SPEED = 4;
const PADDLE_MOVE_SPEED = 8;
const MIN_PADDLE_LENGTH = 16;
const MAX_PADDLE_LENGTH = 256;
export const LEFT = 'left';
export const RIGHT = 'right';
export const TOP = 'top';
export const BOTTOM = 'bottom';

export const PADDLE_LENGTH = 64;

class Paddle extends AbstractThing
{
  constructor(g, options={}) {
    super(g, 'paddle');

    options.length || (options.length = PADDLE_LENGTH);

    this.length = options.length;
    this.position = options.position;
    this.color = options.color;
    this.player = options.player;

    this.createSprite();

    switch (options.position) {
      case TOP:
        g.stage.putTop(this.sprite, 16, 48);
        break;
      case RIGHT:
        g.stage.putRight(this.sprite, this.sprite.width * -1, -32);
        break;
      case BOTTOM:
        g.stage.putBottom(this.sprite, -16, this.sprite.height * -1);
        break;
      case LEFT:
        g.stage.putLeft(this.sprite, this.sprite.width, 32);
        break;
      default:
        this.g.pause();
        throw new Error('invalid position');
    }

    this.antiCollisionFrames = {};
    this.initInput();
    this.controls = getPlayerControls(g, this.player);
  }

  attachBall(ball) {
    this.caughtBall = ball;
    this.handleCaughtBall();
  }

  createSprite() {
    this.sprite = this.g.rectangle(
      [TOP, BOTTOM].indexOf(this.position) > -1 ? this.length : 16,
      [TOP, BOTTOM].indexOf(this.position) > -1 ? 16 : this.length,
      colors[this.color].fill,
      colors[this.color].stroke,
      2
    );
  }

  recreateSprite() {
    const oldSprite = this.sprite;
    this.remove();
    this.createSprite();
    this.sprite.x = oldSprite.x;
    this.sprite.y = oldSprite.y;
    this.sprite.vx = oldSprite.vx;
    this.sprite.vy = oldSprite.vy;
  }

  getMirroringBall() {
    return this.g.collisionGroups.ball.find(ball => ball.mirroring === this.position && ball.sprite);
  }

  applyToMirroredBall(direction) {
    const mirroredBall = this.getMirroringBall();
    if (mirroredBall) {
      mirroredBall.setMirrorDirection(direction);
    }
  };

  initVerticalControls() {
    this.controls.up.press = () => {
      this.upArrowDown = true;
      this.applyToMirroredBall(-1);
      this.sprite.vy = PADDLE_MOVE_SPEED * -1;
    };
    this.controls.up.release = () => {
      this.upArrowDown = false;
      this.applyToMirroredBall(0);
      if (!this.controls.down.isDown) {
        this.sprite.vy = 0;
      }
    };
    this.controls.down.press = () => {
      this.downArrowDown = true;
      this.applyToMirroredBall(1);
      this.sprite.vy = PADDLE_MOVE_SPEED;
    };
    this.controls.down.release = () => {
      this.downArrowDown = false;
      this.applyToMirroredBall(0);
      if (!this.controls.up.isDown) {
        this.sprite.vy = 0;
      }
    };
  }

  initHorizontalControls() {
    this.controls.right.press = () => {
      this.rightArrowDown = true;
      this.applyToMirroredBall(1);
      this.sprite.vx = PADDLE_MOVE_SPEED;
    };
    this.controls.right.release = () => {
      this.rightArrowDown = false;
      this.applyToMirroredBall(0);
      if (!this.controls.left.isDown) {
        this.sprite.vx = 0;
      }
    };
    this.controls.left.press = () => {
      this.applyToMirroredBall(-1);
      this.leftArrowDown = true;
      this.sprite.vx = PADDLE_MOVE_SPEED * -1;
    };
    this.controls.left.release = () => {
      this.applyToMirroredBall(0);
      this.leftArrowDown = false;
      if (!this.controls.right.isDown) {
        this.sprite.vx = 0;
      }
    };
  }

  initInput() {
    this.controls = getPlayerControls(this.g, this.player);

    if ([TOP, BOTTOM].indexOf(this.position) > -1) {
      this.initHorizontalControls();
    }
    if ([LEFT, RIGHT].indexOf(this.position) > -1) {
      this.initVerticalControls();
    }

    this.controls.action.press = () => {
      if (this.caughtBall) {
        this.releaseBall();
      }
    }
  }

  releaseBall() {
    if (this.caughtBall) {
      switch (this.position) {
        case BOTTOM:
          this.caughtBall.sprite.vy = BALL_RELEASE_SPEED * -1;
          this.caughtBall.sprite.vx = this.sprite.vx;
          break;
        case TOP:
          this.caughtBall.sprite.vy = BALL_RELEASE_SPEED;
          this.caughtBall.sprite.vx = this.sprite.vx;
          break;
        case LEFT:
          this.caughtBall.sprite.vy = this.sprite.vy;
          this.caughtBall.sprite.vx = BALL_RELEASE_SPEED;
          break;
        case RIGHT:
          this.caughtBall.sprite.vy = this.sprite.vy;
          this.caughtBall.sprite.vx = BALL_RELEASE_SPEED * -1;
          break;
      }
      this.caughtBall = null;
    }
  }

  handleCaughtBall() {
    if (this.caughtBall) {
      this.caughtBall.sprite.vx = 0;
      this.caughtBall.sprite.vy = 0;
      switch (this.position) {
        case TOP:
          this.sprite.putBottom(this.caughtBall.sprite);
          break;
        case LEFT:
          this.sprite.putRight(this.caughtBall.sprite);
          break;
        case BOTTOM:
          this.sprite.putTop(this.caughtBall.sprite);
          break;
        case RIGHT:
          this.sprite.putLeft(this.caughtBall.sprite);
          break;
      }
    }
  }

  handleCollision(otherThing) {
    if (otherThing instanceof Ball) {
      if (otherThing.mod === 'growball') {
        this.length = Math.min(this.length + 8, MAX_PADDLE_LENGTH);
        this.recreateSprite();
      } else if (otherThing.mod === 'shrinkball') {
        this.length = Math.max(this.length - 8, MIN_PADDLE_LENGTH);
        this.recreateSprite();
      }
    }
  }

  update() {
    super.update();
    const g = this.g;

    g.move(this.sprite);

    this.handleCaughtBall();

    const bounds = Object.assign({}, g.stage.localBounds);
    if (this.position === TOP || this.position === BOTTOM) {
      bounds.x = PIT_SIZE;
      bounds.width -= PIT_SIZE;
    } else if (this.position === LEFT || this.position === RIGHT) {
      bounds.y = PIT_SIZE + HUD_HEIGHT;
      bounds.height -= PIT_SIZE;
    }
    g.contain(this.sprite, bounds);
  }
}

export default Paddle;
