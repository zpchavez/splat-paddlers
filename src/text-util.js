class TextUtil
{
  constructor(g) {
    this.g = g;
  }

  createHorizontallyCenteredTexts(texts, size, color, y, spacing) {
    const g = this.g;
    const letterSpacing = size * 0.2;
    let xAdjustment = texts.length === 1
      ? texts[0].length
      : texts.reduce((text, acc) => text.length > acc.length ? text.length : acc.length);

    return texts.map(
      (text, index) => g.text(
        text,
        `${size}px monospace`,
        color,
        g.stage.halfWidth - ((xAdjustment / 2) * ((size + letterSpacing) / 2)),
        y + (spacing * index)
      )
    );
  }

  createHorizontallyCenteredText(text, size, color, y) {
    const letterSpacing = size * 0.2;
    const g = this.g
    return g.text(
      text,
      `${size}px monospace`,
      color,
      g.stage.halfWidth - ((text.length / 2) * ((size + letterSpacing) / 2)),
      y
    );
  }
}

export default TextUtil;
