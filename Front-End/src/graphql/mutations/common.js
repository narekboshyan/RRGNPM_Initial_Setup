import { gql } from "@apollo/client";

export const UPLOAD_FILES = gql`
  mutation uploadFiles($files: Upload!) {
    uploadFiles(files: $files)
  }
`;
<<<<<<< HEAD

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
=======
>>>>>>> f0db7731af88fb1b7dbe9d3f2b3e921164a505a4
