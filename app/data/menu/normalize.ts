import type { MenuItem } from "../types";

export function normalizeMenuItems(items: MenuItem[]): MenuItem[] {
  return items.map((item) => ({ ...item }));
}
