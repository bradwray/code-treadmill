const PseudoArray = `class PseudoArray {
   constructor(items) {
      this.arr = items;
   }
   // the filler param allows the syntax of the Pseudocode
   //to accept the array name even though we have it through .this
   LENGTH(filler) {
      return this.arr.length;
   }

   getElem(i) {
      return this.arr[i - 1];
   }

   setElem(i, val) {
      this.arr[i - 1] = val;
   }

   INSERT(filler, i, val) {
      this.arr.splice(i - 1, 0, val);
   }

   APPEND(filler, val) {
      this.arr.push(val);
   }

   REMOVE(filler, i) {
      this.arr.splice(i - 1, 1);
   }

   forEach(func) {
      this.arr.forEach(func);
   }
}`;

export default PseudoArray;
