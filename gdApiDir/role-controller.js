// @flow
import { APIVersionController } from "src/controller/APIVersionController";

//Definition

interface GetByIdProps {
  id: ?number;
}

interface AddProps {
  active: ?boolean;
  description: ?string;
  key: ?string;
  organizationId: ?number;
  title: ?string;
}

interface EditProps {
  description: ?string;
  id: ?number;
  key: ?string;
  organizationId: ?number;
  title: ?string;
}

interface DeleteProps {
  id: number;
}

interface EditRolePermissionsProps {
  permissionRequests: ?({
    accessType: boolean,
    id: number,
  }[]);
  roleId: ?number;
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
  key: ?string;
  organizationId: ?number;
  page: ?number;
  title: ?string;
}

class RoleController extends APIVersionController {
  // @query
  getById = (key, params: GetByIdProps) => {
    const { apiCaller, makeURL } = this;

    return apiCaller().get(makeURL("/role", { params }));
  };

  // @mutation
  add = (body: AddProps) => {
    const { apiCaller, makeURL } = this;

    return apiCaller().post(makeURL("/role"), body);
  };

  // @mutation
  edit = (body: EditProps) => {
    const { apiCaller, makeURL } = this;

    return apiCaller().put(makeURL("/role"), body);
  };

  // @mutation
  delete = (key, params: DeleteProps) => {
    const { apiCaller, makeURL } = this;

    return apiCaller().delete(makeURL("/role", { params }));
  };

  // @mutation
  editRolePermissions = (body: EditRolePermissionsProps) => {
    const { apiCaller, makeURL } = this;

    return apiCaller().put(makeURL("/role/editRolePermissions"), body);
  };

  // @query
  getAll = (key, params: GetAllProps) => {
    const { apiCaller, makeURL } = this;

    return apiCaller().get(makeURL("/roles", { params }));
  };

  // @mutation
  changeStatus = (body: ChangeStatusProps) => {
    const { apiCaller, makeURL } = this;

    return apiCaller().put(makeURL("/roles/changeStatus"), body);
  };

  // @query
  getByFilter = (key, params: GetByFilterProps) => {
    const { apiCaller, makeURL } = this;

    return apiCaller().get(makeURL("/roles/getByFilter", { params }));
  };
}

export const roleController = new RoleController();
