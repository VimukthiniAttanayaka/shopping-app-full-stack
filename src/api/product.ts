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

export const EDIT_PRODUCT = gql`
  mutation EditProduct($id: ID!, $productInput: ProductInput!) {
    editProduct(ID: $id, productInput: $productInput)
  }
`;
export const DELETE_PRODUCT = gql`
    mutation DeleteProduct($id: ID!) {
      deleteProduct(ID: $id)
    }
`;


export const GET_PRODUCTS = gql`
  query getProducts {
    products: getProducts { 
        id
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

export const GET_PRODUCT = gql`
  query GetProduct($ID: ID!) {
   product: getProduct(ID: $ID) {
      id
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

// export const GET_PRODUCT = gql`
//   query getProduct($id: 66dc5b0a05200d8b8bd9d39c) {
//     getProduct(ID: 66dc5b0a05200d8b8bd9d39c) {
//         id
//         name
//         price
//         discountedPrice
//         quantity
//         category
//         image
//         description
//     }
//   }
// `;