import { Parameter } from './Parser';
import { SingletonWriterPropsProvider } from './SingletonWriterPropsProvider';

export function useQueryParmas(parameters: Parameter[]): [string[], string] {
  const queryParams: string[] = [];

  parameters.forEach(par => par.in === 'query' && queryParams.push(par.name));

  const consumeQueryParams = `\${qs({${queryParams.reduce(
    (acc, qp) => `${acc} ${qp},`,
    '',
  )}})}`;

  SingletonWriterPropsProvider.addImports("import qs from 'qs'");

  return [queryParams, consumeQueryParams];
}

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
