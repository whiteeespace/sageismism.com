"use client";

import { disableBodyScroll, clearAllBodyScrollLocks } from "body-scroll-lock";
import { motion } from "framer-motion";
import _ from "lodash";
import { useEffect, useRef, useState, TouchEvent, useCallback } from "react";
import * as THREE from "three";
import { seededRandom } from "three/src/math/MathUtils";

import { useWindowSize } from "@utils/hooks/use-window-size";

import styles from "../styles.module.scss";

const X_MAX = 4;
const X_MAX_MOBILE = 80;

const signRandomizer = (idx: number) => (seededRandom(idx) >= 0.5 ? 1 : -1);

const History: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const threejsContainerRef = useRef<HTMLDivElement>(null);
  const [touchStartCoord, setTouchStartCoord] = useState({ x: 0, y: 0 });
  const [camera, setCamera] = useState<THREE.PerspectiveCamera | null>(null);
  const { width, height } = useWindowSize();

  const fovMAX = 60;
  const fovMIN = -400;

  useEffect(() => {
    if (!containerRef.current || !threejsContainerRef.current || !width || !height) {
      return;
    }

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);

    setCamera(camera);
    camera.position.z = 60;

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
    });

    renderer.setSize(width, height);
    threejsContainerRef.current.appendChild(renderer.domElement);

    const images = _.range(1, 29).reverse();
    images.forEach((it, idx) => {
      const loader = new THREE.TextureLoader();
      const material = new THREE.MeshBasicMaterial({
        map: loader.load(`/home/five-year-${it}.png`),
        transparent: true,
      });

      const geometry = new THREE.PlaneGeometry(50, 50);
      const mesh = new THREE.Mesh(geometry, material);

      const firstSign = idx % 2 === 0 ? -1 : 1;
      mesh.position.set(
        firstSign * (seededRandom(idx + 24) * 100),
        signRandomizer(29 - idx) * seededRandom(idx + 8) * 35 + 10,
        idx * -15
      );
      scene.add(mesh);
    });

    const light = new THREE.PointLight(0xffffff, 0.01, 100);
    light.position.set(1, 1, 100);
    scene.add(light);

    const onDocumentMouseWheel = (evt: WheelEvent) => {
      camera.position.z -= evt.deltaY * 0.05;
      camera.position.z = Math.max(Math.min(camera.position.z, fovMAX), fovMIN);
    };

    const onDocumentMouseMove = (evt: MouseEvent) => {
      camera.position.x = (evt.clientX / width) * X_MAX * 2 - X_MAX;
      camera.position.y = -(evt.clientY / height) * X_MAX * 2 + X_MAX;
    };

    window.addEventListener("wheel", onDocumentMouseWheel);
    window.addEventListener("mousemove", onDocumentMouseMove);

    const animate = () => {
      requestAnimationFrame(animate);
      renderer.render(scene, camera);
    };

    animate();

    const threejsContainerRefState = threejsContainerRef.current;
    disableBodyScroll(containerRef.current);

    return () => {
      window.removeEventListener("wheel", onDocumentMouseWheel);
      clearAllBodyScrollLocks();

      if (!threejsContainerRefState) {
        return;
      }

      threejsContainerRefState.removeChild(renderer.domElement);
    };
  }, [fovMAX, fovMIN, height, width]);

  const onMove = useCallback(
    (currX: number, currY: number) => {
      if (camera && width) {
        camera.position.z -= (touchStartCoord.y - currY) * 0.5;
        camera.position.z = Math.max(Math.min(camera.position.z, fovMAX), fovMIN);
        camera.position.x += ((touchStartCoord.x - currX) / width) * X_MAX_MOBILE * 2;
        camera.position.x = Math.max(Math.min(camera.position.x, X_MAX_MOBILE), -X_MAX_MOBILE);

        setTouchStartCoord({ x: currX, y: currY });
      }
    },
    [camera, fovMIN, touchStartCoord.x, touchStartCoord.y, width]
  );

  const touchStart = useCallback((evt: TouchEvent<HTMLDivElement>) => {
    setTouchStartCoord({ x: evt.touches[0].clientX, y: evt.touches[0].clientY });
  }, []);

  const touchMove = useCallback(
    (evt: TouchEvent<HTMLDivElement>) => {
      onMove(evt.touches[0].clientX, evt.touches[0].clientY);
    },
    [onMove]
  );

  return (
    <div ref={containerRef} className={styles["container"]} onTouchStart={touchStart} onTouchMove={touchMove}>
      <motion.div
        ref={threejsContainerRef}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.5 }}
        className={styles["threejs-container"]}
      />
    </div>
  );
};

export default History;
