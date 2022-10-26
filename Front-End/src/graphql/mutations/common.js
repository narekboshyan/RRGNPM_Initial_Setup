const { gql } = require("@apollo/client");

export const UPLOAD_FILES = gql`
  mutation uploadFiles($files: Upload!) {
    uploadFiles(files: $files)
  }
`;

export const SEND_MESSAGE = gql`
  mutation sendMessage($message: String) {
    sendMessage(message: $message)
  }
`;
