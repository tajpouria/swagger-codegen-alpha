import fs from 'fs';
import { promisify } from 'util';

import { Parser, SwaggerSchema, OverallProps } from './Parser';
import { flatten } from './utils';

const readFile = promisify(fs.readFile);
const writeFile = promisify(fs.writeFile);

import userConf from './gen';

(async () => {
  try {
    const petSchema = JSON.parse(
      await readFile('./data-models/petstore-simple.json', 'utf-8'),
    ) as SwaggerSchema;

    const parser = new Parser(petSchema);

    const { basePath, host, paths } = parser.schema;

    const overallProps: OverallProps = { basePath, host };

    const mainIter = userConf.main(overallProps);
    const imports = userConf.imports;

    const gen = Object.entries(paths).map(mainIter);

    const content = flatten<string>(gen);

    writer({ imports, content });
  } catch (err) {
    console.error(err);
  }
})();

interface WriterArgs {
  imports: string[];
  content: string[];
}

async function writer({ imports, content }: WriterArgs) {
  const tmp = `${imports.join('\n')}\n${content.join('\n')}`;

  try {
    await writeFile('./apis.js', tmp, { encoding: 'utf-8' });
  } catch (err) {
    console.error(err);
  }
}
