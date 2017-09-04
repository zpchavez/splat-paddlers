import AbstractThing from './abstract-thing';
import colors from '../colors';

const TIMER_SECONDS = 90;
export const HUD_HEIGHT = 32;

class Hud extends AbstractThing
{
  constructor(g, options={}) {
    super(g, 'hud');

    this.createSprites();

    if (typeof options.onTimerReachesZero !== 'function') {
      g.pause();
      throw new ('Must specify onTimerReachesZero callback');
    }
    this.onTimerReachesZero = options.onTimerReachesZero;

    this.timerFrames = (TIMER_SECONDS + 1) * this.g.fps;
  }

  createSprites() {
    const g = this.g;

    this.sprite = g.rectangle(
      768,
      HUD_HEIGHT - 1,
      '#aaaaaa',
      '#000000',
      0,
      0
    );

    this.timerText = g.text(
      Math.ceil(this.timerFrames / this.g.fps),
      '24px monospace',
      '#ffffff',
      this.g.stage.halfWidth - 12,
      0
    );
    const scorePositions = [64, 672, 532, 208];
    this.scores = {};

    Object.keys(this.g.globals.roundScore).forEach((color, index) => {
      this.scores[color] = g.text(
        g.globals.roundScore[color].toString(),
        '24px monospace',
        colors[color].fill,
        scorePositions[index],
        0
      );
    });
  }

  recreateSprites() {
    this.remove();
    this.createSprites();
  }

  updateScoreText() {
    Object.keys(this.g.globals.roundScore).forEach(color => {
      this.scores[color].content = this.g.globals.roundScore[color].toString();
    });
  }

  updateTimerText() {
    this.timerText.content = Math.floor(this.timerFrames / this.g.fps);
  }

  remove() {
    super.remove();
    this.g.remove(this.timerText);
    Object.keys(this.scores).forEach(color => {
      this.g.remove(this.scores[color]);
    });
  }

  isTie() {
    const score = this.g.globals.roundScore;
    const sortedScores = Object.keys(score).map(
      color => ({ color, score: score[color]})
    ).sort((a, b) => b.score - a.score);
    return sortedScores[0].score === sortedScores[1].score;
  }

  update() {
    super.update();
    this.updateScoreText();
    if (this.timerText.content === 0) {
      if (!this.isTie()) {
        this.onTimerReachesZero();
      }
    } else {
      this.timerFrames -= 1;
      this.updateTimerText();
    }
  }
}

export default Hud;
