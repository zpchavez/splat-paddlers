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
        down: keyboard(83),   // S
        right: keyboard(68),  // D
        action: keyboard(32), // spacebar
      }
      break;
    case 3:
      return {
        up: keyboard(84),     // T
        left: keyboard(70),   // F
        down: keyboard(71),   // G
        right: keyboard(72),  // H
        action: keyboard(89), // Y
      }
      break;
    case 4:
      return {
        up: keyboard(73),     // I
        left: keyboard(74),   // J
        down: keyboard(75),   // K
        right: keyboard(76),  // L
        action: keyboard(79), // O
      }
      break;
    default:
      throw new Error(`Invalid layer number: ${playerNumber}`);
      g.pause();
  }
}
