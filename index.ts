import {
  Parser,
  SwaggerSchema,
  OverallProps,
  MethodType,
  PathProps,
  Path,
} from './Parser';
import { flatten, readFile, writeFile } from './utils';

export interface Plugin {
  main: (
    overallProps: OverallProps,
  ) => (
    urlPath: [string, Path],
  ) => (methodPathProps: [MethodType, PathProps]) => string;
  imports: string[];
}

interface GenerateArgs {
  schemaPath: string;
  plugin: Plugin;
}

export async function generate({ schemaPath, plugin }: GenerateArgs) {
  try {
    const petSchema = JSON.parse(
      await readFile(schemaPath, 'utf-8'),
    ) as SwaggerSchema;

    const parser = new Parser(petSchema);

    // Using main
    //const overallProps: OverallProps = { basePath, host };
    //const mainIter = generateArgs.main(overallProps);
    //const imports = generateArgs.imports;
    //const gen = Object.entries(paths).map(mainIter);
    //const content = flatten<string>(gen);
    //writer({ imports, content });

    // Using plugin
    debugger;
    const { basePath, host, paths } = parser.schema;
    const { main, imports } = plugin;

    const urlPathFunc = main({ basePath, host });

    const urlPathList = Object.entries(paths);

    const methPathPropsFunc = urlPathList.map(urlPathFunc);

    const generatedStuff = urlPathList.map(([, path]) =>
      Object.entries(path).map((methPath, idx) =>
        methPathPropsFunc[idx](methPath as any),
      ),
    );

    debugger;
  } catch (err) {
    console.error(err);
  }
}

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
