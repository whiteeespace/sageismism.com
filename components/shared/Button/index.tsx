import classNames from "classnames";
import { forwardRef } from "react";

import styles from "./styles.module.scss";

interface Props {
  onClick?: () => void;
  variant?: "primary" | "secondary" | "tertiary" | "link";
  disabled?: boolean;
  className?: string;
  active?: boolean;
  type?: "button" | "submit" | "reset" | undefined;
}

const Button = forwardRef<HTMLButtonElement, Props & React.HTMLProps<HTMLButtonElement>>(
  (
    { onClick, disabled, className, variant = "primary", active, children, type = "button", ...props },
    ref
  ) => (
    <button
      ref={ref}
      className={classNames(
        styles["button"],
        styles[`button--${variant}`],
        { [styles["active"]]: active },
        className
      )}
      type={type}
      onClick={onClick}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  )
);

Button.displayName = "Button";

export default Button;
