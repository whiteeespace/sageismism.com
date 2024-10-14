import * as RadioGroup from "@radix-ui/react-radio-group";
import classNames from "classnames";
import { PropsWithChildren } from "react";

import styles from "./styles.module.scss";

interface SizeRadioGroupProps extends RadioGroup.RadioGroupProps {
  className?: string;
}

interface SizeRadioProps {
  value: string;
  disabled?: boolean;
}

export const SizeRadioGroup: React.FC<PropsWithChildren<SizeRadioGroupProps>> = ({
  children,
  className,
  ...restOfProps
}) => (
  <RadioGroup.Root className={classNames(styles["root"], className)} {...restOfProps}>
    {children}
  </RadioGroup.Root>
);

export const SizeRadio: React.FC<PropsWithChildren<SizeRadioProps>> = ({ value, disabled, children }) => (
  <RadioGroup.Item
    value={value}
    disabled={disabled}
    className={classNames(styles["item"], {
      [styles["item--disabled"]]: disabled,
    })}
  >
    {children}
  </RadioGroup.Item>
);
