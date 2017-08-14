export function getPlayerControls(g, playerNumber) {
  const keyboard = g.keyboard;
  switch (playerNumber) {
    case 1:
      return {
        left: keyboard(37),
        up: keyboard(38),
        right: keyboard(39),
        down: keyboard(40),
        action: keyboard(32), // spacebar
      }
      break;
  }
}
