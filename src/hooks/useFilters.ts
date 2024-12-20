import { DurationsEnum } from "@/constants/time";
import { isValidBitcoinAddress } from "@/helpers/checkAddress";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useMemo } from "react";

const getAddressValue = (value: string): string => {
  return typeof value === "string" && isValidBitcoinAddress(value) ? value : "";
};

const useFilters = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const allParams = new URLSearchParams(searchParams);

  const addressQuery = searchParams.get("address") as DurationsEnum;

  const query = useMemo(
    () => ({
      address: getAddressValue(addressQuery),
    }),
    [addressQuery]
  );

  const onChangeAddr = (address: string) => {
    const newParams = new URLSearchParams(allParams.toString());
    const newAddr = getAddressValue(address);
    newParams.set("address", newAddr);

    router.replace(`?${newParams.toString()}`);
  };

  useEffect(
    () => {
      const params = new URLSearchParams(query);
      router.replace(`?${params.toString()}`);
    },
    // Keep it empty
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  return {
    query,
    onChangeAddr,
  };
};

export default useFilters;
