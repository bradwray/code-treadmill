import { codeTags } from "./codeTags";

export default function mdnAble(token) {
  return codeTags.map((item) => item.tag).includes(token);
}
