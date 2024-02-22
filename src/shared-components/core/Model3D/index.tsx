import classNames from "classnames";
import React, { useCallback, useEffect, useRef, useState, TouchEvent, MouseEvent } from "react";
import { Gender } from "utils/types/gender";

import styles from "./Model3D.module.scss";

const SPEED_FACTOR = 25;

interface Props {
  images: string[];
  height?: string;
  size?: string;
  name?: string;
  gender?: Gender;
  className?: string;
}

const Model3D: React.FC<Props> = ({ images, height, size, gender, className }) => {
  const [percentLoaded, setPercentLoaded] = useState(0);
  const [isMoving, setIsMoving] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [startX, setStartX] = useState(0);
  const [canvasSize, setCanvasSize] = useState({ width: 0, height: 0 });
  const [activeIndex, setActiveIndex] = useState(-1);
  const [preloadedImages, setPreloadedImages] = useState<HTMLImageElement[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const onImageLoad = () => {
      setPercentLoaded((curr) => curr + (1 / images.length) * 100);
    };

    const preloadImages = (imagesToLoad: string[]) => {
      imagesToLoad.forEach((image) => {
        const img = new Image();
        img.src = `${image}&width=400`;
        img.onload = onImageLoad;
        img.onerror = onImageLoad;
        setPreloadedImages((prev) => [...prev, img]);
      });
    };

    setPreloadedImages([]);
    preloadImages(images);
  }, [images]);

  const drawLabel = useCallback(() => {
    if (gender === Gender.MAN) {
      return { start: { x: 80, y: 30 }, middle: { x: 100, y: 30 }, end: { x: 125, y: 80 } };
    } else if (gender === Gender.WOMAN) {
      return { start: { x: 80, y: 125 }, middle: { x: 100, y: 125 }, end: { x: 125, y: 175 } };
    }
  }, [gender]);

  useEffect(() => {
    try {
      const ctx = canvasRef.current?.getContext("2d");
      const currentImage = preloadedImages[activeIndex];

      if (ctx && currentImage) {
        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
        ctx.drawImage(currentImage, 0, 0, ctx.canvas.width, ctx.canvas.height);
        ctx.font = "16px Montserrat";
        const labelData = drawLabel();

        if (!isMoving && height && size && labelData) {
          ctx.fillText(`${height} wearing`, 0, labelData.start.y - 16);
          ctx.fillText(size, 0, labelData.start.y + 5);

          ctx.beginPath();
          ctx.moveTo(labelData.start.x, labelData.start.y);
          ctx.lineTo(labelData.middle.x, labelData.middle.y);
          ctx.lineTo(labelData.end.x, labelData.end.y);
          ctx.strokeStyle = "black";
          ctx.lineWidth = 1;
          ctx.stroke();
        }
      }
    } catch (e) {
      console.log(e);
    }
  }, [activeIndex, drawLabel, height, isMoving, preloadedImages, size]);

  const moveActiveIndex = useCallback(
    (itemsSkipped: number) => {
      setActiveIndex((prev) => {
        const n = preloadedImages.length;
        const newIndex = (((prev + itemsSkipped) % n) + n) % n;
        return newIndex;
      });
    },
    [preloadedImages]
  );

  const onMove = useCallback(
    (pageX: number) => {
      if (Math.abs(pageX - startX) > SPEED_FACTOR) {
        setStartX(pageX);
        moveActiveIndex(pageX - startX > 0 ? -1 : 1);
      }
    },
    [moveActiveIndex, startX]
  );

  const startMoving = (evt: MouseEvent<HTMLDivElement>) => {
    setIsMoving(true);
    setStartX(evt.clientX);
    containerRef.current!.style.cursor = "grabbing";
  };

  const doMoving = (evt: MouseEvent<HTMLDivElement>) => {
    if (isMoving) {
      onMove(evt.clientX);
    }
  };

  const stopMoving = () => {
    setIsMoving(false);
    setStartX(0);
    containerRef.current!.style.cursor = "grab";
  };

  const touchStart = (evt: TouchEvent<HTMLDivElement>) => {
    setIsMoving(true);
    setStartX(evt.touches[0].clientX);
  };

  const touchMove = (evt: TouchEvent<HTMLDivElement>) => {
    onMove(evt.touches[0].clientX);
  };

  const touchEnd = () => {
    setIsMoving(false);
    setStartX(0);
  };

  const handleResize = useCallback(() => {
    const containerRefVar = containerRef.current!;
    const ratio = preloadedImages[0].width / preloadedImages[0].height;
    containerRefVar.style.height = `${containerRefVar.clientWidth / ratio}px`;
  }, [preloadedImages]);

  useEffect(() => {
    if (percentLoaded % 100 === 0 && percentLoaded !== 0 && preloadedImages.length !== 0) {
      handleResize();
      setCanvasSize({ width: preloadedImages[0].width, height: preloadedImages[0].height });
      setActiveIndex(0);
      setIsLoaded(true);
      setPercentLoaded(0);
    }
  }, [handleResize, percentLoaded, preloadedImages]);

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [handleResize]);

  return (
    <div
      ref={containerRef}
      className={classNames(styles["container"], className)}
      onTouchStart={touchStart}
      onTouchMove={touchMove}
      onTouchEnd={touchEnd}
      onMouseDown={startMoving}
      onMouseMove={doMoving}
      onMouseUp={stopMoving}
    >
      {isLoaded ? (
        <canvas
          className={styles["canvas"]}
          width={canvasSize.width}
          height={canvasSize.height}
          ref={canvasRef}
        />
      ) : (
        `loading view...`
      )}
    </div>
  );
};

export default Model3D;
