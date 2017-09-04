require('../lib/ga.js');
require('../lib/custom.js');

import mainMenuState from './states/main-menu';
import Sfx from './sfx';

const ga = window.ga;

var g = ga(
  768,
  800,
  () => {
    g.canvas.style.border = "2px black solid";
    g.canvas.style.display = "block";
    g.canvas.style.margin = "auto";
    g.backgroundColor = "white";
    g.sfx = new Sfx();

    g.state = mainMenuState(g);
  },
);

g.start();
