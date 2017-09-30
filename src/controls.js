export function getPlayerControls(g, playerNumber) {

  console.log('getting player controls');

  const controls = {
    up: { press: () => {}, release: () => {} },
    down: { press: () => {}, release: () => {} },
    left: { press: () => {}, release: () => {} },
    right: { press: () => {}, release: () => {} },
    action: { press: () => {}, release: () => {} },
  }

  g.airconsole.onMessage = (from, data) => {
    // const player = g.airconsole.convertDeviceIdToPlayerNumber(from);
    const player = from;
    const action = data.substr(0, data.indexOf('-'));
    const button = data.substr(data.indexOf('-') + 1);
    if (player === playerNumber) {
      controls[button][action]()
    }
  };

  return controls;
}
