import { styles } from "./cobalt.cjs";
import rgba2hex from "./rgbToHex";

export default function hexThemeColors(theme) {
  return {
    ...theme,
    styles: styles.map(({ style, types }) => {
      return {
        style: {
          ...style,
          color: style.color.includes("(")
            ? rgba2hex(style.color)
            : style.color,
          original: style.color,
        },
        types: types,
      };
    }),
  };
}
