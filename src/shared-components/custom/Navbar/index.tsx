import { useWindowView } from "whiteeespace";

import { DesktopNavbar } from "./Desktop";
import { MobileNavbar } from "./Mobile";

const MENU = [
  { title: "shop", to: "/shop" },
  { title: "lookbook", to: "/lookbook" },
  { title: "stockists", to: "/stockists" },
  { title: "cart", to: "/cart" },
];

const Navbar = () => {
  const { isTabletOrMobile } = useWindowView();
  return isTabletOrMobile ? <MobileNavbar menuItems={MENU} /> : <DesktopNavbar menuItems={MENU} />;
};

export default Navbar;
