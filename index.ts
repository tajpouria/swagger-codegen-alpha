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
  generatedFilePath: string;
  plugin: Plugin;
}

export async function generate({
  schemaPath,
  generatedFilePath,
  plugin,
}: GenerateArgs) {
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
    const {
      basePath,
      host,
      paths,
    } = parser.convertURLPathParametersToTemplateStringVar().schema;

    const { main, imports } = plugin;

    const urlPathFunc = main({ basePath, host });

    const urlPathList = Object.entries(paths);

    const methPathPropsFunc = urlPathList.map(urlPathFunc);

    const content = urlPathList.map(([, path]) =>
      Object.entries(path).map((methPath, idx) =>
        methPathPropsFunc[idx](methPath as any),
      ),
    );

    const w = new Writer({ imports, generatedFilePath, content });

    await w.write();
  } catch (err) {
    console.error(err);
  }
}

interface WriterProps {
  imports: string[];
  generatedFilePath: string;
  content: string[] | string[][];
}

class Writer {
  private fileStuff: string[] = [];

  constructor(private props: WriterProps) {
    const { imports, content } = props;

    this.fileStuff.push(imports.join('\n'));
    this.fileStuff.push(flatten(content).join('\n\n').replace(/('|")/g, '`'));
  }

  async write() {
    const {
      props: { generatedFilePath },
      fileStuff,
    } = this;

    try {
      await writeFile(generatedFilePath, fileStuff.join('\n\n'), {
        encoding: 'utf-8',
      });
    } catch (err) {
      console.error(err);
    }
  }
}
