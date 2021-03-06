import { Options as PrettierOptions } from 'prettier';
import {
  OverallProps,
  MethodType,
  PathProps,
  Path,
  SwaggerSchema,
  parser,
} from './Parser';
import { RequireOnlyOne } from './utils';
import { schemaProvider } from './schemaProvider';
import { SingletonWriterPropsProvider } from './SingletonWriterPropsProvider';
import { Writer } from './Writer';

export interface Plugin {
  main: (
    overallProps: OverallProps,
  ) => (
    urlPath: [string, Path],
  ) => (methodPathProps: [MethodType, PathProps]) => any;
  imports?: string | string[];
}

type GeneratorProps = RequireOnlyOne<
  {
    schemaURL: string;
    schemaPath: string;
    plugin: Plugin;
    prettierOptions?: PrettierOptions;
  },
  'schemaPath' | 'schemaURL'
>;

export class Generator {
  constructor(private generatorProps: GeneratorProps) {}

  public async generate() {
    const {
      schemaPath,
      plugin,
      schemaURL,
      prettierOptions,
    } = this.generatorProps;

    try {
      const jsonSchema = JSON.parse(
        await schemaProvider({ schemaPath, schemaURL }),
      ) as SwaggerSchema;

      parser.schema = jsonSchema;

      const {
        host,
        basePath,
        paths,
      } = parser.convertURLPathParametersToTemplateStringVar().schema;

      const { main, imports } = plugin;
      const urlPathFunc = main({ host, basePath });
      const urlPathList = Object.entries(paths);
      const methodPathPropsFuncList = urlPathList.map(urlPathFunc);
      urlPathList.map(([, path], idx) =>
        Object.entries(path).map(methodPathProps =>
          methodPathPropsFuncList[idx](
            methodPathProps as [MethodType, PathProps],
          ),
        ),
      );

      SingletonWriterPropsProvider.addImports(imports);
      const writerProps = SingletonWriterPropsProvider.produceWriterProps();

      await new Writer(writerProps)
        .concatWritePatitions()
        .concatImportToWriteContent()
        .formatWriteContent(prettierOptions)
        .write();
    } catch (err) {
      console.error(err);
    }
  }
}
