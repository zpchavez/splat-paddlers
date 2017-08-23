import { getPlayerControls } from '../controls';
import TextUtil from '../text-util';

export default (g) => {
  const textUtil = new TextUtil(g);
  const titleText = textUtil.createHorizontallyCenteredText('Splat Paddlers!', 64, '#000000', 20);
  const menuTexts = textUtil.createHorizontallyCenteredTexts(
    ['2 Players'], 48, '#000000', 128, 64
  );
  return () => {};
}
