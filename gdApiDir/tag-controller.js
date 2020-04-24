// @flow
import { APIVersionController } from "src/controller/APIVersionController";

//Definition

interface AddProps {
  description: ?string;
  title: ?string;
  type: ?"Channel";
}

interface EditProps {
  description: ?string;
  id: ?number;
  title: ?string;
  type: ?"Channel";
}

interface DeleteProps {
  id: number;
}

interface GetAllProps {}

class TagController extends APIVersionController {
  // @mutation
  add = (body: AddProps) => {
    const { apiCaller, makeURL } = this;

    return apiCaller().post(makeURL("/tag"), body);
  };

  // @mutation
  edit = (body: EditProps) => {
    const { apiCaller, makeURL } = this;

    return apiCaller().put(makeURL("/tag"), body);
  };

  // @mutation
  delete = (key, params: DeleteProps) => {
    const { apiCaller, makeURL } = this;

    return apiCaller().delete(makeURL("/tag", { params }));
  };

  // @query
  getAll = (key, params: GetAllProps) => {
    const { apiCaller, makeURL } = this;

    return apiCaller().get(makeURL("/tags", { params }));
  };
}

export const tagController = new TagController();
