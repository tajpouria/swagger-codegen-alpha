// @flow
import { APIVersionController } from "src/controller/APIVersionController";

//Definition

interface GetAllProps {}

class TagController extends APIVersionController {
  // @mutation
  add = (body: AddProps) => {
    const { apiCaller, makeURL } = this;

    return apiCaller().post(makeURL("/v1/tag"), body);
  };

  // @mutation
  edit = (body: EditProps) => {
    const { apiCaller, makeURL } = this;

    return apiCaller().put(makeURL("/v1/tag"), body);
  };

  // @mutation
  delete = (key, params: DeleteProps) => {
    const { apiCaller, makeURL } = this;

    return apiCaller().delete(makeURL("/v1/tag", { params }));
  };

  // @query
  getAll = (key, params: GetAllProps) => {
    const { apiCaller, makeURL } = this;

    return apiCaller().get(makeURL("/v1/tags", { params }));
  };
}

export const tagController = new TagController();
