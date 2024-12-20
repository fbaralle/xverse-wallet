"use client";

import { ChangeEvent, useState } from "react";
import useFilters from "./useFilters";

export const useSearchFilter = () => {
  const [searchInput, setSearchInput] = useState("");
  const { onChangeAddr } = useFilters();

  const handleOnChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setSearchInput(val);
    onChangeAddr(val);
  };

  const handleOnClearInput = () => {
    setSearchInput("");
  };

  const hasValidInput =
    typeof searchInput === "string" && searchInput?.length > 0;

  return {
    searchInput,
    hasValidInput,
    handleOnChangeInput,
    handleOnClearInput,
  };
};
