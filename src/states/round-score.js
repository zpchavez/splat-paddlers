import TextUtil from '../text-util';
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

  const textUtil = new TextUtil(g);
  const scoreTexts = [];
  scoreTexts.push(
    textUtil.createHorizontallyCenteredText(
      'Round score',
      48,
      '#000000',
      128
    )
  );
  Object.keys(score).forEach((color, index) => {
    scoreTexts.push(
      textUtil.createHorizontallyCenteredText(
        `${color}: ${score[color]}`,
        36,
        '#000000',
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
