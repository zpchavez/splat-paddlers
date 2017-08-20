#!/usr/bin/env node
const fs = require('fs');
const PNGReader = require('png.js');
const file = process.argv[2];

const fileData = fs.readFileSync(file);

var reader = new PNGReader(fileData);
reader.parse(function(err, png){
  if (err) throw err;
  if (png.getWidth() !== 16 || png.getHeight == 16) {
    throw new Error('png must be 16x16');
  }
  let jsData = [];
  for (let x = 0; x < 16; x += 1) {
    for (let y = 0; y < 16; y += 1) {
      const pixelData = png.getPixel(x, y);
      if (pixelData[3] === 0) {
        jsData.push('null');
      } else {
        let r = pixelData[0].toString(16);
        let g = pixelData[1].toString(16);
        let b = pixelData[2].toString(16);
        if (r.length === 1) {
          r = `0${r}`;
        }
        if (g.length === 1) {
          g = `0${g}`;
        }
        if (b.length === 1) {
          b = `0${b}`;
        }
        jsData.push(
          `'${r}${g}${b}'`
        );
      }
    }
  }
  const outputFile = `${file}.js`;
  fs.writeFileSync(outputFile, `export default [${jsData.join(',')}];`);
  console.log(`wrote file: ${outputFile}`);
});
