import {gql} from "@apollo/client";

export const ADD_PRODUCT = gql`
    mutation CreateProduct($productInput: ProductInput) {
        createProduct(productInput: $productInput) {
            name
            price
            discountedPrice
            quantity
            category
            image
            description
        }
    }
`;