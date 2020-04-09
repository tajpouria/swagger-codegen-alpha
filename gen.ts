import { OverallProps, Path } from './Parser';

export default {
  main: ({ basePath, host }: OverallProps) => {
    return ([url, path]: [string, Path]) => {
      return Object.entries(path).map(([method, pathProps]: any) => {
        const { operationId } = pathProps;

        switch (method) {
          case 'get':
            return `function ${operationId}() {
            return axios.get(${host}${basePath}${url});
          }`;
          case 'post':
            return `function ${operationId}() {
            return axios.post(${host}${basePath}${url}, {body: 1})
          }`;
          case 'delete':
            return `function ${operationId}() {
            return axios.delete(${host}${basePath}${url}, {body: 1})
          }`;
        }
      });
    };
  },
  imports: [`import axios from 'axios'`],
};
