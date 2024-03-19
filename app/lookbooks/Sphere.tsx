import { motion } from "framer-motion";
import Link from "next/link";
import { useEffect, useRef } from "react";
import * as THREE from "three";

import styles from "./styles.module.scss";

interface Props {
  handle: string;
  src: string;
}

const Sphere: React.FC<Props> = ({ handle, src }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) {
      return;
    }

    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
    camera.position.z = 90;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    const size = 250;
    renderer.setSize(size, size);
    containerRef.current.appendChild(renderer.domElement);

    const texture = new THREE.TextureLoader().load(src);
    const sphere = new THREE.SphereGeometry(50, 64, 32);
    sphere.computeVertexNormals();
    const sphereMaterial = new THREE.MeshBasicMaterial({
      map: texture,
    });
    const sphereMesh = new THREE.Mesh(sphere, sphereMaterial);
    scene.add(sphereMesh);

    const randomX = 0.001 * Math.random() + 0.005;
    const randomY = 0.001 * Math.random() + 0.005;

    const animate = () => {
      requestAnimationFrame(animate);
      sphereMesh.rotation.x += randomX;
      sphereMesh.rotation.y += randomY;
      renderer.render(scene, camera);
    };

    animate();

    const containerRefState = containerRef.current;

    return () => {
      if (!containerRefState) {
        return;
      }

      containerRefState.removeChild(renderer.domElement);
    };
  }, [src]);

  return (
    <Link href={`/lookbook/${handle}`}>
      <motion.div
        ref={containerRef}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        whileHover={{ scale: 1.2 }}
        className={styles["sphere"]}
      />
    </Link>
  );
};

export default Sphere;
