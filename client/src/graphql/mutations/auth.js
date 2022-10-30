import { gql } from "@apollo/client";

export const SIGN_UP = gql`
  mutation signup($data: SignupData!) {
    signup(data: $data)
  }
`;

export const SIGN_IN = gql`
  mutation signin($data: SigninData!) {
    signin(data: $data) {
      id
      firstName
      lastName
      email
      token
    }
  }
`;
