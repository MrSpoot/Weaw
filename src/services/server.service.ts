import http from "../http-common";
import { Server, ServerInvite } from "../types/server.type";

const servicePath = "/server";

const createServer = (name: string, description: string): Promise<Server> => {
    return http.post(servicePath, { name: name, description:description }).then((res: any) => {
      return res.data;
    });
  };

  const createServerInvite = (serverId: string, expire?: number): Promise<ServerInvite> => {
    return http.post(servicePath + "/invite", { serverId: serverId, expire:expire }).then((res: any) => {
      return res.data;
    });
  };

const getUserServers = (): Promise<Server[]> => {
  return http.get(servicePath).then((res: any) => {
    return res.data;
  });
}

const serverService = {
    createServer,
    getUserServers,
    createServerInvite
};

export default serverService;
