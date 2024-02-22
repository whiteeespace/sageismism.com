import { Link } from "react-router-dom";
import { useWindowView } from "whiteeespace";

import styles from "./Footer.module.scss";

const Footer: React.FC = () => {
  const { isMobile } = useWindowView();

  return (
    <div className={styles["container"]}>
      <div>
        <h3 className={styles["copyright"]}>© sageism {new Date().getFullYear()}</h3>
      </div>
      <div className={styles["details"]}>
        {!isMobile && (
          <>
            <Link className={styles["link"]} to="/contact">
              contact us
            </Link>
            <Link className={styles["link"]} to="/terms">
              terms & conditions
            </Link>
          </>
        )}
        <a href="https://www.instagram.com/sageismism/" target="_blank" rel="noopener noreferrer">
          <p className={styles["link"]}>instagram</p>
        </a>
      </div>
    </div>
  );
};

export default Footer;
