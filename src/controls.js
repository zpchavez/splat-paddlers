let setsOfControls = [];

export function resetControls() {
  setsOfControls = [];
}

export function getPlayerControls(g, playerNumber) {
  const controls = {
    [playerNumber]: {
      up: { press: () => {}, release: () => {} },
      down: { press: () => {}, release: () => {} },
      left: { press: () => {}, release: () => {} },
      right: { press: () => {}, release: () => {} },
      action: { press: () => {}, release: () => {} },
    }
  };

  setsOfControls.push(controls);

  g.airconsole.onMessage = (from, data) => {
    const player = from;
    const action = data.substr(0, data.indexOf('-'));
    const button = data.substr(data.indexOf('-') + 1);
    setsOfControls.forEach(controls => {
      if (controls[player]) {
        controls[player][button][action]()
      }
    })
  };

  return controls[playerNumber];
}
