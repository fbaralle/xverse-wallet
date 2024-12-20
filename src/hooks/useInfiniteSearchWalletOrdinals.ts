import { useInfiniteQuery } from "@tanstack/react-query";
import { COMMON_DURATIONS, DurationsEnum } from "@/constants/time";
import { apiClient } from "@/config/apiClient";
import { isValidBitcoinAddress } from "@/helpers/checkAddress";
import { useState, useEffect } from "react";

export const QK_WALLET_ORDINALS = "qk-wallet-ordinals";

const STALE_TIME_MS = COMMON_DURATIONS[DurationsEnum.FiveMinutes];
const REFETCH_TIME_MS = COMMON_DURATIONS[DurationsEnum.FiveSeconds];
const PAGE_SIZE = 30;

export interface UseSearchWalletOrdinalsProps {
  address: string;
}

export const useInfiniteSearchWalletOrdinals = ({
  address,
}: UseSearchWalletOrdinalsProps) => {
  const [searchEnabled, setSearchEnabled] = useState(false);

  const isValidAddress = isValidBitcoinAddress(address);

  const fetchEnabled = isValidAddress && searchEnabled;

  const onSearch = () => {
    setSearchEnabled(true);
  };

  useEffect(() => {
    setSearchEnabled(false);
  }, [address, isValidAddress]);

  const { data, isFetchingNextPage, isLoading, fetchNextPage, hasNextPage } =
    useInfiniteQuery({
      queryKey: [QK_WALLET_ORDINALS, address],
      queryFn: async ({ pageParam }) => {
        const { data: resData } = await apiClient.get<any>(
          `/v1/address/${address}/ordinal-utxo`,
          {
            params: {
              offset: pageParam,
            },
            timeout: 10_000,
          }
        );

        const response = {
          results: resData.results,
          nextOffset:
            resData.results.length === PAGE_SIZE ? pageParam + PAGE_SIZE : null,
        };

        console.log(response);

        return response;
      },
      getNextPageParam: (lastPage) => lastPage.nextOffset,
      staleTime: STALE_TIME_MS,
      refetchInterval: REFETCH_TIME_MS,
      enabled: fetchEnabled,
      initialPageParam: 0,
    });

  const results = data?.pages.flatMap((page) => page.results) || [];

  return {
    isLoading,
    isFetchingNextPage,
    results,
    fetchNextPage,
    hasNextPage,
    onSearch,
    walletAddress: address,
  };
};
