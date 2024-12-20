import { useQuery } from "@tanstack/react-query";
import { COMMON_DURATIONS, DurationsEnum } from "@/constants/time";
import { apiClient } from "@/config/apiClient";
import { isValidBitcoinAddress } from "@/helpers/checkAddress";
import { useEffect, useState } from "react";
import useFilters from "./useFilters";

export const QK_WALLET_ORDINALS = "qk-wallet-ordinals";

const STALE_TIME_MS = COMMON_DURATIONS[DurationsEnum.FiveMinutes];
const REFETCH_TIME_MS = COMMON_DURATIONS[DurationsEnum.FiveSeconds];

export interface UseSearchWalletOrdinalsProps {
  address: string;
}

export const useSearchWalletOrdinals = ({
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

  const {
    data,
    isFetching,
    isLoading: isLoadingData,
    fetchStatus,
  } = useQuery({
    queryKey: [QK_WALLET_ORDINALS, address],
    queryFn: async () => {
      try {
        const { data: resData } = await apiClient.get<any>(
          `/v1/address/${address}/ordinal-utxo`,
          {
            params: {
              offset: 31,
            },
            timeout: 10_000,
          }
        );
        console.log(resData);
        return resData;
      } catch (e) {
        // const errorMessage = (e as Error).message ?? 'Error';
        // toast.error(errorMessage);
      }
    },
    staleTime: STALE_TIME_MS,
    refetchInterval: REFETCH_TIME_MS,
    enabled: fetchEnabled,
  });

  const isLoading = (isFetching || isLoadingData) && fetchStatus !== "idle";

  return { isLoading, data, onSearch, walletAddress: address };
};
