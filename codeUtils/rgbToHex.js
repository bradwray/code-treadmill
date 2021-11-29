function componentToHex(c) {
  var hex = c.toString(16);
  return hex.length == 1 ? "0" + hex : hex;
}

export default function rgbToHex(orig) {
  orig = orig.split("(")[1].split(")")[0];
  var rgb = orig.split(",");
  console.log(rgb);
  var r = parseInt(rgb[0]);
  var g = parseInt(rgb[1]); // this is just g
  var b = parseInt(rgb[2]); // parseInt scraps trailing )
  return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
}
