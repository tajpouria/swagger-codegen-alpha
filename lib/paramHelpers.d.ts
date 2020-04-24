import { Parameter } from './Parser';
declare type ResolveParameterInfoInputParamter = Omit<Parameter, 'in'>;
export declare function resolveParameterInfo(parameter: ResolveParameterInfoInputParamter): ParamterInfo;
export interface ParamterInfo {
    name: string;
    type: ParameterInfoType;
    required: boolean;
}
declare type ParameterInfoType = string | PrimitiveParamterInfoType | ParamterInfo[];
declare type PrimitiveParamterInfoType = 'string' | 'number' | 'boolean';
export {};
