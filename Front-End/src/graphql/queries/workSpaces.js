import { gql } from "@apollo/client";

export const GET_WORKSPACES = gql`
  query getWorkSpaces($id: Int) {
    getWorkSpaces(id: $id) {
      name
      subDomain
      id
      channels {
        id
        name
      }
    }
  }
`;
