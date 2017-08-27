const fill = function(len, filler=' ') {
  return (Array(Math.max(0, len)).fill(filler)).join('');
};

export const rpad = function(str, len, filler=' ') {
  return str + fill(len - str.length);
};

export const lpad = function(str, len, filler=' ') {
  console.log('l padding', str, len, len - str.length);
  return fill(len - str.length, filler) + str;
};
