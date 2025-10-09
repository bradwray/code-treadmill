import type { PrismTheme } from 'prism-react-renderer';

import type { AppTheme } from '../types';

import rgba2hex from './rgbToHex';

type ThemeStyle = PrismTheme['styles'][number];

export default function hexThemeColors(theme: PrismTheme) {
  const styles = theme.styles.map((entry): ThemeStyle => {
    const { style, types } = entry;
    const color = (style as { color?: string }).color;

    if (color && color.includes('(')) {
      return {
        style: {
          ...style,
          color: rgba2hex(color),
        },
        types,
      };
    }

    return {
      style,
      types,
    };
  });

  return {
    ...theme,
    styles,
  } as unknown as AppTheme;
}
