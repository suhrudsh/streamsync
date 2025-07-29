import { useEffect, useState } from "react";

export function useTilePaths() {
  const [tilePaths, setTilePaths] = useState(null);

  useEffect(() => {
    fetch("tile_paths.json")
      .then((res) => res.json())
      .then((data) => setTilePaths(data.tilePaths));
  }, []);

  return tilePaths;
}
