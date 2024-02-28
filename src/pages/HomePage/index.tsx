import { disableBodyScroll, clearAllBodyScrollLocks } from "body-scroll-lock";
import { motion } from "framer-motion";
import _ from "lodash";
import { useEffect, useRef, useState, TouchEvent, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import * as THREE from "three";
import { seededRandom } from "three/src/math/MathUtils";
import { useWindowView } from "whiteeespace";

import styles from "./HomePage.module.scss";

const X_MAX = 4;
const X_MAX_MOBILE = 80;

export enum ScrollDirection {
  UP,
  DOWN,
  NONE,
}

const signRandomizer = (idx: number) => (seededRandom(idx) >= 0.5 ? 1 : -1);

const HomePage: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const threejsContainerRef = useRef<HTMLDivElement>(null);
  const { isMobile } = useWindowView();
  const [touchStartCoord, setTouchStartCoord] = useState({ x: 0, y: 0 });
  const [camera, setCamera] = useState<THREE.PerspectiveCamera | null>(null);

  const navigate = useNavigate();

  const goToShop = useCallback(() => {
    navigate("/shop");
  }, [navigate]);

  const fovMAX = 60;
  const fovMIN = -400;

  useEffect(() => {
    if (!containerRef.current || !threejsContainerRef.current) {
      return;
    }

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      threejsContainerRef.current.clientWidth / threejsContainerRef.current.clientHeight,
      0.1,
      1000
    );

    setCamera(camera);
    camera.position.z = 60;

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
    });

    renderer.setSize(threejsContainerRef.current.clientWidth, threejsContainerRef.current.clientHeight);
    threejsContainerRef.current.appendChild(renderer.domElement);

    const images = _.range(29).reverse();
    images.forEach((it, idx) => {
      const loader = new THREE.TextureLoader();
      const material = new THREE.MeshBasicMaterial({
        map: loader.load(`${process.env.PUBLIC_URL}/images/home/five-year-${it}.png`),
        transparent: true,
      });

      const geometry = new THREE.PlaneGeometry(50, 50);
      const mesh = new THREE.Mesh(geometry, material);

      const modifier = -8;
      const firstSign = idx % 2 === 0 ? -1 : 1;
      mesh.position.set(
        firstSign * (seededRandom(idx + 24) * 100),
        signRandomizer(29 - idx) * seededRandom(idx + 8) * 35 + modifier,
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

      if (camera.position.z <= fovMIN + 10) {
        goToShop();
      }
    };

    const onDocumentMouseMove = (evt: MouseEvent) => {
      camera.position.x = (evt.clientX / window.innerWidth) * X_MAX * 2 - X_MAX;
      camera.position.y = -(evt.clientY / window.innerHeight) * X_MAX * 2 + X_MAX;
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
  }, [fovMAX, fovMIN, goToShop, isMobile]);

  const onMove = useCallback(
    (currX: number, currY: number) => {
      if (camera) {
        camera.position.z -= (touchStartCoord.y - currY) * 0.5;
        camera.position.z = Math.max(Math.min(camera.position.z, fovMAX), fovMIN);
        camera.position.x += ((touchStartCoord.x - currX) / window.innerWidth) * X_MAX_MOBILE * 2;
        camera.position.x = Math.max(Math.min(camera.position.x, X_MAX_MOBILE), -X_MAX_MOBILE);

        if (camera.position.z <= fovMIN + 10) {
          goToShop();
        }

        setTouchStartCoord({ x: currX, y: currY });
      }
    },
    [camera, fovMIN, goToShop, touchStartCoord.x, touchStartCoord.y]
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

export default HomePage;
