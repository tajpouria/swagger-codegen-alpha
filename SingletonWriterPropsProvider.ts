import { WriteContent, WriterProps } from './Writer';
import { flatten } from './utils';

export abstract class SingletonWriterPropsProvider {
  static imports: Set<string> = new Set();
  static writeContent: WriteContent = {};

  static addImports = (newimport: string | string[]) => {
    if (Array.isArray(newimport)) {
      newimport.forEach(imp => SingletonWriterPropsProvider.addImports(imp));
    } else {
      SingletonWriterPropsProvider.imports.add(newimport);
    }
  };

  static addWriteContent = (
    toAddFilePath: string,
    toAddContent: string | string[] | string[][],
  ) => {
    const { writeContent } = SingletonWriterPropsProvider;

    const prevFileContent = writeContent[toAddFilePath];

    let toAddContentTemp = toAddContent;

    if (Array.isArray(toAddContentTemp)) {
      toAddContentTemp = flatten(toAddContentTemp, Infinity).join('\n');
    }

    if (prevFileContent) {
      SingletonWriterPropsProvider.writeContent[
        toAddFilePath
      ] = prevFileContent.concat('\n\n').concat(toAddContentTemp);
    } else {
      SingletonWriterPropsProvider.writeContent[
        toAddFilePath
      ] = toAddContentTemp;
    }
  };

  static produceWriterProps = (): WriterProps => {
    const { imports, writeContent } = SingletonWriterPropsProvider;

    return { imports: [...imports].join('\n'), writeContent };
  };
}
