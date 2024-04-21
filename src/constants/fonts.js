export default fonts = {
  PRIMARY_FONT_300: "Mukta-300",
  PRIMARY_FONT_400: "Mukta-400",
  PRIMARY_FONT_500: "Mukta-500",
  PRIMARY_FONT_600: "Mukta-600",
  PRIMARY_FONT_700: "Mukta-700",
  METRO_FONT_400: "Metropolis-400",
  METRO_FONT_500: "Metropolis-500",
  METRO_FONT_600: "Metropolis-600",
  METRO_FONT_700: "Metropolis-700",
};


export const textStyle = (s, ff, c) => {
  return {
    fontSize: s,
    fontFamily: ff,
    color: c,
  };
};