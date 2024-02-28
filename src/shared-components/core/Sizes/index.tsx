import { RadioGroup } from "@headlessui/react";
import classNames from "classnames";
import { ProductVariant } from "gql/graphql";
import { PropsWithChildren } from "react";

import styles from "./Sizes.module.scss";

interface ProductSizesProps {
  value: ProductVariant | undefined;
  onChange?: (value: ProductVariant) => void;
}

export const ProductSizes: React.FC<ProductSizesProps & PropsWithChildren> = ({
  value,
  onChange,
  children,
}) => {
  return (
    <RadioGroup className={styles["product-sizes"]} value={value} onChange={onChange}>
      {children}
    </RadioGroup>
  );
};

interface SizeProps {
  label: string;
  value: ProductVariant;
  disabled?: boolean;
}

export const Size: React.FC<SizeProps> = ({ label, value, disabled }) => (
  <RadioGroup.Option value={value} disabled={disabled}>
    {({ checked }) => (
      <span
        className={classNames(styles["option"], {
          [styles["option--disabled"]]: disabled,
          [styles["option--checked"]]: !disabled && checked,
        })}
      >
        {label}
      </span>
    )}
  </RadioGroup.Option>
);
