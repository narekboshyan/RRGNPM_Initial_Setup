import { gql } from "@apollo/client";

export const UPDATE_PROFILE_DATA = gql`
  mutation updateProfileData($data: SignupData!) {
    updateProfileData(data: $data)
  }
`;
