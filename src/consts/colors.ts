export type TColors =
  | "blue"
  | "violet"
  | "red"
  | "orange"
  | "yellow"
  | "green"
  | "aqua"
  | "pink";

export const colors: { name: TColors; hex: string }[] = [
  { name: "blue", hex: "#066AFF" },
  { name: "violet", hex: "#D313E5" },
  { name: "red", hex: "#e15252" },
  { name: "orange", hex: "#f2874b" },
  { name: "yellow", hex: "#f9f02c" },
  { name: "green", hex: "#56e513" },
  { name: "aqua", hex: "#4fe1d8" },
  { name: "pink", hex: "#fdb1ec" },
];
