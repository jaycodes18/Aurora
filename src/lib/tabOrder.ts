import type { TabId } from "../tabIds";

export const TAB_ORDER: TabId[] = [
  "overview",
  "optimization",
  "analytics",
  "floor",
  "architecture",
  "reports",
];

export function tabFromHash(hash: string): TabId | null {
  const id = hash.replace(/^#/, "") as TabId;
  return TAB_ORDER.includes(id) ? id : null;
}
