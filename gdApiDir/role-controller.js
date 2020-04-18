// @flow
import { APIVersionController } from "src/controller/APIVersionController";

//Definition

class RoleController extends APIVersionController {
  // @query
  getById = (key, params: getByIdProps) => {
    const { apiCaller, makeURL } = this;

    return apiCaller().get(makeURL("/v1/role", { params }));
  };

  // @mutation
  add = (body: addProps) => {
    const { apiCaller, makeURL } = this;

    return apiCaller().post(makeURL("/v1/role"), body);
  };

  // @mutation
  edit = (body: editProps) => {
    const { apiCaller, makeURL } = this;

    return apiCaller().put(makeURL("/v1/role"), body);
  };

  // @mutation
  delete = (key, params: deleteProps) => {
    const { apiCaller, makeURL } = this;

    return apiCaller().delete(makeURL("/v1/role", { params }));
  };

  // @mutation
  editRolePermissions = (body: editRolePermissionsProps) => {
    const { apiCaller, makeURL } = this;

    return apiCaller().put(makeURL("/v1/role/editRolePermissions"), body);
  };

  // @query
  getAll = (key, params: getAllProps) => {
    const { apiCaller, makeURL } = this;

    return apiCaller().get(makeURL("/v1/roles", { params }));
  };

  // @mutation
  changeStatus = (body: changeStatusProps) => {
    const { apiCaller, makeURL } = this;

    return apiCaller().put(makeURL("/v1/roles/changeStatus"), body);
  };

  // @query
  getByFilter = (key, params: getByFilterProps) => {
    const { apiCaller, makeURL } = this;

    return apiCaller().get(makeURL("/v1/roles/getByFilter", { params }));
  };
}
