import { gql } from "@apollo/client";

export const UPLOAD_FILE = gql`
  mutation uploadProfilePicture($file: Upload!) {
    uploadProfilePicture(file: $file)
  }
`;

export const INVITE_USER = gql`
  mutation inviteUser($invitedUserEmail: String!, $workspaceId: Int!) {
    inviteUser(invitedUserEmail: $invitedUserEmail, workspaceId: $workspaceId)
  }
`;

export const SEND_MESSAGE = gql`
  mutation sendMessage($message: String) {
    sendMessage(message: $message)
  }
`;
