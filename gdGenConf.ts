import { Generator } from '.';

import gdPlugin from './custom-gd-plugin';

(async () => {
  const gen = new Generator({
    schemaURL: 'http://5.201.133.137:12874/api/godar-aggregator/v2/api-docs',
    plugin: gdPlugin({
      tagNamesToInclude: [
        'channel-controller',
        'role-controller',
        'organization-controller',
        'tag-controller',
        'api-controller',
        'menu-controller',
      ],
      generatedDirectroyPath: './gdApiDir',
    }),
  });

  await gen.generate();
})();
