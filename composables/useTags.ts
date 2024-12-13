import type { MenuItem } from "~/assets/menus/types";

export interface Tags extends MenuItem {}

export const useTags = () => {
  return useState<Tags[]>("tags", () => []);
};
