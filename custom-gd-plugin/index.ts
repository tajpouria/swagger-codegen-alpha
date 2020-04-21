import { Plugin } from '..';
import {
  parseParametersInfo,
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
    imports: [
      `// @flow`,
      `import { APIVersionController } from 'src/controller/APIVersionController';`,
    ],

    main: () => ([url]) => ([method, pathProps]) => {
      const [addToDefintion, addToController] = useAddToWritePartition([
        'Definition',
        'Controller',
      ]);

      const { tags, summary, operationId, parameters } = pathProps;

      const paramsInfo = parseParametersInfo(parameters);

      tags?.forEach(tag => {
        if (tagNamesToInclude.includes(tag)) {
          const FILE_PATH = path.resolve(generatedDirectroyPath, `${tag}.js`),
            CONTOROLLER_NAME = capitalizeFirstLetter(hypensToCamelCase(tag)),
            METHOD_NAME = summary || operationId,
            METHOD_PROPS_NAME = `${capitalizeFirstLetter(
              summary || operationId || '',
            )}Props`,
            CONTOROLLER_INSTANCE_NAME = hypensToCamelCase(tag);

          switch (method) {
            case 'get':
              addToDefintion(
                FILE_PATH,
                wrap(
                  `interface ${METHOD_PROPS_NAME} {`,
                  paramsInfo.query.reduce(
                    (acc, q) =>
                      q
                        ? acc.concat(
                            `${q.name}: ${!q.required ? '?' : ''} ${q.type};\n`,
                          )
                        : acc,

                    '',
                  ),
                  `};`,
                ),
              );

              addToController(
                FILE_PATH,

                wrap(
                  `class ${CONTOROLLER_NAME} extends APIVersionController {`,

                  wrap(
                    `// @query
                  ${METHOD_NAME} = (key, params: ${METHOD_PROPS_NAME}) => {`,

                    `const { apiCaller, makeURL } = this;

                   return apiCaller().get(makeURL('${url}', { params }));`,

                    `}`,
                  ),

                  `}

                  export const ${CONTOROLLER_INSTANCE_NAME} = new ${CONTOROLLER_NAME}();
                  `,
                ),
              );
              break;

            case 'post':
              addToController(
                FILE_PATH,

                wrap(
                  `class ${CONTOROLLER_NAME} extends APIVersionController {`,

                  wrap(
                    `// @mutation
                  ${METHOD_NAME} = (body: ${METHOD_PROPS_NAME}) => {`,

                    `const { apiCaller, makeURL } = this;
                    
                  return apiCaller().post(makeURL('${url}'), body);`,

                    `}`,
                  ),

                  `}

                  export const ${CONTOROLLER_INSTANCE_NAME} = new ${CONTOROLLER_NAME}();
                  `,
                ),
              );
              break;

            case 'put':
              addToController(
                FILE_PATH,

                wrap(
                  `class ${CONTOROLLER_NAME} extends APIVersionController {`,

                  wrap(
                    `// @mutation
                  ${METHOD_NAME} = (body: ${METHOD_PROPS_NAME}) => {`,

                    `const { apiCaller, makeURL } = this;
                    
                  return apiCaller().put(makeURL('${url}'), body);`,

                    `}`,
                  ),

                  `}

                  export const ${CONTOROLLER_INSTANCE_NAME} = new ${CONTOROLLER_NAME}();
                  `,
                ),
              );
              break;

            case 'delete':
              addToController(
                FILE_PATH,

                wrap(
                  `class ${CONTOROLLER_NAME} extends APIVersionController {`,

                  wrap(
                    `// @mutation
                  ${METHOD_NAME} = (key, params: ${METHOD_PROPS_NAME}) => {`,

                    `const { apiCaller, makeURL } = this;

                   return apiCaller().delete(makeURL('${url}', { params }));`,

                    `}`,
                  ),

                  `}

                  export const ${CONTOROLLER_INSTANCE_NAME} = new ${CONTOROLLER_NAME}();
                  `,
                ),
              );

              break;
          }
        }
      });
    },
  };
}

function hypensToCamelCase(str: string) {
  return str.replace(/-([a-z])/g, g => g[1].toUpperCase());
}

function capitalizeFirstLetter(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}
