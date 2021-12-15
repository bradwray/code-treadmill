function componentToHex(c) {
   var hex = c.toString(16);
   return hex.length == 1 ? '0' + hex : hex;
}

export default function rgbToHex(orig) {
   orig = orig.split('(')[1].split(')')[0];
   var rgb = orig.split(',');
   var r = parseInt(rgb[0]);
   var g = parseInt(rgb[1]);
   var b = parseInt(rgb[2]);
   var a = rgb.length > 3 ? Math.round(parseFloat(rgb[3]) * 255) : 0;
   if (a === 0) {
      return '#' + componentToHex(r) + componentToHex(g) + componentToHex(b);
   } else {
      return '#' + componentToHex(r) + componentToHex(g) + componentToHex(b) + componentToHex(a);
   }
}
