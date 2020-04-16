import { Plugin } from '..';
import { useQueryParmas, useAddToFile } from '../plugin-helpers';

interface CostomGdPluginProps {
  tagNamesToInclude: string[];
  generatedDirectroyPath: string;
}

export default function ({
  tagNamesToInclude,
  generatedDirectroyPath,
}: CostomGdPluginProps): Plugin {
  return {
    main: ({ host, basePath }) => ([url, path]) => ([method, pathProps]) => {
      const addToFile = useAddToFile(generatedDirectroyPath);
      const { tags } = pathProps;

      tags?.forEach(tag => {
        if (tagNamesToInclude.includes(tag)) {
          addToFile(`${tag}.js`, `${url}-${method}`);
        }
      });
    },
    imports: [
      `import { APIVersionController } from 'src/controller/APIVersionController';`,
    ],
  };
}
