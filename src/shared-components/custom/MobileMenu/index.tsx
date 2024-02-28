import { Popover, Transition } from "@headlessui/react";
import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import Button from "shared-components/core/Button";

import styles from "./MobileMenu.module.scss";
import { MenuItem } from "../Navbar";

interface Props {
  menuItems: MenuItem[];
  className?: string;
}

export const MobileMenu: React.FC<Props> = ({ menuItems, className }) => (
  <Popover>
    <Popover.Button className={className} as={Button} variant="secondary">
      menu
    </Popover.Button>
    <Popover.Overlay className={styles["overlay"]} />
    <Transition
      as={Fragment}
      enter={styles["panel--animate"]}
      enterFrom={styles["panel--animate-from"]}
      enterTo={styles["panel--animate-to"]}
      leave={styles["panel--animate"]}
      leaveFrom={styles["panel--animate-to"]}
      leaveTo={styles["panel--animate-from"]}
    >
      <Popover.Panel className={styles["panel"]}>
        <div className={styles["logos"]}>
          <Popover.Button as={Link} className={styles["link"]} to={"/"}>
            <img src={"/images/loader.gif"} alt={"logo"} className={styles["logo"]} />
          </Popover.Button>
          <Popover.Button as={Link} className={styles["link"]} to={"/"}>
            <img src={"/images/loader.gif"} alt={"logo"} className={styles["logo"]} />
          </Popover.Button>
        </div>
        <div className={styles["navigation"]}>
          {menuItems.map(
            (item) =>
              !item.disabled && (
                <Popover.Button as={Link} className={styles["link"]} to={item.to}>
                  <h2 className={styles["link--text"]}>{item.title} ←</h2>
                </Popover.Button>
              )
          )}
        </div>
        <div className={styles["links"]}>
          {/* <Popover.Button as={Link} className={styles["drawer--link"]} to={"/contact"}>
            <h2 className={styles["drawer--link--sub-text"]}>{"contact"}</h2>
          </Popover.Button> */}
          <Popover.Button as={Link} className={styles["link"]} to={"/policies"}>
            <h2 className={styles["link--sub-text"]}>terms & conditions</h2>
          </Popover.Button>
          <a href="https://www.instagram.com/sageismism/" target="_blank" className={styles["link"]}>
            <p className={styles["link--sub-text"]}>instagram</p>
          </a>
        </div>
      </Popover.Panel>
    </Transition>
  </Popover>
);
