/**
 * Get the value of y
 * @param {number} s
 */
export const getY = s => {
  if (typeof s === "number") {
    if (0 < s && s <= 20) return s;
    if (20 < s && s <= 35) return 20 + (20 * (s - 20)) / 16;
    if (35 < s && s <= 50) return 40 + (20 * (s - 35)) / 15;
    if (50 < s && s <= 70) return 60 + (s - 50);
    if (70 < s && s <= 80) return 80 + 2 * (s - 70);
    return 100;
  } else {
    return getY(parseInt(s));
  }
  return null;
};

export const getZ = (x, y) => {
  console.log(x, y);
  if (x != null && y != null) {
    return (
      35.58874 -
      0.64996 * x.toFixed(2) +
      0.01491 * y.toFixed(2) +
      0.00296 * x.toFixed(2) * x.toFixed(2) +
      -0.000291412 * y.toFixed(2) * y.toFixed(2) +
      0.000450432 * x.toFixed(2) * y.toFixed(2)
    );
  }
  return null;
};

export const convertToNumber = v => {
  if (typeof v === "number") {
    return v;
  }
  return parseInt(v);
};
