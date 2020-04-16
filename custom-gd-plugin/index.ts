import { Plugin } from '..';
import { useQueryParmas } from '../plugin-helpers';

interface CostomGdPluginProps {
  tagNamesToInclude: string[];
}

export default function ({ tagNamesToInclude }: CostomGdPluginProps): Plugin {
  return {
    main: ({ host, basePath }) => ([url, path]) => ([method, pathProps]) => {
      const { tags } = pathProps;

      if (tags?.some(tag => tagNamesToInclude.includes(tag))) {
        console.log(url, method);
        switch (method) {
          case 'get':
            return '';
        }
      }

      return '';
    },
    imports: [],
  };
}
