import {gql} from "@apollo/client";

export const CREATE_ORDER = gql`
    mutation PlaceOrder($placeOrderInput: PlaceOrderInput) {
        placeOrder(placeOrderInput: $placeOrderInput)
    }
`