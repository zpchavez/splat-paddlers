class TextUtil
{
  constructor(g) {
    this.g = g;
    this.texts = [];
  }

  clear() {
    this.g.remove(this.texts);
  }

  createText(string, size, color, x, y) {
    const text = this.g.text(
      string,
      `${size}px monospace`,
      color,
      x,
      y
    );

    this.texts.push(text);

    return text;
  }

  centeredTexts(strings, size, color, y, spacing) {
    const g = this.g;
    const letterSpacing = size * 0.2;
    let xAdjustment = strings.length === 1
      ? strings[0].length
      : strings.reduce((text, acc) => text.length > acc.length ? text.length : acc.length);

    const texts = strings.map(
      (text, index) => g.text(
        text,
        `${size}px monospace`,
        color,
        g.stage.halfWidth - ((xAdjustment / 2) * ((size + letterSpacing) / 2)),
        y + (spacing * index)
      )
    );

    this.texts.push.apply(this.texts, texts);

    return texts;
  }

  centeredText(string, size, color, y) {
    const letterSpacing = size * 0.2;
    const g = this.g
    const text = g.text(
      string,
      `${size}px monospace`,
      color,
      g.stage.halfWidth - ((string.length / 2) * ((size + letterSpacing) / 2)),
      y
    );

    this.texts.push(text);

    return text;
  }
}

export default TextUtil;
