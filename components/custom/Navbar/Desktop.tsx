import Image from "next/image";
import Link from "next/link";

import Button from "@/components/shared/Button";

import { MenuItem } from ".";
import loadingLogo from "./images/loading-logo.png";
import logo from "./images/logo.gif";
import styles from "./styles.module.scss";
import Cart from "../Cart";

interface Props {
  menuItems: MenuItem[];
}

export const DesktopNavbar: React.FC<Props> = ({ menuItems }) => {
  return (
    <nav className={styles["header-desktop"]}>
      <Link href={"/"}>
        <Image
          src={logo}
          alt={"logo"}
          placeholder={"blur"}
          blurDataURL={loadingLogo.src}
          priority
          className={styles["logo"]}
        />
      </Link>
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
