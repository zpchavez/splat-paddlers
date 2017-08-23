require('../lib/ga.js');
require('../lib/custom.js');

import gameState from './states/game';
import mainMenuState from './states/main-menu';

const ga = window.ga;

var g = ga(
  768,
  800,
  () => {
    g.canvas.style.border = "2px black solid";
    g.canvas.style.display = "block";
    g.canvas.style.margin = "auto";
    g.backgroundColor = "white";

    // g.state = mainMenuState(g);
    g.state = gameState(g);
  },
);

g.start();
g.enableFullscreen();
