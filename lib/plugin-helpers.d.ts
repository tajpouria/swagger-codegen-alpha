import { Parameter } from './Parser';
import { ParamterInfo } from './paramHelpers';
export declare const useAddToWritePartition: (partitions: string[]) => ((toAddFilePath: string, toAddContent: string | string[] | WrappedObject) => string)[];
export declare const wrap: (wrapperStartWith: string, toWrapContent: string | string[] | WrappedObject, wrapperEndWith: string, wrapperLevel?: number) => WrappedObject;
export interface WrappedObject {
    wrapperStartWith: string;
    wrapperEndWith: string;
    toWrapContent: string | string[] | WrappedObject;
    wrapperLevel: number;
}
export declare function isInstanceOfWrappedObject(object: any): object is WrappedObject;
export declare const parseParametersInfo: (parametes: Parameter[]) => {
    body: ParamterInfo[];
    header: ParamterInfo[];
    path: ParamterInfo[];
    query: ParamterInfo[];
};
