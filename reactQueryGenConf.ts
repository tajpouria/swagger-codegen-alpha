import { Generator } from '.';

import reactQueryPlugin from './react-query-plugin';

(async () => {
  const gen = new Generator({
    schemaPath: './data-models/petstore-simple.json',
    generatedFilePath: './apis.js',
    plugin: reactQueryPlugin(),
  });

  await gen.generate();
})();
