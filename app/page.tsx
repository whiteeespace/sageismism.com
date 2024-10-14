import Timer from "@/components/custom/Timer";

import styles from "./styles.module.scss";

const HomePage: React.FC = () => {
  return (
    <div className={styles["container"]}>
      <Timer targetDate={new Date("2024-10-17T17:00:00")} />
      <div className={styles["text-container"]}>
        <p>* &quot;New Horizon&quot; collection dropping October 17th.</p>
      </div>
    </div>
  );
};

export default HomePage;
