import { useQuery, useMutation } from 'react-query';
import { Plugin } from '..';

export default function (config = {}): Plugin {
  return {
    main: ({ basePath, host }) => ([url, path]) => ([method, pathProps]) =>
      `${basePath},${host},${url},${path},${method},${pathProps}`,
    imports: [`import { useQuery, useMutation } from 'react-query'`],
  };
}
