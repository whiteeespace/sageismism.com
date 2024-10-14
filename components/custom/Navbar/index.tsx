import { DesktopNavbar } from "./Desktop";
import { MobileNavbar } from "./Mobile";

const MENU = [
  { title: "Shop", to: "/shop" },
  { title: "Lookbooks", to: "/lookbooks" },
  { title: "About us", to: "/about-us" },
];

export interface MenuItem {
  title: string;
  to: string;
  disabled?: boolean;
}

const Navbar = () => {
  return (
    <>
      <MobileNavbar menuItems={MENU} />
      <DesktopNavbar menuItems={MENU} />
    </>
  );
};

export default Navbar;
