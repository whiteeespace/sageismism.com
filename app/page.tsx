import Link from "next/link";

import Button from "@components/Button";

import styles from "./styles.module.scss";

const HomePage: React.FC = () => {
  return (
    <div className={styles["container"]}>
      {/* <Timer targetDate={new Date("2024-10-17T21:00:00")} className={styles["timer"]} /> */}
      <video autoPlay muted loop playsInline poster={"/fw24/poster.png"} className={styles["video"]}>
        <source src="/fw24/360.mp4" type="video/mp4" />
      </video>

      <div className={styles["text-container"]}>
        <p className={styles["text"]}>&quot;New Horizon&quot; collection now live.</p>
        <Link href="/shop">
          <Button variant="tertiary">Shop Now</Button>
        </Link>
      </div>
    </div>
  );
};

export default HomePage;
