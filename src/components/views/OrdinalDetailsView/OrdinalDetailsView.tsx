"use client";
import Text from "@/components/atoms/Text";
import { BasicPageWrapper } from "@/components/molecules/BasicPageWrapper";
import ImageWithFallback from "@/components/molecules/ImageWithFallback";
import { COMMON_DURATIONS, DurationsEnum } from "@/constants/time";
import { classMerge } from "@/helpers/classMerge";
import { truncateString } from "@/helpers/truncate-string";
import { ChevronLeftIcon, PuzzlePieceIcon } from "@heroicons/react/24/solid";
import Link from "next/link";

export const revalidate = COMMON_DURATIONS[DurationsEnum.ThirtyMinutes];

interface OrdinalDataProps {
  data: {
    id: string;
    number: number;
    address: string;
    genesis_address: string;
    genesis_block_height: number;
    genesis_block_hash: string;
    genesis_tx_id: string;
    genesis_fee: number;
    genesis_timestamp: number;
    location: string;
    output: string;
    offset: number;
    sat_ordinal: number;
    sat_rarity:
      | "common"
      | "uncommon"
      | "rare"
      | "epic"
      | "legendary"
      | "mythic";
    sat_coinbase_height: number;
    mime_type: string;
    content_type: string;
    content_length: number;
    tx_id: string;
    timestamp: number;
    value: number;
    category: string | null;
    collection_id: string;
    collection_name: string;
    inscription_floor_price: number;
  };
}

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

const OrdinalDetailsView: React.FC<OrdinalDataProps> = async ({ data }) => {
  const {
    number,
    content_length,
    mime_type,
    location,
    genesis_tx_id,
    id,
    address,
    collection_name,
    sat_ordinal,
    sat_rarity,
    value,
  } = data;
  const imageUrl = `https://ord.xverse.app/content/${id}`;
  const isImage = mime_type.includes("image");
  return (
    <BasicPageWrapper>
      <div className="flex w-full flex-1 flex-col items-center max-w-[500px]">
        <div className="flex flex-row w-full items-center justify-center px-3 py-5">
          <Link href={"/"}>
            <ChevronLeftIcon className="size-8" />
          </Link>
          <Text as="h1" variant="bodyLg-med" className="!text-lg mx-auto">
            Details
          </Text>
        </div>
        <div className="w-full h-[500px]">
          {isImage ? (
            <ImageWithFallback
              alt="Ordinal image"
              urls={[imageUrl]}
              className="object-cover size-full"
            />
          ) : (
            <div className="bg-black flex flex-col items-center justify-center size-full gap-5">
              <PuzzlePieceIcon className="size-10" />
              <Text variant="bodySmMedium">Content is not an image</Text>
            </div>
          )}
        </div>
        <div className="px-2 w-full">
          <Text
            as="h2"
            className="py-3 border-b-[1px] border-solid mb-3 border-b-slate-600 flex-1 !text-2xl"
          >
            {`${collection_name} ${value}`}
          </Text>
        </div>
        <div className="flex w-full mb-6 flex-col gap-4 items-start">
          <Attribute title={"Inscription Id"} content={id} />
          <Attribute
            title={"Owner Address"}
            content={address}
            className="mb-5"
          />
          <Text as="h2" className="!text-xl">
            Attributes
          </Text>
          <Attribute title={"Output Value"} content={number} isAttribute />
          <Attribute title={"Content Type"} content={mime_type} isAttribute />
          <Attribute
            title={"Content Length"}
            content={content_length}
            isAttribute
          />
          <Attribute title={"Location"} content={location} isAttribute />
          <Attribute
            title={"Genesis Transaction"}
            content={genesis_tx_id}
            isAttribute
          />
          <Attribute
            title={"Collection Name"}
            content={collection_name}
            isAttribute
          />
          <Attribute title={"Sat Ordinal"} content={sat_ordinal} isAttribute />
          <Attribute title={"Sat Rarity"} content={sat_rarity} isAttribute />
        </div>
      </div>
    </BasicPageWrapper>
  );
};

export default OrdinalDetailsView;
