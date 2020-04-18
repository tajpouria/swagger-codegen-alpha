import { Plugin } from '..';
import {
  useQueryParmas,
  useAddToWritePartition,
  wrap,
} from '../plugin-helpers';
import path from 'path';

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
      const [addToDefintion, addToController] = useAddToWritePartition([
        'definition',
        'controller',
      ]);

      const { tags, summary, operationId } = pathProps;

      tags?.forEach(tag => {
        if (tagNamesToInclude.includes(tag)) {
          const FILE_PATH = path.resolve(generatedDirectroyPath, `${tag}.js`),
            METHOD_NAME = summary || operationId;

          switch (method) {
            case 'get':
              addToController(
                FILE_PATH,

                wrap(
                  `// @query
                  ${METHOD_NAME} = (key, params: ${METHOD_NAME}Props) => {`,
                  `const { apiCaller, makeURL } = this;

                   return apiCaller().get(makeURL('${url}', { params }));`,
                  `}`,
                ),
              );
              break;

            case 'post':
              addToController(
                FILE_PATH,

                wrap(
                  `// @mutation
                  ${METHOD_NAME} = (body: ${METHOD_NAME}Props) => {`,
                  `const { apiCaller, makeURL } = this;
                    
                  return apiCaller().post(makeURL('${url}'), body);`,
                  `}`,
                ),
              );
              break;

            case 'put':
              addToController(
                FILE_PATH,

                wrap(
                  `// @mutation
                  ${METHOD_NAME} = (body: ${METHOD_NAME}Props) => {`,
                  `const { apiCaller, makeURL } = this;
                    
                  return apiCaller().put(makeURL('${url}'), body);`,
                  `}`,
                ),
              );
              break;

            case 'delete':
              addToController(
                FILE_PATH,

                wrap(
                  `// @mutation
                  ${METHOD_NAME} = (body: ${METHOD_NAME}Props) => {`,
                  `const { apiCaller, makeURL } = this;
                    
                  return apiCaller().put(makeURL('${url}'), { params });`,
                  `}`,
                ),
              );
              break;
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
