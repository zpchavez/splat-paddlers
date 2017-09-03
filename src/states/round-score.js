import TextUtil from '../text-util';
import gameState from './game';
import winnerState from './winner';
import colors from '../colors';
import { getPlayerControls } from '../controls';
import { rpad, lpad } from '../utils';

const ROUNDS_TO_WIN = 3;

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
  textUtil.createHorizontallyCenteredText(
    'ROUND SCORE',
    48,
    '#000000',
    128
  )

  const scoreTextStrings = sortedScores.map(
    ({ score, color }) => rpad(`${color}`, longestColor + 1) + lpad(`${score}`, longestScore)
  );
  textUtil.createHorizontallyCenteredTexts(scoreTextStrings, 36, '#000000', 192, 48)

  const winner = sortedScores[0].color;
  g.globals.roundsWon[winner] += 1;

  textUtil.createHorizontallyCenteredText(
    `${winner.toUpperCase()} WINS THE ROUND!`,
    48,
    '#000000',
    32
  )

  textUtil.createHorizontallyCenteredText(
    `ROUNDS WON`,
    48,
    '#000000',
    412
  )

  const roundWinsTextStrings = Object.keys(g.globals.roundsWon).map(
    (color) => rpad(`${color}`, longestColor + 1) + g.globals.roundsWon[color]
  );
  textUtil.createHorizontallyCenteredTexts(roundWinsTextStrings, 36, '#000000', 480, 48)

  g.wait(4000, () => {
    textUtil.clear();
    if (g.globals.roundsWon[winner] === ROUNDS_TO_WIN) {
      g.state = winnerState(g, winner);
    } else {
      g.state = gameState(g);
    }
  })

  return () => {};
};
