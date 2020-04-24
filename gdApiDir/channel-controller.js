// @flow
import { APIVersionController } from "src/controller/APIVersionController";

//Definition

interface GetChannelProps {
  id: ?number;
}

interface AddProps {
  active: ?boolean;
  description: ?string;
  key: ?string;
  tags: ?(number[]);
  title: ?string;
}

interface EditProps {
  description: ?string;
  id: ?number;
  key: ?string;
  tags: ?(number[]);
  title: ?string;
}

interface DeleteProps {
  id: ?number;
}

interface AssignApiToChannelProps {
  apiId: ?number;
  channelId: ?number;
}

interface GetChannelConsumersProps {
  id: ?number;
}

interface UnAssignApiToChannelProps {
  apiId: ?number;
  channelId: ?number;
}

interface GetAllProps {}

interface ChangeStatusProps {
  batchOperate: ?"Active" | "Inactive" | "Public" | "Private";
  ids: ?(number[]);
}

interface GetByFilterProps {
  active: ?boolean;
  creationDateFrom: ?number;
  creationDateTo: ?number;
  deleted: ?boolean;
  page: ?number;
  tags: ?(number[]);
  title: ?string;
}

class ChannelController extends APIVersionController {
  // @query
  getChannel = (key, params: GetChannelProps) => {
    const { apiCaller, makeURL } = this;

    return apiCaller().get(makeURL("/channel", { params }));
  };

  // @mutation
  add = (body: AddProps) => {
    const { apiCaller, makeURL } = this;

    return apiCaller().post(makeURL("/channel"), body);
  };

  // @mutation
  edit = (body: EditProps) => {
    const { apiCaller, makeURL } = this;

    return apiCaller().put(makeURL("/channel"), body);
  };

  // @mutation
  delete = (key, params: DeleteProps) => {
    const { apiCaller, makeURL } = this;

    return apiCaller().delete(makeURL("/channel", { params }));
  };

  // @mutation
  assignApiToChannel = (body: AssignApiToChannelProps) => {
    const { apiCaller, makeURL } = this;

    return apiCaller().put(makeURL("/channel/assignApiToChannel"), body);
  };

  // @query
  getChannelConsumers = (key, params: GetChannelConsumersProps) => {
    const { apiCaller, makeURL } = this;

    return apiCaller().get(makeURL("/channel/getConsumers", { params }));
  };

  // @mutation
  unAssignApiToChannel = (body: UnAssignApiToChannelProps) => {
    const { apiCaller, makeURL } = this;

    return apiCaller().put(makeURL("/channel/unAssignApiToChannel"), body);
  };

  // @query
  getAll = (key, params: GetAllProps) => {
    const { apiCaller, makeURL } = this;

    return apiCaller().get(makeURL("/channels", { params }));
  };

  // @mutation
  changeStatus = (body: ChangeStatusProps) => {
    const { apiCaller, makeURL } = this;

    return apiCaller().put(makeURL("/channels/changeStatus"), body);
  };

  // @query
  getByFilter = (key, params: GetByFilterProps) => {
    const { apiCaller, makeURL } = this;

    return apiCaller().get(makeURL("/channels/getByFilter", { params }));
  };
}

export const channelController = new ChannelController();
