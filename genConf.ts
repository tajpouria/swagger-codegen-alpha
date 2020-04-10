import { generate } from '.';

import reactQueryPlugin from './react-query-plugin';

(async () => {
  await generate({
    schemaPath: './data-models/petstore-simple.json',
    generatedFilePath: './apis.js',
    plugin: reactQueryPlugin(),
  });
})();
