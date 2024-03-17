import { useCart } from "@whiteeespace/core";
import { useNavigate } from "react-router-dom";
import Button from "shared-components/core/Button";

import styles from "./Cart.module.scss";

interface Props {
  className?: string;
}

const Cart: React.FC<Props> = ({ className }) => {
  const navigate = useNavigate();
  const { totalQuantity } = useCart();

  const showQuantity = totalQuantity !== undefined && totalQuantity > 0;

  return (
    <div className={styles["cart-container"]}>
      <Button variant="secondary" className={className} onClick={() => navigate("/cart")}>
        cart
      </Button>
      {showQuantity && <div className={styles["count"]}>{totalQuantity}</div>}
    </div>
  );
};

export default Cart;
