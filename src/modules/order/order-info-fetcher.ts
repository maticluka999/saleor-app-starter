import { Client, gql } from "urql";
import {
  OrderInfoDocument,
  OrderInfoQuery,
  OrderInfoQueryVariables,
} from "../../../generated/graphql";

gql`
  query OrderInfo($id: ID!) {
    order(id: $id) {
      id
      billingAddress {
        firstName
        lastName
      }
      lines {
        id
        productName
        quantity
        unitPrice {
          net {
            amount
            currency
          }
        }
        totalPrice {
          net {
            amount
            currency
          }
        }
      }
      metadata {
        key
        value
      }
      metafields(keys: ["DIČ", "IČO", "IČ_DPH"])
    }
  }
`;

export interface IOrderInfoFetcher {
  fetchOrderInfo(orderId: string): Promise<OrderInfoQuery | null>;
}

export class OrderInfoFetcher implements IOrderInfoFetcher {
  constructor(private client: Client) {}

  fetchOrderInfo(orderId: string): Promise<OrderInfoQuery | null> {
    return this.client
      .query<OrderInfoQuery, OrderInfoQueryVariables>(OrderInfoDocument, { id: orderId })
      .toPromise()
      .then((resp) => resp.data ?? null);
  }
}
