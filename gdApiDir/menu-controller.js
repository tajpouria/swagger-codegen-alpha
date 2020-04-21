// @flow
import { APIVersionController } from 'src/controller/APIVersionController';


//Definition

interface GetByIdProps {
id: ? number;

};

interface AddProps {
menuAddRequest:  ;

};

interface EditProps {
menuEditRequest:  ;

};

interface DeleteProps {
id:  number;

};

interface AssignApiChannelsProps {
menuAssignApiChannelsRequest:  ;

};

interface ChangeMenuStatusProps {
menuChangeStatusRequest:  ;

};

interface GetDeletableStatusProps {
id:  number;

};

interface GetMenuApiChannelByUserIdProps {

};

interface UnAssignApiChannelsProps {
menuAssignApiChannelsRequest:  ;

};

interface GetAllProps {

};

interface GetByParentIdProps {
parentId: ? number;

};

interface GetByFilterProps {
active: ? boolean;
applicationId: ? number;
menuTypeId: ? number;
page: ? number;
parentId: ? number;
publicMenu: ? boolean;
title: ? string;

};

interface GetByMenuTypeIdProps {
menuTypeId: ? number;

};

interface GetMenusByUserIdProps {
application: ? string;

};

class MenuController extends APIVersionController {
// @query
                  getById = (key, params: GetByIdProps) => {
const { apiCaller, makeURL } = this;

                   return apiCaller().get(makeURL('/v1/menu', { params }));
}


// @mutation
                  add = (body: AddProps) => {
const { apiCaller, makeURL } = this;
                    
                  return apiCaller().post(makeURL('/v1/menu'), body);
}


// @mutation
                  edit = (body: EditProps) => {
const { apiCaller, makeURL } = this;
                    
                  return apiCaller().put(makeURL('/v1/menu'), body);
}


// @mutation
                  delete = (key, params: DeleteProps) => {
const { apiCaller, makeURL } = this;

                   return apiCaller().delete(makeURL('/v1/menu', { params }));
}


// @mutation
                  assignApiChannels = (body: AssignApiChannelsProps) => {
const { apiCaller, makeURL } = this;
                    
                  return apiCaller().put(makeURL('/v1/menu/assignApiChannels'), body);
}


// @mutation
                  changeMenuStatus = (body: ChangeMenuStatusProps) => {
const { apiCaller, makeURL } = this;
                    
                  return apiCaller().put(makeURL('/v1/menu/changeStatus'), body);
}


// @query
                  getDeletableStatus = (key, params: GetDeletableStatusProps) => {
const { apiCaller, makeURL } = this;

                   return apiCaller().get(makeURL('/v1/menu/getDeletableStatus', { params }));
}


// @query
                  getMenuApiChannelByUserId = (key, params: GetMenuApiChannelByUserIdProps) => {
const { apiCaller, makeURL } = this;

                   return apiCaller().get(makeURL('/v1/menu/getMenuApiChannelByUserId', { params }));
}


// @mutation
                  unAssignApiChannels = (body: UnAssignApiChannelsProps) => {
const { apiCaller, makeURL } = this;
                    
                  return apiCaller().put(makeURL('/v1/menu/unAssignApiChannels'), body);
}


// @query
                  getAll = (key, params: GetAllProps) => {
const { apiCaller, makeURL } = this;

                   return apiCaller().get(makeURL('/v1/menus', { params }));
}


// @query
                  getByParentId = (key, params: GetByParentIdProps) => {
const { apiCaller, makeURL } = this;

                   return apiCaller().get(makeURL('/v1/menus/', { params }));
}


// @query
                  getByFilter = (key, params: GetByFilterProps) => {
const { apiCaller, makeURL } = this;

                   return apiCaller().get(makeURL('/v1/menus/getByFilter', { params }));
}


// @query
                  getByMenuTypeId = (key, params: GetByMenuTypeIdProps) => {
const { apiCaller, makeURL } = this;

                   return apiCaller().get(makeURL('/v1/menus/getByMenuTypeId', { params }));
}


// @query
                  getMenusByUserId = (key, params: GetMenusByUserIdProps) => {
const { apiCaller, makeURL } = this;

                   return apiCaller().get(makeURL('/v1/menus/getByUserId', { params }));
}
}

                  export const menuController = new MenuController();
                  

























