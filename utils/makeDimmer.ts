const makeDimmer = (hex: string, dim: number): string => {
  const channel = (value: string): string => {
    const computed = Math.round(parseInt(value, 16) * dim).toString(16);
    return computed.length === 1 ? '0' + computed : computed;
  };

  const r = channel(hex.substring(1, 3));
  const g = channel(hex.substring(3, 5));
  const b = channel(hex.substring(5, 7));

  return `#${r}${g}${b}`;
};

export default makeDimmer;
