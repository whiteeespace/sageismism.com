import classNames from "classnames";
import { PropsWithChildren } from "react";

import Footer from "@/components/custom/Footer";
import Navbar from "@/components/custom/Navbar";

import styles from "./styles.module.scss";
import Wrapper from "./Wrapper";

const Layout: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <Wrapper>
      <div className={classNames(styles["container"])}>
        <Navbar />
        <div className={classNames(styles["content"])}>{children}</div>
        <Footer />
      </div>
    </Wrapper>
  );
};
export default Layout;
