import {
  randomAdj,
  randomAnimals,
  randomName,
} from "../codeUtils/randomStringGenerator.js";

const fillIt = (codeString) => {
  var newCodeString = codeString;
  while (
    newCodeString.indexOf("##") >= 0 ||
    newCodeString.indexOf("#-#") >= 0 ||
    newCodeString.indexOf("#.#") >= 0 ||
    newCodeString.indexOf("@@") >= 0 ||
    newCodeString.indexOf("^^") >= 0 ||
    newCodeString.indexOf("**") >= 0 ||
    newCodeString.indexOf("$$") >= 0
  ) {
    newCodeString = newCodeString.replace(
      "#-#",
      Math.ceil(Math.random() * 7) + 9
    );
    newCodeString = newCodeString.replace("#.#", Math.random().toFixed(2));
    newCodeString = newCodeString.replace("##", Math.floor(Math.random() * 7));
    newCodeString = newCodeString.replace("$$", `"${randomAdj()}"`);
    newCodeString = newCodeString.replace("^^", `"${randomName()}"`);
    newCodeString = newCodeString.replace(
      "**",
      `${Math.random() > 0.5 ? true : false}`
    );
    newCodeString = newCodeString.replace("@@", `"${randomAnimals()}"`);
  }
  //   console.log("filled with", newCodeString);
  return newCodeString;
};

export default fillIt;
