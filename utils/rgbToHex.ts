const componentToHex = (component: number): string => {
  const hex = component.toString(16);
  return hex.length === 1 ? '0' + hex : hex;
};

export default function rgbToHex(color: string): string {
  const values = color.split('(')[1]?.split(')')[0];
  if (!values) {
    return color;
  }

  const rgb = values.split(',').map((value) => value.trim());
  const [red, green, blue, alpha] = rgb;

  const r = parseInt(red ?? '0', 10);
  const g = parseInt(green ?? '0', 10);
  const b = parseInt(blue ?? '0', 10);
  const a = alpha ? Math.round(parseFloat(alpha) * 255) : 0;

  const base = componentToHex(r) + componentToHex(g) + componentToHex(b);
  return a === 0 ? `#${base}` : `#${base}${componentToHex(a)}`;
}
