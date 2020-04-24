// @flow
import { APIVersionController } from "src/controller/APIVersionController";

//Definition

interface GetByIdProps {
  id: ?number;
}

interface AddProps {
  active: ?boolean;
  icon: ?string;
  key: ?string;
  menuTypeId: ?number;
  parentId: ?number;
  path: ?string;
  publicMenu: ?boolean;
  sort: ?number;
  title: ?string;
}

interface EditProps {
  icon: ?string;
  id: ?number;
  key: ?string;
  menuTypeId: ?number;
  parentId: ?number;
  path: ?string;
  publicMenu: ?boolean;
  sort: ?number;
  title: ?string;
}

interface DeleteProps {
  id: number;
}

interface AssignApiChannelsProps {
  apiChannelId: ?number;
  menuId: ?number;
}

interface ChangeMenuStatusProps {
  active: ?boolean;
  id: ?number;
}

interface GetDeletableStatusProps {
  id: number;
}

interface GetMenuApiChannelByUserIdProps {}

interface UnAssignApiChannelsProps {
  apiChannelId: ?number;
  menuId: ?number;
}

interface GetAllProps {}

interface GetByParentIdProps {
  parentId: ?number;
}

interface GetByFilterProps {
  active: ?boolean;
  applicationId: ?number;
  menuTypeId: ?number;
  page: ?number;
  parentId: ?number;
  publicMenu: ?boolean;
  title: ?string;
}

interface GetByMenuTypeIdProps {
  menuTypeId: ?number;
}

interface GetMenusByUserIdProps {
  application: ?string;
}

class MenuController extends APIVersionController {
  // @query
  getById = (key, params: GetByIdProps) => {
    const { apiCaller, makeURL } = this;

    return apiCaller().get(makeURL("/menu", { params }));
  };

  // @mutation
  add = (body: AddProps) => {
    const { apiCaller, makeURL } = this;

    return apiCaller().post(makeURL("/menu"), body);
  };

  // @mutation
  edit = (body: EditProps) => {
    const { apiCaller, makeURL } = this;

    return apiCaller().put(makeURL("/menu"), body);
  };

  // @mutation
  delete = (key, params: DeleteProps) => {
    const { apiCaller, makeURL } = this;

    return apiCaller().delete(makeURL("/menu", { params }));
  };

  // @mutation
  assignApiChannels = (body: AssignApiChannelsProps) => {
    const { apiCaller, makeURL } = this;

    return apiCaller().put(makeURL("/menu/assignApiChannels"), body);
  };

  // @mutation
  changeMenuStatus = (body: ChangeMenuStatusProps) => {
    const { apiCaller, makeURL } = this;

    return apiCaller().put(makeURL("/menu/changeStatus"), body);
  };

  // @query
  getDeletableStatus = (key, params: GetDeletableStatusProps) => {
    const { apiCaller, makeURL } = this;

    return apiCaller().get(makeURL("/menu/getDeletableStatus", { params }));
  };

  // @query
  getMenuApiChannelByUserId = (key, params: GetMenuApiChannelByUserIdProps) => {
    const { apiCaller, makeURL } = this;

    return apiCaller().get(
      makeURL("/menu/getMenuApiChannelByUserId", { params })
    );
  };

  // @mutation
  unAssignApiChannels = (body: UnAssignApiChannelsProps) => {
    const { apiCaller, makeURL } = this;

    return apiCaller().put(makeURL("/menu/unAssignApiChannels"), body);
  };

  // @query
  getAll = (key, params: GetAllProps) => {
    const { apiCaller, makeURL } = this;

    return apiCaller().get(makeURL("/menus", { params }));
  };

  // @query
  getByParentId = (key, params: GetByParentIdProps) => {
    const { apiCaller, makeURL } = this;

    return apiCaller().get(makeURL("/menus/", { params }));
  };

  // @query
  getByFilter = (key, params: GetByFilterProps) => {
    const { apiCaller, makeURL } = this;

    return apiCaller().get(makeURL("/menus/getByFilter", { params }));
  };

  // @query
  getByMenuTypeId = (key, params: GetByMenuTypeIdProps) => {
    const { apiCaller, makeURL } = this;

    return apiCaller().get(makeURL("/menus/getByMenuTypeId", { params }));
  };

  // @query
  getMenusByUserId = (key, params: GetMenusByUserIdProps) => {
    const { apiCaller, makeURL } = this;

    return apiCaller().get(makeURL("/menus/getByUserId", { params }));
  };
}

export const menuController = new MenuController();
