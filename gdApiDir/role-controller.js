// @flow
import { APIVersionController } from "src/controller/APIVersionController";

// @query
getById = (key, params: getByIdProps) => {
  const { apiCaller, makeURL } = this;

  return apiCaller().get(makeURL("/v1/role", { params }));
};
