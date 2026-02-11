import type { ItemRarity } from "@dungeons/shared";

export const rarityBgMap: Record<ItemRarity, string> = {
  Common: "bg-gray-500",
  Uncommon: "bg-green-600",
  Rare: "bg-blue-600",
  Legendary: "bg-purple-600",
  Exotic: "bg-yellow-500",
};