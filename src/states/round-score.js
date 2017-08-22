import gameState from './game';
import { getPlayerControls } from '../controls';

module.exports = (g) => {
  let score = {};
  g.collisionGroups.paddles.forEach(paddle => {
    score[paddle.color] = 0;
  });
  g.collisionGroups.blocks.forEach(block => {
    if (block.color !== 'blank') {
      score[block.color] += 1;
    }
  })
  g.things.forEach(thing => g.remove(thing.sprite));
  const scoreTexts = [];
  scoreTexts.push(
    g.text(
      'Round score',
      '48px sans-serif',
      '#000000',
      g.stage.halfWidth - (11 * 12),
      128
    )
  );
  Object.keys(score).forEach((color, index) => {
    scoreTexts.push(
      g.text(
        `${color}: ${score[color]}`,
        '24px sans-serif',
        '#000000',
        g.stage.halfWidth - 32,
        128 + (32 * (index + 2))
      )
    );
  });

  g.wait(3000, () => {
    scoreTexts.forEach(text => g.remove(text));
    g.state = gameState(g);
  })

  return () => {};
};
