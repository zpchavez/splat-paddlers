const fill = function(len, filler=' ') {
  return (Array(Math.max(0, len)).fill(filler)).join('');
};

export const rpad = function(str, len, filler=' ') {
  return str + fill(len - str.length);
};

export const lpad = function(str, len, filler=' ') {
  return fill(len - str.length, filler) + str;
};
