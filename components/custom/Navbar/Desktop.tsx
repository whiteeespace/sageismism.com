"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

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
  const router = useRouter();
  return (
    <div className={styles["header-desktop"]}>
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
          <Button
            variant="secondary"
            onClick={() => router.push(menuItem.to)}
            key={menuItem.title}
            disabled={menuItem.disabled}
          >
            <div className={styles["menu-item"]}>{menuItem.title}</div>
          </Button>
        ))}
        <Cart className={styles["menu-item"]} />
      </div>
    </div>
  );
};
