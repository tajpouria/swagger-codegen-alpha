// @flow
import { APIVersionController } from "src/controller/APIVersionController";

// @query
getChannel = (key, params: getChannelProps) => {
  const { apiCaller, makeURL } = this;

  return apiCaller().get(makeURL("/v1/channel", { params }));
};
