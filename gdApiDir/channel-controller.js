// @flow
import { APIVersionController } from "src/controller/APIVersionController";

// @query
getChannel = (key, params: getChannelProps) => {
  const { apiCaller, makeURL } = this;

  return apiCaller().get(makeURL("/v1/channel", { params }));
};

// @mutation
add = (body: addProps) => {
  const { apiCaller, makeURL } = this;

  return apiCaller().post(makeURL("/v1/channel"), body);
};

// @mutation
edit = (body: editProps) => {
  const { apiCaller, makeURL } = this;

  return apiCaller().put(makeURL("/v1/channel"), body);
};

// @mutation
assignApiToChannel = (body: assignApiToChannelProps) => {
  const { apiCaller, makeURL } = this;

  return apiCaller().put(makeURL("/v1/channel/assignApiToChannel"), body);
};

// @query
getChannelConsumers = (key, params: getChannelConsumersProps) => {
  const { apiCaller, makeURL } = this;

  return apiCaller().get(makeURL("/v1/channel/getConsumers", { params }));
};

// @mutation
unAssignApiToChannel = (body: unAssignApiToChannelProps) => {
  const { apiCaller, makeURL } = this;

  return apiCaller().put(makeURL("/v1/channel/unAssignApiToChannel"), body);
};

// @query
getAll = (key, params: getAllProps) => {
  const { apiCaller, makeURL } = this;

  return apiCaller().get(makeURL("/v1/channels", { params }));
};

// @mutation
changeStatus = (body: changeStatusProps) => {
  const { apiCaller, makeURL } = this;

  return apiCaller().put(makeURL("/v1/channels/changeStatus"), body);
};

// @query
getByFilter = (key, params: getByFilterProps) => {
  const { apiCaller, makeURL } = this;

  return apiCaller().get(makeURL("/v1/channels/getByFilter", { params }));
};
