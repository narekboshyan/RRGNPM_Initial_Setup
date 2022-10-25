import { WORKSPACES_ROUTE } from "constants";
import { GET_WORKSPACES } from "graphql/queries/workSpaces";
import { useQueryWithOnError } from "hooks/apollo";
import React, { useMemo } from "react";
import { Link, useParams } from "react-router-dom";

const ViewWorkSpaces = () => {
  const { id } = useParams();

  const { data: workSpaceQueryData, loading: workSpaceIsLoading } =
    useQueryWithOnError(GET_WORKSPACES, {
      fetchPolicy: "no-cache",
      variables: {
        id: +id,
      },
    });

  const workSpaceData = useMemo(
    () => workSpaceQueryData?.getWorkSpaces[0] || {},
    [workSpaceQueryData]
  );

  return (
    <div>
      <Link to={WORKSPACES_ROUTE}>Back</Link>
      <div>Name: {workSpaceData.name}</div>
      <div>SubDomain: {workSpaceData.subDomain}</div>
    </div>
  );
};

export default ViewWorkSpaces;
