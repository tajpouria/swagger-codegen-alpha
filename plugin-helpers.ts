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
  toWrapContent: string | string[],
  wrapperEndWith: string,
): WrappedObject => ({
  wrapperStartWith,
  wrapperEndWith,
  toWrapContent,
});

export interface WrappedObject {
  wrapperStartWith: string;
  wrapperEndWith: string;
  toWrapContent: string | string[];
}
