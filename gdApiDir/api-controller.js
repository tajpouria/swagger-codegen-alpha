// @flow
import { APIVersionController } from "src/controller/APIVersionController";

//Definition

interface GetByIdProps {
  id: ?number;
}

interface EditProps {
  active: ?boolean;
  description: ?string;
  id: ?number;
  publicAccess: ?boolean;
  title: ?string;
}

interface SetupProps {}

interface GetAllProps {}

interface ChangeApisPermissionLevelProps {
  batchOperate: ?"Active" | "Inactive" | "Public" | "Private";
  ids: ?(number[]);
}

interface ChangeApisStatusProps {
  batchOperate: ?"Active" | "Inactive" | "Public" | "Private";
  ids: ?(number[]);
}

interface GetAggregatorApiChannelsByTitleProps {
  title: ?string;
}

interface GetAggregatorApisByChannelIdProps {
  channelId: ?number;
}

interface GetByFilterProps {
  active: ?boolean;
  deleted: ?boolean;
  method: ?string;
  page: ?number;
  publicAccess: ?boolean;
  title: ?string;
  url: ?string;
}

interface GetAggregatorApisByTitleProps {
  title: ?string;
}

class ApiController extends APIVersionController {
  // @query
  getById = (key, params: GetByIdProps) => {
    const { apiCaller, makeURL } = this;

    return apiCaller().get(makeURL("/api", { params }));
  };

  // @mutation
  edit = (body: EditProps) => {
    const { apiCaller, makeURL } = this;

    return apiCaller().put(makeURL("/api"), body);
  };

  // @mutation
  setup = (body: SetupProps) => {
    const { apiCaller, makeURL } = this;

    return apiCaller().put(makeURL("/api/setup"), body);
  };

  // @query
  getAll = (key, params: GetAllProps) => {
    const { apiCaller, makeURL } = this;

    return apiCaller().get(makeURL("/apis", { params }));
  };

  // @mutation
  changeApisPermissionLevel = (body: ChangeApisPermissionLevelProps) => {
    const { apiCaller, makeURL } = this;

    return apiCaller().put(makeURL("/apis/changePermissionLevel"), body);
  };

  // @mutation
  changeApisStatus = (body: ChangeApisStatusProps) => {
    const { apiCaller, makeURL } = this;

    return apiCaller().put(makeURL("/apis/changeStatus"), body);
  };

  // @query
  getAggregatorApiChannelsByTitle = (
    key,
    params: GetAggregatorApiChannelsByTitleProps
  ) => {
    const { apiCaller, makeURL } = this;

    return apiCaller().get(makeURL("/apis/getApiChannelByTitle", { params }));
  };

  // @query
  getAggregatorApisByChannelId = (
    key,
    params: GetAggregatorApisByChannelIdProps
  ) => {
    const { apiCaller, makeURL } = this;

    return apiCaller().get(makeURL("/apis/getByChannelId", { params }));
  };

  // @query
  getByFilter = (key, params: GetByFilterProps) => {
    const { apiCaller, makeURL } = this;

    return apiCaller().get(makeURL("/apis/getByFilter", { params }));
  };

  // @query
  getAggregatorApisByTitle = (key, params: GetAggregatorApisByTitleProps) => {
    const { apiCaller, makeURL } = this;

    return apiCaller().get(makeURL("/apis/getByTitle", { params }));
  };
}

export const apiController = new ApiController();
