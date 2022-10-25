import { gql } from "@apollo/client";

export const CREATE_WORKSPACES = gql`
  mutation createWorkspace($data: WorkspaceData!) {
    createWorkspace(data: $data)
  }
`;
