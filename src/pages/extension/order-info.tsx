import { NextPage } from "next";
import { useRouter } from "next/router";
import { trpcClient } from "../../modules/trpc/trpc-client";

const DisplayOrderPage: NextPage = () => {
  const router = useRouter();

  function renderOrder() {
    const getOrderQuery = trpcClient.order.get.useQuery({
      orderId: router.query.orderId as string,
    });

    return (
      <div>
        {getOrderQuery.data && (
          <div style={{ width: "400px", wordWrap: "break-word" }}>
            Order: {JSON.stringify(getOrderQuery.data, null, 2)}
          </div>
        )}
        {getOrderQuery.error && (
          <div style={{ color: "red" }}>Error: {getOrderQuery.error?.message}</div>
        )}
      </div>
    );
  }

  return (
    <div>
      {router.isReady && (
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
          <div>Order:</div>
          <div style={{ margin: "7px 0 20px 0" }}>{router.query.orderId}</div>
          {renderOrder()}
        </div>
      )}
    </div>
  );
};

export default DisplayOrderPage;
