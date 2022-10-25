import { gql } from "@apollo/client";

export const CREATE_WORKSPACES = gql`
  mutation createEditWorkspace($data: WorkspaceData!) {
    createEditWorkspace(data: $data)
  }
`;

export const DELETE_WORKSPACES = gql`
  mutation deleteWorkSpace($id: Int!) {
    deleteWorkSpace(id: $id)
  }
`;
