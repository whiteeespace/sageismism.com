"use client";

import { useCart } from "@whiteeespace/core";
import { useRouter } from "next/navigation";

import Button from "@/components/shared/Button";

import styles from "./styles.module.scss";

interface Props {
  className?: string;
}

const Cart: React.FC<Props> = ({ className }) => {
  const router = useRouter();
  const { totalQuantity } = useCart();

  const showQuantity = totalQuantity !== undefined && totalQuantity > 0;

  return (
    <div className={styles["cart-container"]}>
      <Button variant="secondary" className={className} onClick={() => router.push("/cart")}>
        Cart
      </Button>
      {showQuantity && <div className={styles["count"]}>{totalQuantity}</div>}
    </div>
  );
};

export default Cart;
