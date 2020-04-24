import { Plugin } from '..';
import { ParameterType } from '../Parser';
import { ParamterInfo } from '../paramHelpers';
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
            CONTOROLLER_INSTANCE_NAME = hypensToCamelCase(tag),
            URL = removeVersionFromUrl(url);

          switch (method) {
            case 'get':
              addToDefintion(
                FILE_PATH,
                wrap(
                  `interface ${METHOD_PROPS_NAME} {`,

                  paramsTointerfaceContent(paramsInfo, 'query'),

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

                   return apiCaller().get(makeURL('${URL}', { params }));`,

                    `}`,
                  ),

                  `}

                  export const ${CONTOROLLER_INSTANCE_NAME} = new ${CONTOROLLER_NAME}();
                  `,
                ),
              );
              break;

            case 'post':
              addToDefintion(
                FILE_PATH,
                wrap(
                  `interface ${METHOD_PROPS_NAME} {`,

                  paramsTointerfaceContent(paramsInfo, 'body'),

                  `};`,
                ),
              );

              addToController(
                FILE_PATH,

                wrap(
                  `class ${CONTOROLLER_NAME} extends APIVersionController {`,

                  wrap(
                    `// @mutation
                  ${METHOD_NAME} = (body: ${METHOD_PROPS_NAME}) => {`,

                    `const { apiCaller, makeURL } = this;
                    
                  return apiCaller().post(makeURL('${URL}'), body);`,

                    `}`,
                  ),

                  `}

                  export const ${CONTOROLLER_INSTANCE_NAME} = new ${CONTOROLLER_NAME}();
                  `,
                ),
              );
              break;

            case 'put':
              addToDefintion(
                FILE_PATH,
                wrap(
                  `interface ${METHOD_PROPS_NAME} {`,

                  paramsTointerfaceContent(paramsInfo, 'body'),

                  `};`,
                ),
              );

              addToController(
                FILE_PATH,

                wrap(
                  `class ${CONTOROLLER_NAME} extends APIVersionController {`,

                  wrap(
                    `// @mutation
                  ${METHOD_NAME} = (body: ${METHOD_PROPS_NAME}) => {`,

                    `const { apiCaller, makeURL } = this;
                    
                  return apiCaller().put(makeURL('${URL}'), body);`,

                    `}`,
                  ),

                  `}

                  export const ${CONTOROLLER_INSTANCE_NAME} = new ${CONTOROLLER_NAME}();
                  `,
                ),
              );
              break;

            case 'delete':
              addToDefintion(
                FILE_PATH,
                wrap(
                  `interface ${METHOD_PROPS_NAME} {`,

                  paramsTointerfaceContent(paramsInfo, 'query'),

                  `};`,
                ),
              );

              addToController(
                FILE_PATH,

                wrap(
                  `class ${CONTOROLLER_NAME} extends APIVersionController {`,

                  wrap(
                    `// @mutation
                  ${METHOD_NAME} = (key, params: ${METHOD_PROPS_NAME}) => {`,

                    `const { apiCaller, makeURL } = this;

                   return apiCaller().delete(makeURL('${URL}', { params }));`,

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

function removeVersionFromUrl(url: string, versionKeyWord = 'v1') {
  const splittedUrl = url.split('/');

  if (splittedUrl[1] === versionKeyWord) {
    splittedUrl.splice(1, 1);
  }

  return splittedUrl.join('/');
}

function hypensToCamelCase(str: string) {
  return str.replace(/-([a-z])/g, g => g[1].toUpperCase());
}

function capitalizeFirstLetter(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

function paramsTointerfaceContent(
  paramsInfo: ReturnType<typeof parseParametersInfo>,
  paramType: ParameterType,
) {
  let targetParams = paramsInfo[paramType];

  if (paramType === 'body' && Array.isArray(targetParams[0]?.type)) {
    //@ts-ignore
    targetParams = targetParams[0].type;
  }

  return targetParams.reduce(
    (acc, q) =>
      q ? acc.concat(`${q.name}: ${!q.required ? '?' : ''} ${q.type};\n`) : acc,

    '',
  );
}
