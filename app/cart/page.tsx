"use client";

import { XCircle } from "@phosphor-icons/react";
import {
  useCart,
  CartLineProvider,
  useCartLine,
  CartCheckoutButton,
  CartLineQuantityAdjustButton,
  Money,
} from "@whiteeespace/core";
import { motion } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

import Button from "@/components/shared/Button";

import DraggableItem from "./DraggableItem";
import styles from "./styles.module.scss";

const CartLine = () => {
  const { quantity, merchandise } = useCartLine();

  return (
    <div className={styles["line"]}>
      {quantity} x {merchandise?.title} - {merchandise?.product?.title}
      <CartLineQuantityAdjustButton // @ts-expect-error typing issues with shopify
        as={Button}
        variant={"secondary"}
        adjust="decrease"
        className={styles["close"]}
      >
        <XCircle size={20} />
      </CartLineQuantityAdjustButton>
    </div>
  );
};

const CartPage = () => {
  const router = useRouter();
  const { lines, cost } = useCart();
  const boundRef = useRef(null);
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    if (!lines?.length) return;
    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        if (entry.contentRect) {
          setWidth(entry.contentRect.width);
          setHeight(entry.contentRect.height);
        }
      }
    });

    if (boundRef.current) {
      resizeObserver.observe(boundRef.current);
    }

    const boundRefCurrent = boundRef.current;
    return () => resizeObserver.unobserve(boundRefCurrent!);
  }, [lines?.length]);

  const isEmpty = !lines?.length;

  if (!lines) {
    return <></>;
  }

  if (isEmpty) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className={styles["empty-cart"]}
      >
        <p>Your cart is currently empty.</p>
        <Button variant="primary" onClick={() => router.push("/shop")}>
          Continue Shopping
        </Button>
      </motion.div>
    );
  }

  return (
    <div className={styles["container"]}>
      <div ref={boundRef} className={styles["cart-images"]}>
        {height > 0 &&
          width > 0 &&
          lines?.map((item, idx) =>
            Array.from(Array(item?.quantity).keys()).map((_, index) => (
              <DraggableItem
                id={item?.id ?? ""}
                key={item?.id}
                index={idx + index}
                totalNumber={lines.reduce((acc, line) => acc + (line?.quantity ?? 0), 0)}
                src={item?.merchandise?.image?.url ?? ""}
                maxX={width}
                maxY={height}
              />
            ))
          )}
      </div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className={styles["cart-items"]}
      >
        <div className={styles["button-container"]}>
          <Link className={styles["link"]} href="/policies">
            customer care
          </Link>
          <CartCheckoutButton // @ts-expect-error typing issues with shopify
            as={Button}
            variant="primary"
          >
            checkout
          </CartCheckoutButton>
        </div>
        <p className={styles["info"]}>
          <div className={styles["lines"]}>
            {lines.map((line) => (
              <CartLineProvider key={line?.id} line={line!}>
                <CartLine />
              </CartLineProvider>
            ))}
          </div>
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className={styles["cart-actions"]}
      >
        <div className={styles["price"]}>
          <p>total:</p>
          <Money
            className={styles["amount"]}
            data={cost?.totalAmount ?? { amount: "0", currencyCode: "CAD" }}
            withoutTrailingZeros
          />
        </div>
      </motion.div>
      <p className={styles["free-shipping"]}>* free shipping in Canada and US on orders over $75</p>
    </div>
  );
};

export default CartPage;
