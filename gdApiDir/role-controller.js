// @flow
import { APIVersionController } from 'src/controller/APIVersionController';


//Definition

interface GetByIdProps {
id: ? number;

};

interface AddProps {
roleAddRequest:  ;

};

interface EditProps {
roleEditRequest:  ;

};

interface DeleteProps {
id:  number;

};

interface EditRolePermissionsProps {
roleEditPermissionRequest:  ;

};

interface GetAllProps {

};

interface ChangeStatusProps {
changeEntityStatusRequest:  ;

};

interface GetByFilterProps {
active: ? boolean;
creationDateFrom: ? number;
creationDateTo: ? number;
key: ? string;
organizationId: ? number;
page: ? number;
title: ? string;

};

class RoleController extends APIVersionController {
// @query
                  getById = (key, params: GetByIdProps) => {
const { apiCaller, makeURL } = this;

                   return apiCaller().get(makeURL('/v1/role', { params }));
}


// @mutation
                  add = (body: AddProps) => {
const { apiCaller, makeURL } = this;
                    
                  return apiCaller().post(makeURL('/v1/role'), body);
}


// @mutation
                  edit = (body: EditProps) => {
const { apiCaller, makeURL } = this;
                    
                  return apiCaller().put(makeURL('/v1/role'), body);
}


// @mutation
                  delete = (key, params: DeleteProps) => {
const { apiCaller, makeURL } = this;

                   return apiCaller().delete(makeURL('/v1/role', { params }));
}


// @mutation
                  editRolePermissions = (body: EditRolePermissionsProps) => {
const { apiCaller, makeURL } = this;
                    
                  return apiCaller().put(makeURL('/v1/role/editRolePermissions'), body);
}


// @query
                  getAll = (key, params: GetAllProps) => {
const { apiCaller, makeURL } = this;

                   return apiCaller().get(makeURL('/v1/roles', { params }));
}


// @mutation
                  changeStatus = (body: ChangeStatusProps) => {
const { apiCaller, makeURL } = this;
                    
                  return apiCaller().put(makeURL('/v1/roles/changeStatus'), body);
}


// @query
                  getByFilter = (key, params: GetByFilterProps) => {
const { apiCaller, makeURL } = this;

                   return apiCaller().get(makeURL('/v1/roles/getByFilter', { params }));
}
}

                  export const roleController = new RoleController();
                  













