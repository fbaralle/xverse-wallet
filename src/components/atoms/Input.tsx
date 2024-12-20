import { classMerge } from "@/helpers/classMerge";
import React from "react";
import Text from "./Text";

const inputVariantClasses = {
  invalid:
    "box-border ring-0 font-light border-button-destructive-border dark:bg-background-popout outline-none bg-red-100 placeholder:text-text-disabled text-text-subdued focus:outline-none focus:ring-0 focus:ring-text-link focus:border-button-destructive-border rounded-lg px-4 py-3 text-xs lg:text-sm w-full box-border",
  default:
    "box-border ring-0 border font-light border-border-primary bg-background-text-input placeholder:text-text-disabled text-text-default focus:outline-none focus:ring-0 focus:ring-text-link rounded-lg px-4 py-3 text-xs lg:text-sm w-full box-border",
};

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  containerClassName?: string;
  variant?: keyof typeof inputVariantClasses;
  errorMsg?: string;
}

export const Input = React.forwardRef<HTMLInputElement, Props>(
  (
    {
      className,
      containerClassName,
      variant = "default",
      type = "text",
      value,
      errorMsg,
      ...inputProps
    },
    ref
  ) => (
    <span
      className={classMerge(
        "flex flex-col justify-start align-middle",
        containerClassName
      )}
    >
      <input
        {...inputProps}
        ref={ref}
        type={type}
        value={value}
        className={classMerge(inputVariantClasses[variant], className)}
      />
      {errorMsg && (
        <Text variant="p" className="text-text-destructive pt-3">
          {errorMsg}
        </Text>
      )}
    </span>
  )
);
