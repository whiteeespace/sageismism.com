import { MenuItem } from ".";
import Logo from "./Logo";
import styles from "./styles.module.scss";
import Cart from "../Cart";
import { MobileMenu } from "../MobileMenu";

interface Props {
  menuItems: MenuItem[];
}

export const MobileNavbar: React.FC<Props> = ({ menuItems }) => {
  return (
    <div className={styles["header-mobile"]}>
      <div className={styles["button-container"]}>
        <MobileMenu menuItems={menuItems} className={styles["menu-button"]} />
        <Cart className={styles["menu-button"]} />
      </div>
      <Logo />
    </div>
  );
};
