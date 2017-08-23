class TextUtil
{
  constructor(g) {
    this.g = g;
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
