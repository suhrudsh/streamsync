import { createContext, useContext } from "react";

export const TileContext = createContext(null);

export function useTiles() {
  const ctx = useContext(TileContext);
  if (!ctx) throw new Error("useTiles must be inside TileProvider");
  return ctx;
}
