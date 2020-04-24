import { Parameter, ParameterType } from './Parser';
import { SingletonWriterPropsProvider } from './SingletonWriterPropsProvider';
import { resolveParameterInfo, ParamterInfo } from './paramHelpers';

export const useAddToWritePartition = (partitions: string[]) =>
  SingletonWriterPropsProvider.createWritePartitons(partitions);

export const wrap = (
  wrapperStartWith: string,
  toWrapContent: string | string[] | WrappedObject,
  wrapperEndWith: string,
  wrapperLevel: number = 0,
): WrappedObject => ({
  wrapperStartWith,
  wrapperEndWith,
  toWrapContent,
  wrapperLevel,
});

export interface WrappedObject {
  wrapperStartWith: string;
  wrapperEndWith: string;
  toWrapContent: string | string[] | WrappedObject;
  wrapperLevel: number;
}

export function isInstanceOfWrappedObject(
  object: any,
): object is WrappedObject {
  return (
    typeof object === 'object' &&
    'wrapperStartWith' in object &&
    'wrapperEndWith' in object &&
    'toWrapContent' in object &&
    'wrapperLevel' in object
  );
}

export const parseParametersInfo = (
  parametes: Parameter[],
): {
  [paramType in ParameterType]: ParamterInfo[];
} => {
  const parametersInfo: { [paramType in ParameterType]: ParamterInfo[] } = {
    query: [],
    path: [],
    body: [],
    header: [],
  };

  parametes.forEach(parameter => {
    const previousParamInfo = parametersInfo[parameter.in];

    parametersInfo[parameter.in] = previousParamInfo.concat(
      resolveParameterInfo(parameter),
    );
  });

  return parametersInfo;
};
