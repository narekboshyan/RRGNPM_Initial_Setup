import { gql } from "@apollo/client";

export const GET_ME = gql`
  query getMe {
    getMe {
      id
      firstName
      lastName
      email
    }
  }
`;

export const GET_MY_PROFILE_DATA = gql`
  query getProfileData {
    getProfileData {
      id
      firstName
      lastName
      email
      profilePicture {
        name
      }
    }
  }
`;
