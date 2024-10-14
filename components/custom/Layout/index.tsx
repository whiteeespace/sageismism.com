import { PropsWithChildren } from "react";

import Footer from "@/components/custom/Footer";
import Navbar from "@/components/custom/Navbar";

import styles from "./styles.module.scss";
import Wrapper from "./Wrapper";

const Layout: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <Wrapper>
      <Navbar />
      <main className={styles["container"]}>{children}</main>
      <Footer />
    </Wrapper>
  );
};
export default Layout;
