import OrdinalDetailsView from "@/components/views/OrdinalDetailsView/OrdinalDetailsView";
import axios from "axios";

const getOrdinalData = async (address: string, ordinalId: string) => {
  try {
    const { data } = await axios.get(
      `https://api-3.xverse.app/v1/address/${address}/ordinals/inscriptions/${ordinalId}`
    );
    return data;
  } catch (e) {
    return null;
  }
};

const OrdinalDetailsPage = async ({
  params,
}: {
  params: {
    address: string;
    id: string;
  };
}) => {
  const ordinalData = await getOrdinalData(params.address, params.id);

  return <OrdinalDetailsView data={ordinalData} />;
};

export default OrdinalDetailsPage;
