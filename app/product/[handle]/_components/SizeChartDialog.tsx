"use client";

import React, { useState } from "react";

import { SizeChart } from "@/components/custom/SizeChart";
import Button from "@components/Button";
import * as Dialog from "@components/Dialog";

import { SizeChartData } from "./ProductView";
import styles from "../styles.module.scss";

interface SizeChartDialogProps {
  sizeChartData?: SizeChartData[];
}
const SizeChartDialog: React.FC<SizeChartDialogProps> = ({ sizeChartData }) => {
  const [open, setOpen] = useState(false);

  if (!sizeChartData) {
    return null;
  }

  return (
    <Dialog.Root open={open} onOpenChange={setOpen} aria-describedby={"Size Guide"}>
      <Dialog.Trigger>
        <Button className={styles["size-guide-button"]} variant="link">
          View size guide
        </Button>
      </Dialog.Trigger>
      <Dialog.Content>
        <Dialog.Header title={"Size guide"} />
        <Dialog.Description>{"Size guide"}</Dialog.Description>
        <Dialog.Body>
          <SizeChart sizeChartData={sizeChartData} />
        </Dialog.Body>
      </Dialog.Content>
    </Dialog.Root>
  );
};

export default SizeChartDialog;
