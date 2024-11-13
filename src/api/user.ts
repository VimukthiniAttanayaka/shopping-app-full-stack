import {gql} from "@apollo/client";

export const CREATE_USER = gql`
    mutation RegisterUser($userInput: UserInput) {
        registerUser(userInput: $userInput) {
            id
            token
            name
            role
        }
    }
`

export const LOGIN = gql`
    mutation Login($loginData: LoginInput) {
        login(loginData: $loginData) {
            id
            token
            name
            role
            
        }
    }
`