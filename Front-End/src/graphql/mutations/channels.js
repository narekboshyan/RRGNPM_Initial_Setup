import { gql } from "@apollo/client";

export const CREATE_EDIT_CHANNELS = gql`
  mutation createEditChannels($data: ChannelsData) {
    createEditChannels(data: $data)
  }
`;
