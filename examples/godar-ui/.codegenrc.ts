import { Generator } from 'swagger-codegen-alpha';

import gdPlugin from './godar-plugin';

(async () => {
  const gen = new Generator({
    schemaURL: 'URL',
    plugin: gdPlugin({
      tagNamesToInclude: [
        'channel-controller',
        'role-controller',
        'organization-controller',
        'tag-controller',
        'api-controller',
        'menu-controller',
        'user-controller',
      ],
      generatedDirectoryPath: './src/controller',
    }),
    prettierOptions: { parser: 'babel-flow' },
  });

  await gen.generate();
})();
