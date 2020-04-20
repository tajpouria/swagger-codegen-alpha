// @flow
import { APIVersionController } from "src/controller/APIVersionController";

//Definition

class ApiController extends APIVersionController {
  // @query
  getById = (key, params: GetByIdProps) => {
    const { apiCaller, makeURL } = this;

    return apiCaller().get(makeURL("/v1/api", { params }));
  };

  // @mutation
  edit = (body: EditProps) => {
    const { apiCaller, makeURL } = this;

    return apiCaller().put(makeURL("/v1/api"), body);
  };

  // @mutation
  setup = (body: SetupProps) => {
    const { apiCaller, makeURL } = this;

    return apiCaller().put(makeURL("/v1/api/setup"), body);
  };

  // @query
  getAll = (key, params: GetAllProps) => {
    const { apiCaller, makeURL } = this;

    return apiCaller().get(makeURL("/v1/apis", { params }));
  };

  // @mutation
  changeApisPermissionLevel = (body: ChangeApisPermissionLevelProps) => {
    const { apiCaller, makeURL } = this;

    return apiCaller().put(makeURL("/v1/apis/changePermissionLevel"), body);
  };

  // @mutation
  changeApisStatus = (body: ChangeApisStatusProps) => {
    const { apiCaller, makeURL } = this;

    return apiCaller().put(makeURL("/v1/apis/changeStatus"), body);
  };

  // @query
  getAggregatorApiChannelsByTitle = (
    key,
    params: GetAggregatorApiChannelsByTitleProps
  ) => {
    const { apiCaller, makeURL } = this;

    return apiCaller().get(
      makeURL("/v1/apis/getApiChannelByTitle", { params })
    );
  };

  // @query
  getAggregatorApisByChannelId = (
    key,
    params: GetAggregatorApisByChannelIdProps
  ) => {
    const { apiCaller, makeURL } = this;

    return apiCaller().get(makeURL("/v1/apis/getByChannelId", { params }));
  };

  // @query
  getByFilter = (key, params: GetByFilterProps) => {
    const { apiCaller, makeURL } = this;

    return apiCaller().get(makeURL("/v1/apis/getByFilter", { params }));
  };

  // @query
  getAggregatorApisByTitle = (key, params: GetAggregatorApisByTitleProps) => {
    const { apiCaller, makeURL } = this;

    return apiCaller().get(makeURL("/v1/apis/getByTitle", { params }));
  };
}

export const apiController = new ApiController();
