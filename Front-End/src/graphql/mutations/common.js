import { gql } from "@apollo/client";

export const UPLOAD_FILE = gql`
  mutation uploadProfilePicture($file: Upload!) {
    uploadProfilePicture(file: $file)
  }
`;
