// @flow
import { APIVersionController } from "src/controller/APIVersionController";

//Definition

class ChannelController extends APIVersionController {
  // @query
  getChannel = (key, params: GetChannelProps) => {
    const { apiCaller, makeURL } = this;

    return apiCaller().get(makeURL("/v1/channel", { params }));
  };

  // @mutation
  add = (body: AddProps) => {
    const { apiCaller, makeURL } = this;

    return apiCaller().post(makeURL("/v1/channel"), body);
  };

  // @mutation
  edit = (body: EditProps) => {
    const { apiCaller, makeURL } = this;

    return apiCaller().put(makeURL("/v1/channel"), body);
  };

  // @mutation
  delete = (key, params: DeleteProps) => {
    const { apiCaller, makeURL } = this;

    return apiCaller().delete(makeURL("/v1/channel", { params }));
  };

  // @mutation
  assignApiToChannel = (body: AssignApiToChannelProps) => {
    const { apiCaller, makeURL } = this;

    return apiCaller().put(makeURL("/v1/channel/assignApiToChannel"), body);
  };

  // @query
  getChannelConsumers = (key, params: GetChannelConsumersProps) => {
    const { apiCaller, makeURL } = this;

    return apiCaller().get(makeURL("/v1/channel/getConsumers", { params }));
  };

  // @mutation
  unAssignApiToChannel = (body: UnAssignApiToChannelProps) => {
    const { apiCaller, makeURL } = this;

    return apiCaller().put(makeURL("/v1/channel/unAssignApiToChannel"), body);
  };

  // @query
  getAll = (key, params: GetAllProps) => {
    const { apiCaller, makeURL } = this;

    return apiCaller().get(makeURL("/v1/channels", { params }));
  };

  // @mutation
  changeStatus = (body: ChangeStatusProps) => {
    const { apiCaller, makeURL } = this;

    return apiCaller().put(makeURL("/v1/channels/changeStatus"), body);
  };

  // @query
  getByFilter = (key, params: GetByFilterProps) => {
    const { apiCaller, makeURL } = this;

    return apiCaller().get(makeURL("/v1/channels/getByFilter", { params }));
  };
}

export const channelController = new ChannelController();
