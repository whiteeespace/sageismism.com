import Link from "next/link";

import Button from "@/components/shared/Button";

import styles from "./styles.module.scss";

export default function NotFound() {
  return (
    <div className={styles["error-container"]}>
      <h1>404 Not Found</h1>
      <p>The page you are looking for does not exist.</p>
      <Link href="/" className={styles["button-container"]}>
        <Button variant="primary">Return Home</Button>
      </Link>
    </div>
  );
}
