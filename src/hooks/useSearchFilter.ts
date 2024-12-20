"use client";

import { ChangeEvent, useEffect, useState } from "react";
import useFilters from "./useFilters";

export const useSearchFilter = () => {
  const [searchInput, setSearchInput] = useState("");
  const { onChangeAddr, query } = useFilters();

  const handleOnChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    updateInput(val);
  };

  const updateInput = (val: string) => {
    setSearchInput(val);
    onChangeAddr(val);
  };

  const handleOnClearInput = () => {
    setSearchInput("");
  };

  const hasValidInput =
    typeof searchInput === "string" && searchInput?.length > 0;

  useEffect(() => {
    if (query.address) {
      updateInput(query.address);
    }
  }, []);

  return {
    searchInput,
    hasValidInput,
    handleOnChangeInput,
    handleOnClearInput,
  };
};
