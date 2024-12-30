import Link from "next/link";

import Button from "@/components/shared/Button";

import { MenuItem } from ".";
import Logo from "./Logo";
import styles from "./styles.module.scss";
import Cart from "../Cart";

interface Props {
  menuItems: MenuItem[];
}

export const DesktopNavbar: React.FC<Props> = ({ menuItems }) => {
  return (
    <nav className={styles["header-desktop"]}>
      <Logo />
      <div className={styles["menu-container"]}>
        {menuItems.map((menuItem) => (
          <Link href={menuItem.to} key={menuItem.title}>
            <Button variant="secondary" key={menuItem.title} disabled={menuItem.disabled}>
              <div className={styles["menu-item"]}>{menuItem.title}</div>
            </Button>
          </Link>
        ))}
        <Cart className={styles["menu-item"]} />
      </div>
    </nav>
  );
};
