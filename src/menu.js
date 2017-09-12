import TextUtil from './text-util';
import { getPlayerControls } from './controls';

class Menu
{
  constructor(g) {
    this.g = g;
    this.items = [];
    this.cursorPos = 0;
    this.textUtil = new TextUtil(g);
    this.textSize = 48;
    this.spacing = 64;
    this.initInput();
  }

  initInput() {
    this.controls = getPlayerControls(this.g, 1);
    this.controls.up.press = () => {
      if (this.cursorPos === 0) {
        this.cursorPos = this.items.length - 1;
      } else {
        this.cursorPos -= 1;
      }
    }
    this.controls.down.press = () => {
      if (this.cursorPos === this.items.length - 1) {
        this.cursorPos = 0;
      } else {
        this.cursorPos += 1;
      }
    }
    this.controls.action.press = () => {
      this.textUtil.clear();
      this.controls.action.press = null;
      this.items[this.cursorPos].callback();
    }
  }

  setYPosition(y) {
    this.y = y;
  }

  addItem(text, callback) {
    this.items.push({ text, callback });
  }

  draw() {
    if (!this.cursor) {
      this.texts = this.textUtil.centeredTexts(
        this.items.map(item => item.text),
        this.textSize,
        '#000000',
        this.y,
        this.spacing
      );

      this.cursor = this.textUtil.createText(
        '=>',
        this.textSize,
        '#000000',
        this.texts[0].x - this.spacing,
        this.y + (this.spacing * this.cursorPos)
      );
    }

    this.cursor.y = this.y + (this.spacing * this.cursorPos);
  }
}

export default Menu;
