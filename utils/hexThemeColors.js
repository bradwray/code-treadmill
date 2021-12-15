import rgba2hex from './rgbToHex';

export default function hexThemeColors(theme) {
   const newStyle = theme.styles.map(({ style, types }) => {
      if (style.color) {
         return {
            style: {
               ...style,
               color: style.color.includes('(') ? rgba2hex(style.color) : style.color,
            },
            types: types,
         };
      } else {
         return {
            style,
            types,
         };
      }
   });
   var newTheme = {
      ...theme,
      styles: newStyle,
   };
   console.log(newTheme);
   return newTheme;
}
