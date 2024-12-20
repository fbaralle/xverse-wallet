"use client";

import Text from "@/components/atoms/Text";
import { COMMON_DURATIONS, DurationsEnum } from "@/constants/time";
import { classMerge } from "@/helpers/classMerge";
import { truncateString } from "@/helpers/truncate-string";

export const revalidate = COMMON_DURATIONS[DurationsEnum.ThirtyMinutes];

const Attribute = ({
  title,
  content,
  isAttribute,
  className,
}: {
  title: string | number;
  content: string | number;
  className?: string;
  isAttribute?: boolean;
}) => {
  return (
    <div className={classMerge("flex flex-col gap-2 w-full", className)}>
      <Text variant="bodyMdMedium" className="text-text-subdued font-medium">
        {title}
      </Text>
      <Text
        variant="bodyLgMedium"
        className={classMerge(
          "text-text-default rounded-md w-full font-semibold",
          {
            ["p-2 bg-background-cellHighlight overflow-x-scroll"]: isAttribute,
            ["break-words whitespace-normal"]: !isAttribute,
          }
        )}
      >
        {!isAttribute
          ? content
          : truncateString(content as string, 30, "middle")}
      </Text>
    </div>
  );
};

export default Attribute;
