import { gql } from "@apollo/client";

export const UPDATE_PROFILE_DATA = gql`
  mutation updateProfileData($data: SignupData!) {
    updateProfileData(data: $data)
  }
`;

export const DELETE_ACCOUNT = gql`
  mutation deleteAccount {
    deleteAccount
  }
`;

export const INVITE_USER = gql`
  mutation inviteUser($invitedUserEmail: String!, $workspaceId: Int!) {
    inviteUser(invitedUserEmail: $invitedUserEmail, workspaceId: $workspaceId)
  }
`;
