import { colors, TColors } from "../consts/colors";

export const getColor = (color: TColors) =>
  colors.find((clr) => clr.name === color)?.hex || "red";
