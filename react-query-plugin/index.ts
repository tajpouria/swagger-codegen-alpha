import { useQuery, useMutation } from 'react-query';
import { Plugin } from '..';

export default function (config = {}): Plugin {
  return {
    main: ({ basePath, host }) => ([url]) => ([method, pathProps]) => {
      const { operationId } = pathProps;

      switch (method) {
        case 'get':
          return `export function use${operationId}Query(){
          const { status, data, error } = useQuery('${operationId}', fetch('http://${host}${basePath}${url}'));

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
