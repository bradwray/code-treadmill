//this class is stored in a string so that it can be used with the pseudocode to make the arrays work like they do here
//https://apcentral.collegeboard.org/pdf/ap-computer-science-principles-exam-reference-sheet.pdf

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
}`;

export default PseudoArray;
