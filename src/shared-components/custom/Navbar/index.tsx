import { useWindowView } from "whiteeespace";

import { DesktopNavbar } from "./Desktop";
import { MobileNavbar } from "./Mobile";

const MENU = [
  { title: "shop", to: "/shop" },
  { title: "lookbooks", to: "/lookbooks" },
  { title: "stockists", to: "/stockists" },
];

export interface MenuItem {
  title: string;
  to: string;
  disabled?: boolean;
}

const Navbar = () => {
  const { isTabletOrMobile } = useWindowView();
  return isTabletOrMobile ? <MobileNavbar menuItems={MENU} /> : <DesktopNavbar menuItems={MENU} />;
};

export default Navbar;
