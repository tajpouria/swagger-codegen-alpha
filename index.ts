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
