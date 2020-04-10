import { Parameter } from './Parser';
import { Writer } from '.';

export function useQueryParmas(parameters: Parameter[]): [string[], string] {
  const queryParams: string[] = [];

  parameters.forEach(par => par.in === 'query' && queryParams.push(par.name));

  const consumeQueryParams = `\${qs({${queryParams.reduce(
    (acc, qp) => `${acc} ${qp},`,
    '',
  )}})}`;

  Writer.addImports("import qs from 'qs'");

  return [queryParams, consumeQueryParams];
}
