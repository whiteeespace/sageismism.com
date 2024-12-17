import Link from "next/link";

import Button from "@components/Button";

import styles from "./styles.module.scss";

const HomePage: React.FC = () => {
  return (
    <div className={styles["container"]}>
      {/* <Timer targetDate={new Date("2024-10-17T21:00:00")} className={styles["timer"]} /> */}
      <Link href="/shop">
        <video autoPlay muted loop playsInline poster={"/fw24/poster-v2.png"} className={styles["video"]}>
          <source src="/fw24/360-v2.mp4" type="video/mp4" />
        </video>
      </Link>

      <div className={styles["text-container"]}>
        <p className={styles["text"]}>&quot;Cozy Year End&quot; capsule now live.</p>
        <Link href="/shop">
          <Button variant="tertiary">Shop Now</Button>
        </Link>
      </div>
    </div>
  );
};

export default HomePage;
