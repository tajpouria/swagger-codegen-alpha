// @flow
import { APIVersionController } from "src/controller/APIVersionController";

//Definition

interface GetByIdProps {
  id: ?number;
}

interface AddProps {
  active: ?boolean;
  birthDate: ?number;
  description: ?string;
  economicCode: ?string;
  email: ?string;
  endDate: ?number;
  name: ?string;
  nationalCode: ?string;
  startDate: ?number;
}

interface EditProps {
  active: ?boolean;
  birthDate: ?number;
  description: ?string;
  economicCode: ?string;
  email: ?string;
  endDate: ?number;
  id: ?number;
  name: ?string;
  nationalCode: ?string;
  startDate: ?number;
}

interface DeleteProps {
  id: number;
}

interface GetOrganizationsByRoleIdProps {
  roleId: ?number;
}

interface GetAllProps {}

interface ChangeStatusProps {
  batchOperate: ?"Active" | "Inactive" | "Public" | "Private";
  ids: ?(number[]);
}

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

    return apiCaller().get(makeURL("/organization", { params }));
  };

  // @mutation
  add = (body: AddProps) => {
    const { apiCaller, makeURL } = this;

    return apiCaller().post(makeURL("/organization"), body);
  };

  // @mutation
  edit = (body: EditProps) => {
    const { apiCaller, makeURL } = this;

    return apiCaller().put(makeURL("/organization"), body);
  };

  // @mutation
  delete = (key, params: DeleteProps) => {
    const { apiCaller, makeURL } = this;

    return apiCaller().delete(makeURL("/organization", { params }));
  };

  // @query
  getOrganizationsByRoleId = (key, params: GetOrganizationsByRoleIdProps) => {
    const { apiCaller, makeURL } = this;

    return apiCaller().get(makeURL("/organization/getByRoleId", { params }));
  };

  // @query
  getAll = (key, params: GetAllProps) => {
    const { apiCaller, makeURL } = this;

    return apiCaller().get(makeURL("/organizations", { params }));
  };

  // @mutation
  changeStatus = (body: ChangeStatusProps) => {
    const { apiCaller, makeURL } = this;

    return apiCaller().put(makeURL("/organizations/changeStatus"), body);
  };

  // @query
  getByFilter = (key, params: GetByFilterProps) => {
    const { apiCaller, makeURL } = this;

    return apiCaller().get(makeURL("/organizations/getByFilter", { params }));
  };
}

export const organizationController = new OrganizationController();
