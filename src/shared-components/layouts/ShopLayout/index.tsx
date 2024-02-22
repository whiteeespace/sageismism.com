import classNames from "classnames";
import { Outlet } from "react-router-dom";
import Footer from "shared-components/custom/Footer";
import Navbar from "shared-components/custom/Navbar";

import styles from "./ShopLayout.module.scss";

const ShopLayout: React.FC = () => {
  return (
    <div className={classNames(styles["container"])}>
      <Navbar />
      <div className={classNames(styles["content"])}>
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};
export default ShopLayout;
