const { gql } = require("@apollo/client");

export const UPLOAD_FILES = gql`
  mutation uploadFiles($files: Upload!) {
    uploadFiles(files: $files)
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
