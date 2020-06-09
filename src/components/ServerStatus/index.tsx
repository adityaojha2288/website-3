import React from "react";
import ServerStatus from "./ServerStatus";
import IServerStatus from "../../models/ServerStatus";

import { useQuery } from "@apollo/react-hooks";
import { gql } from "apollo-boost";
import "./index.scss";

const SERVER_LIST = gql`
  query servers($category: String) {
    servers(category: $category) {
      id
      name
      version
      playercount
      status
    }
  }
`;

export default (props: { section: string }) => {
  const { data, loading, error } = useQuery(SERVER_LIST, {
    variables: {
      category: props.section,
    },
  });

  if (loading) {
    return <div>Loading</div>;
  } else if (error) {
    return <div>Error fetching server list</div>;
  }

  const serverList = data.servers.map((server: IServerStatus) => (
    <ServerStatus key={server.id} {...server} />
  ));

  return (
    <div className="server-status-section">
      <h2>{props.section} Minecraft Network</h2>

      <div className="server-status-container">{serverList}</div>
    </div>
  );
};
