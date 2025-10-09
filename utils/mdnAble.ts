import { codeTags } from './codeTags';

export default function mdnAble(token: string): boolean {
  return codeTags.map((item) => item.tag).includes(token);
}
