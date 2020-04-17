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
    main: () => ([url]) => ([method, pathProps]) => {
      const addToFile = useAddToFile(generatedDirectroyPath);
      const { tags, summary, operationId } = pathProps;

      tags?.forEach(tag => {
        if (tagNamesToInclude.includes(tag)) {
          const FILE_NAME = `${tag}.js`,
            METHOD_NAME = summary || operationId;

          switch (method) {
            case 'get':
              addToFile(
                FILE_NAME,

                `// @query
                ${METHOD_NAME} = (key, params: ${METHOD_NAME}Props) => {
                const { apiCaller, makeURL } = this;

                return apiCaller().get(makeURL('${url}', { params }));
            };`,
              );
              break;

            case 'post':
              addToFile(
                FILE_NAME,

                `// @mutation
                ${METHOD_NAME} = (body: ${METHOD_NAME}Props) => {
                const { apiCaller, makeURL } = this;

                return apiCaller().post(makeURL('${url}'), body);
                };
                `,
              );
              break;

            case 'put':
              addToFile(
                FILE_NAME,

                `// @mutation
              ${METHOD_NAME} = (body: ${METHOD_NAME}Props) => {
              const { apiCaller, makeURL } = this;

              return apiCaller().put(makeURL('${url}'), body);
              };
            `,
              );
          }
        }
      });
    },
    imports: [
      `// @flow`,
      `import { APIVersionController } from 'src/controller/APIVersionController';`,
    ],
  };
}
