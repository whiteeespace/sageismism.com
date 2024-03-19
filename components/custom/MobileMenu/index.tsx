"use client";

import { Popover, Transition } from "@headlessui/react";
import Image from "next/image";
import Link from "next/link";
import React, { Fragment } from "react";

import Button from "@/components/shared/Button";

import loader from "./images/loader.gif";
import styles from "./styles.module.scss";
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
          <Popover.Button as={Link} className={styles["link"]} href={"/"}>
            <Image src={loader} placeholder="blur" alt={"logo"} className={styles["logo"]} />
          </Popover.Button>
          <Popover.Button as={Link} className={styles["link"]} href={"/"}>
            <Image src={loader} placeholder="blur" alt={"logo"} className={styles["logo"]} />
          </Popover.Button>
        </div>
        <div className={styles["navigation"]}>
          {menuItems.map(
            (item) =>
              !item.disabled && (
                <Popover.Button key={item.title} as={Link} className={styles["link"]} href={item.to}>
                  <h2 className={styles["link--text"]}>{item.title} ←</h2>
                </Popover.Button>
              )
          )}
        </div>
        <div className={styles["links"]}>
          {/* <Popover.Button as={Link} className={styles["drawer--link"]} to={"/contact"}>
            <h2 className={styles["drawer--link--sub-text"]}>{"contact"}</h2>
          </Popover.Button> */}
          <Popover.Button as={Link} className={styles["link"]} href={"/policies"}>
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
