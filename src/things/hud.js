import AbstractThing from './abstract-thing';

const TIMER_SECONDS = 90;
export const HUD_HEIGHT = 32;

class Hud extends AbstractThing
{
  constructor(g, options={}) {
    super(g, 'hud');

    this.createSprite();

    if (typeof options.onTimerReachesZero !== 'function') {
      g.pause();
      throw new ('Must specify onTimerReachesZero callback');
    }
    this.onTimerReachesZero = options.onTimerReachesZero;

    this.timerFrames = (TIMER_SECONDS + 1) * 60;
    this.timerText = g.text(
      Math.ceil(this.timerFrames / 60),
      '24px sans-serif',
      '#ffffff',
      this.g.stage.halfWidth - 12,
      0
    );
  }

  createSprite() {
    this.sprite = this.g.rectangle(
      768,
      HUD_HEIGHT - 1,
      '#aaaaaa',
      '#000000',
      0,
      0
    );
  }

  recreateSprite() {
    this.remove();
    this.createSprite();
  }

  updateTimerText() {
    this.timerText.content = Math.floor(this.timerFrames / 60);
  }

  update() {
    super.update();
    this.timerFrames -= 1;
    this.updateTimerText();
    if (this.timerText.content === 0) {
      this.onTimerReachesZero();
    }
  }
}

export default Hud;
