import TextUtil from '../text-util';
import gameState from './game';
import colors from '../colors';
import { getPlayerControls } from '../controls';
import { rpad, lpad } from '../utils';

module.exports = (g) => {
  let score = g.globals.roundScore;
  g.things.forEach(thing => thing.remove());

  // Sort score descending
  const sortedScores = Object.keys(score).map(
    color => ({ color, score: score[color]})
  ).sort((a, b) => b.score - a.score);

  const longestColor = sortedScores.reduce(
    (acc, score) => score.color.length > acc ? score.color.length : acc,
    sortedScores[0].color.length
  );
  const longestScore = sortedScores.reduce(
    (acc, score) => score.score.toString().length > acc ? score.score.toString().length : acc,
    sortedScores[0].score.toString().length
  );

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

  const scoreTextStrings = sortedScores.map(
    ({ score, color }) => rpad(`${color}`, longestColor + 1) + lpad(`${score}`, longestScore)
  );
  scoreTexts.push.apply(
    scoreTexts,
    textUtil.createHorizontallyCenteredTexts(scoreTextStrings, 36, '#000000', 192, 48)
  );

  scoreTexts.push(
    textUtil.createHorizontallyCenteredText(
      `${sortedScores[0].color.toUpperCase()} WINS THE ROUND!`,
      48,
      '#000000',
      64
    )
  );

  g.wait(3000, () => {
    scoreTexts.forEach(text => g.remove(text));
    g.state = gameState(g);
  })

  return () => {};
};
