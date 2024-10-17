"use client";

import { X } from "@phosphor-icons/react/dist/ssr";
import * as RadixDialog from "@radix-ui/react-dialog";
import classNames from "classnames";
import React, { ComponentProps, PropsWithChildren } from "react";

import styles from "./styles.module.scss";

interface DialogRootProps extends ComponentProps<typeof RadixDialog.Root> {}
const DialogRoot: React.FC<DialogRootProps> = (props) => <RadixDialog.Root {...props} modal />;

type DialogTriggerElement = React.ElementRef<typeof RadixDialog.Trigger>;
interface DialogTriggerProps extends ComponentProps<typeof RadixDialog.Trigger> {}

const DialogTrigger = React.forwardRef<DialogTriggerElement, DialogTriggerProps>(
  ({ children, ...props }, forwardedRef) => (
    <RadixDialog.Trigger {...props} ref={forwardedRef} asChild>
      {children}
    </RadixDialog.Trigger>
  )
);

type DialogRootElement = React.ElementRef<typeof RadixDialog.Content>;
interface DialogContentProps extends ComponentProps<typeof RadixDialog.Content> {
  className?: string;
}

const DialogContent = React.forwardRef<DialogRootElement, DialogContentProps>(
  ({ className, children, ...props }, forwardedRef) => (
    <RadixDialog.Portal>
      <RadixDialog.Overlay className={styles["overlay"]} />
      <RadixDialog.Content {...props} ref={forwardedRef} className={classNames(styles["content"], className)}>
        {children}
        <RadixDialog.Close className={styles["close"]} aria-label="Close">
          <X size={18} />
        </RadixDialog.Close>
      </RadixDialog.Content>
    </RadixDialog.Portal>
  )
);

interface DialogCloseProps extends ComponentProps<typeof RadixDialog.Close> {}
const DialogClose: React.FC<DialogCloseProps> = (props) => <RadixDialog.Close {...props} asChild />;

interface DialogHeaderProps {
  title: string;
}
const DialogHeader: React.FC<DialogHeaderProps> = ({ title }) => (
  <RadixDialog.Title className={styles["title"]}>{title}</RadixDialog.Title>
);

interface DialogBodyProps {
  clasName?: string;
}
const DialogBody: React.FC<PropsWithChildren<DialogBodyProps>> = ({ clasName, children }) => (
  <div className={classNames(styles["content-body"], clasName)}>{children}</div>
);

interface DialogActionButtonsProps {
  formId?: string;
  actionType?: "submit" | "button";
  isLoading?: boolean;
  onClick?: () => void;
  actionText?: string;
}

interface DialogDescriptionProps extends ComponentProps<typeof RadixDialog.Description> {}
export const DialogDescription: React.FC<DialogDescriptionProps> = (props) => (
  <RadixDialog.Description {...props} className={styles["description"]} />
);

DialogRoot.displayName = "Dialog.Root";
DialogTrigger.displayName = "Dialog.Trigger";
DialogContent.displayName = "Dialog.Content";
DialogClose.displayName = "Dialog.Close";
DialogHeader.displayName = "Dialog.Header";
DialogBody.displayName = "Dialog.Body";
DialogDescription.displayName = "Dialog.Description";

export {
  DialogRoot as Root,
  DialogTrigger as Trigger,
  DialogContent as Content,
  DialogClose as Close,
  DialogHeader as Header,
  DialogBody as Body,
  DialogDescription as Description,
};

export type {
  DialogRootProps as RootProps,
  DialogTriggerProps as TriggerProps,
  DialogContentProps as ContentProps,
  DialogCloseProps as CloseProps,
  DialogHeaderProps as HeaderProps,
  DialogActionButtonsProps as ActionButtonsProps,
  DialogBodyProps as BodyProps,
  DialogDescriptionProps as DescriptionProps,
};
