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
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";

import Button from "@/components/shared/Button";

import DraggableItem from "./DraggableItem";
import styles from "./styles.module.scss";

const CartLine = () => {
  const { merchandise } = useCartLine();

  console.log(merchandise?.id);

  return (
    <div className={styles["line"]}>
      {merchandise?.title} - {merchandise?.product?.title}
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
  const { lines, linesRemove, cost } = useCart();
  const boundRef = useRef(null);
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);

  useEffect(() => {
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
  }, []);

  const isEmpty = !lines?.length;

  const clearCart = useCallback(async () => {
    linesRemove(lines?.map((line) => line?.id ?? "") ?? []);
  }, [lines, linesRemove]);

  return (
    <div className={styles["container"]}>
      <div ref={boundRef} className={styles["cart-images"]}>
        {height > 0 &&
          width > 0 &&
          lines?.map((item, idx) => (
            <DraggableItem
              id={item?.id ?? ""}
              key={item?.id}
              index={idx}
              totalNumber={lines.length}
              src={item?.merchandise?.image?.url ?? ""}
              maxX={width}
              maxY={height}
            />
          ))}
      </div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className={styles["cart-items"]}
      >
        <h1 className={styles["title"]}>shopping cart</h1>
        <p className={styles["info"]}>
          {isEmpty ? (
            "your cart is currently empty"
          ) : (
            <div className={styles["lines"]}>
              {lines.map((line) => (
                <CartLineProvider key={line?.id} line={line!}>
                  <CartLine />
                </CartLineProvider>
              ))}
            </div>
          )}
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
          />
        </div>
        {isEmpty ? (
          <Button variant="primary" onClick={() => router.push("/shop")}>
            continue shopping
          </Button>
        ) : (
          <div className={styles["button-container"]}>
            <Button variant="primary" onClick={clearCart}>
              clear
            </Button>
            <CartCheckoutButton // @ts-expect-error typing issues with shopify
              as={Button}
              variant="primary"
            >
              checkout
            </CartCheckoutButton>
          </div>
        )}
      </motion.div>
      <p className={styles["free-shipping"]}>
        free shipping in Canada on orders over $69 and US on orders over $99
      </p>
    </div>
  );
};

export default CartPage;
