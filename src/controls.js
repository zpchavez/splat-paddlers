export function getPlayerControls(g, playerNumber) {
  const keyboard = g.keyboard;
  switch (playerNumber) {
    case 1:
      return {
        up: keyboard(38),
        left: keyboard(37),
        down: keyboard(40),
        right: keyboard(39),
        action: keyboard(13), // enter
      }
      break;
    case 2:
      return {
        up: keyboard(87),     // W
        left: keyboard(65),   // A
        down: keyboard(),     // S
        right: keyboard(),    // D
        action: keyboard(32), // spacebar
      }
  }
}
