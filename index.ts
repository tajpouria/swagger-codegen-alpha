import {
  Parser,
  OverallProps,
  MethodType,
  PathProps,
  Path,
  SwaggerSchema,
} from './Parser';
import { flatten, writeFile, RequireOnlyOne } from './utils';
import { schemaProvider } from './schemaProvider';

export interface Plugin {
  main: (
    overallProps: OverallProps,
  ) => (
    urlPath: [string, Path],
  ) => (methodPathProps: [MethodType, PathProps]) => string;
  imports: string[];
}

type GeneratorProps = RequireOnlyOne<
  {
    schemaURL: string;
    schemaPath: string;
    generatedFilePath: string;
    plugin: Plugin;
  },
  'schemaPath' | 'schemaURL'
>;

export class Generator {
  constructor(private generatorProps: GeneratorProps) {}

  public async generate() {
    const {
      schemaPath,
      generatedFilePath,
      plugin,
      schemaURL,
    } = this.generatorProps;

    try {
      const jsonSchema = JSON.parse(
        await schemaProvider({ schemaPath, schemaURL }),
      ) as SwaggerSchema;

      const parser = new Parser(jsonSchema);

      const {
        host,
        basePath,
        paths,
      } = parser.convertURLPathParametersToTemplateStringVar().schema;

      const { main, imports } = plugin;

      const urlPathFunc = main({ host, basePath });

      const urlPathList = Object.entries(paths);

      const methodPathPropsFuncList = urlPathList.map(urlPathFunc);

      const content = urlPathList.map(([, path], idx) =>
        Object.entries(path).map(methodPathProps =>
          methodPathPropsFuncList[idx](
            methodPathProps as [MethodType, PathProps],
          ),
        ),
      );

      const w = new Writer({ imports, generatedFilePath, content });

      w.write();
    } catch (err) {
      console.error(err);
    }
  }
}

interface WriterProps {
  imports: string[];
  generatedFilePath: string;
  content: string[] | string[][];
}

export class Writer {
  private fileStuff: string[] = [];

  constructor(private props: WriterProps) {
    const { imports, content } = props;
    const { addedByHelpers } = Writer;

    this.fileStuff.push([...imports, ...addedByHelpers.imports].join('\n'));
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

  static addedByHelpers: AddedByHelpersProps = { imports: new Set() };

  static addImports = (newimport: string) =>
    Writer.addedByHelpers.imports.add(newimport);
}

interface AddedByHelpersProps {
  imports: Set<string>;
}
