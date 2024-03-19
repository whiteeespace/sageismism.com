import { Dialog } from "@headlessui/react";
import { Image } from "@whiteeespace/core";
import { Carousel } from "react-responsive-carousel";

import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import styles from "./DetailsDialog.module.scss";

interface Props {
  images: string[];
  openAt: number;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

const DetailsDialog: React.FC<Props> = ({ images, openAt, isOpen, setIsOpen }) => {
  function closeModal() {
    setIsOpen(false);
  }

  return (
    <Dialog open={isOpen} as="div" className={styles["dialog-container"]} onClose={closeModal}>
      <div className={styles["backdrop"]} />
      <div className={styles["dialog"]}>
        <div className={styles["dialog-content"]}>
          <Dialog.Panel className={styles["dialog-panel"]}>
            <Carousel
              showStatus={false}
              width={"100%"}
              showThumbs={false}
              selectedItem={openAt}
              showIndicators={true}
              showArrows={false}
              emulateTouch
              useKeyboardArrows
              infiniteLoop
            >
              {images?.map((image, ind) => (
                <div className={styles["image-container"]} key={`detail ${ind}`}>
                  <Image src={`${image}&width=800`} alt={`detail ${ind}`} />
                </div>
              ))}
            </Carousel>
            <div>swipe left or right</div>
          </Dialog.Panel>
        </div>
      </div>
    </Dialog>
  );
};

export default DetailsDialog;
