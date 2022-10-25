import { gql } from "@apollo/client";

export const GET_CHANNELS = gql`
  query getChannels($workspaceId: Int!) {
    getChannels(workspaceId: $workspaceId) {
      id
      name
    }
  }
`;
