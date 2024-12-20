"use client";

import Text from "@/components/atoms/Text";
import { BasicPageWrapper } from "@/components/molecules/BasicPageWrapper";
import SearchInput from "./SearchInput";
import { useSearchFilter } from "@/hooks/useSearchFilter";
import { useSearchWalletOrdinals } from "@/hooks/useSearchWalletOrdinals";
import { Skeleton } from "@/components/atoms/Skeleton";
import { ChevronRightIcon } from "@heroicons/react/24/solid";
import { truncateString } from "@/helpers/truncate-string";
import Link from "next/link";
import { Button } from "@/components/atoms/Button";
import { useInfiniteSearchWalletOrdinals } from "@/hooks/useInfiniteSearchWalletOrdinals";

export interface HomePageViewProps {
  initialData?: any;
}

const HomePageView: React.FC<HomePageViewProps> = ({ initialData }) => {
  const {
    searchInput,
    hasValidInput,
    handleOnChangeInput,
    handleOnClearInput,
  } = useSearchFilter();

  // const { data, isLoading, onSearch, walletAddress } = useSearchWalletOrdinals({
  //   address: searchInput,
  // });
  const {
    results,
    isLoading,
    onSearch,
    walletAddress,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteSearchWalletOrdinals({
    address: searchInput,
  });

  console.log(results);

  return (
    <BasicPageWrapper>
      <div className="flex w-full flex-1 flex-col items-center max-w-[500px]">
        <Text as="h1" className="!text-lg px-3 py-5">
          Ordinal Inscription Lookup
        </Text>
        <div className="flex w-full mb-6 flex-col gap-2">
          <Text as="label" variant="bodyLgSemibold">
            Owner Bitcoin Address
          </Text>
          <SearchInput
            value={searchInput}
            isValid={hasValidInput}
            onChange={handleOnChangeInput}
            onClear={handleOnClearInput}
          />
          <Button
            onClick={onSearch}
            className="bg-[#465AE9] p-3 w-full border-none text-center flex flex-col items-center"
          >
            Look up
          </Button>
        </div>
        <Text as="h2" className="!text-lg mb-4 self-start">
          Results
        </Text>
        <div className="flex flex-col w-full items-start gap-3">
          {isLoading && !results?.length ? (
            <div className="flex flex-col w-full gap-2">
              {Array(5)
                .fill("")
                .map((_, i) => (
                  <Skeleton key={`sk-${i}`} className="h-10" />
                ))}
            </div>
          ) : (
            results
              .filter((it) => !!it?.inscriptions?.[0]?.id)
              .map((item: any) => {
                const ordinalId = item?.inscriptions?.[0]?.id;
                return (
                  <div
                    key={ordinalId}
                    className="bg-slate-900 p-3 flex w-full rounded-lg hover:bg-slate-500 transition-all duration-300"
                  >
                    <Link
                      href={`/details/${walletAddress}/${ordinalId}`}
                      className="flex w-full flex-row items-center justify-between"
                    >
                      <Text>{truncateString(ordinalId, 25, "middle")}</Text>
                      <ChevronRightIcon className="size-6" />
                    </Link>
                  </div>
                );
              })
          )}
        </div>
        {hasNextPage && (
          <Button
            onClick={() => fetchNextPage()}
            disabled={isFetchingNextPage}
            className="bg-[#465AE9] p-3 w-full border-none text-center flex flex-col items-center mt-3"
          >
            {isFetchingNextPage ? "Loading..." : "Load More"}
          </Button>
        )}
      </div>
    </BasicPageWrapper>
  );
};

export default HomePageView;
