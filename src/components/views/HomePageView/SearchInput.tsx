"use client";

import { Input } from "@/components/atoms/Input";
import { XCircleIcon } from "@heroicons/react/24/solid";
import { ChangeEvent } from "react";

interface SearchInputProps {
  value: string;
  isValid: boolean;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onClear: () => void;
}

const SearchInput: React.FC<SearchInputProps> = ({
  onChange,
  value,
  onClear,
  isValid,
}) => {
  return (
    <span className="flex flex-row px-3 items-center gap-2 bg-background-cellHighlight rounded-lg w-full h-min cursor-pointer hover:shadow-lg transition-all duration-300 hover:dark:shadow-slate-600/50">
      <Input
        placeholder="Search"
        className="box-border cursor-pointer bg-transparent border-none text-md md:text-lg lg:text-lg"
        containerClassName="flex-1"
        maxLength={100}
        value={value}
        onChange={onChange}
      />
      {isValid && (
        <XCircleIcon
          className="size-6"
          style={{ color: "var(--textSubduedColor)" }}
          type="button"
          onClick={onClear}
          title="Clear input"
        />
      )}
    </span>
  );
};

export default SearchInput;
