import { useEffect, useState } from "react";
import { TileContext } from "./useTiles"; // ← import, don’t re-create
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { TextureLoader } from "three";

export function TileProvider({ children, glbUrl, logoPaths, baseUrl = "/" }) {
  const [tiles, setTiles] = useState(null);

  useEffect(() => {
    let cancelled = false;
    const gltfLoader = new GLTFLoader();
    const txLoader = new TextureLoader();

    Promise.all([
      new Promise((res, rej) =>
        gltfLoader.load(glbUrl, (g) => res(g), undefined, rej),
      ),
      Promise.all(
        logoPaths.map(
          (p) =>
            new Promise((res, rej) =>
              txLoader.load(
                baseUrl + "logos/" + p,
                (tex) => {
                  tex.flipY = false;
                  res(tex);
                },
                undefined,
                rej,
              ),
            ),
        ),
      ),
    ])
      .then(([gltf, textures]) => {
        if (cancelled) return;

        setTiles({
          nodes: Object.fromEntries(
            gltf.scene.children[0].children.map((c) => [c.name, c]),
          ),
          textures: Object.fromEntries(
            logoPaths.map((p, i) => [p, textures[i]]),
          ),
        });
      })
      .catch(console.error);

    return () => {
      cancelled = true;
    };
  }, [glbUrl, logoPaths, baseUrl]);

  if (!tiles) return null;
  return <TileContext.Provider value={tiles}>{children}</TileContext.Provider>;
}
