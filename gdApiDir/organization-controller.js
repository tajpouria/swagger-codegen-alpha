// @flow
import { APIVersionController } from "src/controller/APIVersionController";

//Definition

interface GetByIdProps {
  id: ?number;
}

interface GetOrganizationsByRoleIdProps {
  roleId: ?number;
}

interface GetAllProps {}

interface GetByFilterProps {
  active: ?boolean;
  birthDate: ?number;
  economicCode: ?string;
  endDate: ?number;
  name: ?string;
  nationalCode: ?string;
  page: ?number;
  startDate: ?number;
}

class OrganizationController extends APIVersionController {
  // @query
  getById = (key, params: GetByIdProps) => {
    const { apiCaller, makeURL } = this;

    return apiCaller().get(makeURL("/v1/organization", { params }));
  };

  // @mutation
  add = (body: AddProps) => {
    const { apiCaller, makeURL } = this;

    return apiCaller().post(makeURL("/v1/organization"), body);
  };

  // @mutation
  edit = (body: EditProps) => {
    const { apiCaller, makeURL } = this;

    return apiCaller().put(makeURL("/v1/organization"), body);
  };

  // @mutation
  delete = (key, params: DeleteProps) => {
    const { apiCaller, makeURL } = this;

    return apiCaller().delete(makeURL("/v1/organization", { params }));
  };

  // @query
  getOrganizationsByRoleId = (key, params: GetOrganizationsByRoleIdProps) => {
    const { apiCaller, makeURL } = this;

    return apiCaller().get(makeURL("/v1/organization/getByRoleId", { params }));
  };

  // @query
  getAll = (key, params: GetAllProps) => {
    const { apiCaller, makeURL } = this;

    return apiCaller().get(makeURL("/v1/organizations", { params }));
  };

  // @mutation
  changeStatus = (body: ChangeStatusProps) => {
    const { apiCaller, makeURL } = this;

    return apiCaller().put(makeURL("/v1/organizations/changeStatus"), body);
  };

  // @query
  getByFilter = (key, params: GetByFilterProps) => {
    const { apiCaller, makeURL } = this;

    return apiCaller().get(
      makeURL("/v1/organizations/getByFilter", { params })
    );
  };
}

export const organizationController = new OrganizationController();
