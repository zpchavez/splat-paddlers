class TextUtil
{
  constructor(g) {
    this.g = g;
  }

  createHorizontallyCenteredTexts(texts, size, color, y, spacing) {
    const g = this.g;
    let xAdjustment = texts.reduce((text, acc) => text.length > acc.length ? text.length : acc.length);
    console.log('xAdjustment', xAdjustment);
    return texts.map(
      (text, index) => g.text(
        text,
        `${size}px sans-serif`,
        color,
        g.stage.halfWidth - (xAdjustment * (size / 4)),
        y + (spacing * index)
      )
    );
  }

  createHorizontallyCenteredText(text, size, color, y) {
    const g = this.g
    return g.text(
      text,
      `${size}px sans-serif`,
      color,
      g.stage.halfWidth - (text.length * (size / 4)),
      y
    );
  }
}

export default TextUtil;
