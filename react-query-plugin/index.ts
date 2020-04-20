import { Plugin } from '..';
import { useQueryParams } from '../plugin-helpers';

export default function (config = {}): Plugin {
  return {
    main: ({ basePath, host }) => ([url]) => ([method, pathProps]) => {
      const { operationId, parameters } = pathProps;

      const [queryParams, consumeQueryParams] = useQueryParams(parameters);

      switch (method) {
        case 'get':
          return `export function use${operationId}Query(${queryParams.reduce(
            (acc, qs) => `${acc} ${qs},`,
            '',
          )}){
          const { status, data, error } = useQuery('${operationId}', fetch('http://${host}${basePath}${url}${consumeQueryParams}'));
          return { status, data, error } 
        }`;

        case 'post':
        case 'delete':
          return `export function use${operationId}Mutation(){
          const [mutate, {status, error, data}] = useMutation(({id}) => fetch('http://${host}${basePath}${url}'))

            return { mutate, status, error, data }
        }`;

        default:
          return '';
      }
    },
    imports: [`import { useQuery, useMutation } from 'react-query'`],
  };
}
