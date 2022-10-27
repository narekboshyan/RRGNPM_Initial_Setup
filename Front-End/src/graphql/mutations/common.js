import { gql } from "@apollo/client";

export const UPLOAD_FILES = gql`
  mutation uploadFiles($files: Upload!) {
    uploadFiles(files: $files)
  }
`;
