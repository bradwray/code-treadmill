const makeDimmer = (h, dim) => {
   let r = Math.round(parseInt(h.substring(1, 3), 16) * dim).toString(16);
   let g = Math.round(parseInt(h.substring(3, 5), 16) * dim).toString(16);
   let b = Math.round(parseInt(h.substring(5, 7), 16) * dim).toString(16);
   r = r.length == 1 ? '0' + r : r;
   g = g.length == 1 ? '0' + g : g;
   b = b.length == 1 ? '0' + b : b;
   return '#' + r + g + b;
};

export default makeDimmer;
