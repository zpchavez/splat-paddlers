import TextUtil from './text-util';
import { getPlayerControls } from './controls';

class Menu
{
  constructor(g) {
    this.g = g;
    this.items = [];
    this.cursorPosition = 0;
    this.textUtil = new TextUtil(g);
    this.textSize = 48;
    this.verticalSpacing = 64;
    this.initInput();
  }

  initInput() {
    this.controls = getPlayerControls(this.g, 1);
    this.controls.up.press = () => {
      if (this.cursorPosition === 0) {
        this.cursorPosition = this.items.length - 1;
      } else {
        this.cursorPosition -= 1;
      }
    }
    this.controls.down.press = () => {
      if (this.cursorPosition === this.items.length - 1) {
        this.cursorPosition = 0;
      } else {
        this.cursorPosition += 1;
      }
    }
    this.controls.action.press = () => {
      this.textUtil.clear();
      this.controls.action.press = null;
      this.items[this.cursorPosition].callback();
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
      this.texts = this.textUtil.createHorizontallyCenteredTexts(
        this.items.map(item => item.text),
        this.textSize,
        '#000000',
        this.y,
        this.verticalSpacing
      );

      this.cursor = this.textUtil.createText(
        '=>',
        this.textSize,
        '#000000',
        this.texts[0].x - this.verticalSpacing,
        this.y + (this.verticalSpacing * this.cursorPosition)
      );
    }

    this.cursor.y = this.y + (this.verticalSpacing * this.cursorPosition);
  }
}

export default Menu;
