import { Suspense, useMemo, useRef } from "react";
import * as THREE from "three";
import { useTiles } from "../../tiles/useTiles";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { StreamSyncText } from "./StreamSyncText";
import { useTilePaths } from "../../tiles/useTilesPaths";
import { useThree } from "@react-three/fiber";
import LogoTile from "../../tiles/LogoTile";
import { SearchOrb } from "./SearchOrb";

gsap.registerPlugin(ScrollTrigger);

export default function LogoSphere({ logoPaths, wrapperRef, setRotateCamera }) {
  const { nodes, textures } = useTiles();
  const tilePaths = useTilePaths();
  const tilesRefs = useRef([]);
  const orbRef = useRef();
  const { camera } = useThree();

  const curves = useMemo(() => {
    return tilePaths?.map((points) => {
      return new THREE.CatmullRomCurve3(
        points.map((p) => new THREE.Vector3(...p)),
      );
    });
  }, [tilePaths]);

  useGSAP(() => {
    if (!curves?.length) return; // nothing to stagger

    // build an array of { curve, tile, t } that definitely exists
    const controllers = curves.map((curve, i) => ({
      curve,
      tile: tilesRefs.current[i],
      t: 0,
    }));

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: wrapperRef.current,
        start: "top center",
        end: "33% center",
        scrub: true,
        onLeave: () => {
          setRotateCamera(true);
        },
        onEnterBack: () => {
          setRotateCamera(false);
        },
      },
    });

    tl.to(controllers, {
      t: 1,
      duration: 5,
      ease: "power2.inOut",
      stagger: 0.2,
      onUpdate: () => {
        // loop through each controller — its `t` will be 0 until its stagger kicks in
        controllers.forEach(({ curve, tile, t }) => {
          // update position
          const pos = curve.getPointAt(t);
          tile.position.copy(pos);

          // update orientation
          const tangent = curve.getTangentAt(t).normalize();
          const q = new THREE.Quaternion().setFromUnitVectors(
            new THREE.Vector3(1, 0, 0),
            tangent,
          );
          tile.quaternion.copy(q);
        });
      },
    });
  }, [curves]);

  useGSAP(() => {
    gsap.to(wrapperRef.current, {
      scrollTrigger: {
        trigger: wrapperRef.current,
        start: "top top",
        end: "bottom top",
        onLeave: () => {
          camera.position.set(16, 10, 5);
          camera.lookAt(0, 0, 0);
          setRotateCamera(false);
        },
        onEnterBack: () => {
          setRotateCamera(true);
        },
      },
    });
  }, []);

  // 1) In your useMemo, return both the curve *and* the raw path array:
  const { orbPath, thresholdT } = useMemo(() => {
    if (!tilePaths?.length) return {};

    const selected = [0, 3, 7];

    // build raw path
    const path = [new THREE.Vector3(0, 0, 0)];
    selected.forEach((i) => {
      const lastArr = tilePaths[i][tilePaths[i].length - 1];
      const target = new THREE.Vector3(...lastArr);
      const noisy = target
        .clone()
        .add(
          new THREE.Vector3(
            (Math.random() - 0.5) * 1.2,
            (Math.random() - 0.5) * 1.2,
            (Math.random() - 0.5) * 1.2,
          ),
        );
      path.push(noisy, target);
    });
    path.push(new THREE.Vector3(0, 0, 0));

    // The “lastBeforeCenter” is at path.length - 2
    const rawIndex = path.length - 2;
    const totalSegments = path.length - 1;
    // Since CatmullRomCurve3.getPointAt(t) is uniform in arc-length,
    // the normalized t where it hits that rawIndex is:
    const thresholdT = rawIndex / totalSegments;

    return {
      orbPath: new THREE.CatmullRomCurve3(path),
      thresholdT,
    };
  }, [tilePaths]);

  useGSAP(() => {
    if (!orbPath || thresholdT == null || !orbRef.current) return;
    const orb = orbRef.current;
    const obj = { t: 0 };

    gsap
      .timeline({
        scrollTrigger: {
          trigger: wrapperRef.current,
          start: "33% 75%",
          end: "66% center",
          scrub: true,
        },
      })
      .fromTo(
        orb.scale,
        { x: 0, y: 0, z: 0 },
        {
          x: 1,
          y: 1,
          z: 1,
          ease: "power2.out",
        },
      )
      .to(obj, {
        t: 1,
        ease: "none",
        onUpdate: () => {
          // move orb
          orb.position.copy(orbPath.getPointAt(obj.t));

          // color logic purely on t
          if (obj.t >= thresholdT) {
            orb.material.color.set("purple");
            orb.material.emissive.set("purple");
          } else {
            orb.material.color.set("white");
            orb.material.emissive.set("white");
          }
        },
      });
  }, [orbPath, thresholdT]);

  useGSAP(() => {
    const orb = orbRef.current;
    if (!orb) return;

    gsap.fromTo(
      orb.scale,
      { x: 1, y: 1, z: 1 },
      {
        x: 40,
        y: 40,
        z: 40,
        ease: "power2.inOut",
        scrollTrigger: {
          trigger: wrapperRef.current,
          start: "66% 75%",
          end: "bottom center",
          scrub: true,
        },
      },
    );
  }, []);

  return (
    <>
      <Suspense fallback={null}>
        {logoPaths.map((logo, i) => (
          <LogoTile
            key={logo + 1}
            ref={(el) => (tilesRefs.current[i] = el)}
            geometry1={nodes.tile_1.geometry}
            geometry2={nodes.tile_2.geometry}
            texture={textures[logo]}
            scale={1}
            rotation={[0, Math.PI, 0]}
          />
        ))}
      </Suspense>
      <StreamSyncText />
      <SearchOrb ref={orbRef} />
    </>
  );
}
