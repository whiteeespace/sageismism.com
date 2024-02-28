import { motion } from "framer-motion";

import styles from "./StockistsPage.module.scss";

const STOCKISTS = [
  {
    name: "Club Theos",
    website: "https://clubtheos.com/",
    address: "1134-a Mont-Royal Ave E, Montreal QC, H2J 1X8",
  },
  {
    name: "Off The Hook",
    website: "https://offthehook.ca/",
    address: "1021 Saint-Catherine St W, Montreal QC, H3B 1H1",
  },
];

const StockistsPage: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      className={styles["container"]}
    >
      <div className={styles["locations"]}>
        {STOCKISTS.map((stockist) => (
          <>
            <a href={stockist.website} target="_blank">
              <h2 className={styles["store"]}>{stockist.name}</h2>
            </a>
            <p className={styles["address"]}>{stockist.address}</p>
          </>
        ))}
      </div>
    </motion.div>
  );
};

export default StockistsPage;
