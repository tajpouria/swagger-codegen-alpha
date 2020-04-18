import { WritePartition, WriterProps } from './Writer';
import { flatten, isObject, createMd5 } from './utils';
import { WrappedObject } from './plugin-helpers';

export abstract class SingletonWriterPropsProvider {
  static imports: Set<string> = new Set();
  static writePartitions: Record<string, WritePartition> = {};
  static wrappedWriteContent: Map<
    string,
    Map<string, WrappedObject>
  > = new Map();

  static createWritePartitons = (partitions: string[]) => {
    const { writePartitions: writePartions } = SingletonWriterPropsProvider;

    partitions.forEach(par => {
      if (!writePartions[par]) {
        writePartions[par] = new Map();
      }
    });

    return Object.values(writePartions).map(targetWritePartition =>
      SingletonWriterPropsProvider.addContentToWritePartion(
        targetWritePartition,
      ),
    );
  };

  static addImports = (newimport: string | string[]) => {
    if (Array.isArray(newimport)) {
      newimport.forEach(imp => SingletonWriterPropsProvider.addImports(imp));
    } else {
      SingletonWriterPropsProvider.imports.add(newimport);
    }

    return SingletonWriterPropsProvider;
  };

  static addContentToWritePartion = (targetWritePartition: WritePartition) => (
    toAddFilePath: string,
    toAddContent: string | string[] | WrappedObject,
  ) => {
    let toAddContentTemp = toAddContent;

    if (isObject(toAddContentTemp)) {
      const {
        wrapperStartWith,
        wrapperEndWith,
        toWrapContent,
      } = toAddContentTemp as WrappedObject;

      if (Array.isArray(toWrapContent)) {
        (toAddContentTemp as WrappedObject).toWrapContent = flatten(
          toWrapContent,
        ).join('\n'.repeat(2));
      }

      const wrapperKey = createMd5(
        JSON.stringify({ wrapperStartWith, wrapperEndWith }),
      );

      const { wrappedWriteContent } = SingletonWriterPropsProvider;

      const wrapperFile = wrappedWriteContent.get(toAddFilePath);
      const prevWrapper = wrapperFile?.get(wrapperKey) as
        | Map<string, WrappedObject>
        | undefined;

      if (prevWrapper) {
        const previousWrappedContent =
          prevWrapper.get(wrapperKey)?.toWrapContent || '';

        prevWrapper.set(wrapperKey, {
          ...(prevWrapper.get(wrapperKey) as WrappedObject),

          toWrapContent: previousWrappedContent.concat(
            (toAddContentTemp as WrappedObject).toWrapContent as string,
          ),
        });

        toAddContentTemp = '';
      } else if (wrapperFile) {
        wrapperFile.set(wrapperKey, toAddContentTemp as WrappedObject);

        toAddContentTemp = wrapperKey;
      } else {
        const wrapperMap = new Map<string, WrappedObject>();

        wrapperMap.set(wrapperKey, toAddContentTemp as WrappedObject);

        wrappedWriteContent.set(toAddFilePath, wrapperMap);

        toAddContentTemp = wrapperKey;
      }
    } else if (Array.isArray(toAddContentTemp)) {
      toAddContentTemp = flatten(toAddContentTemp, Infinity).join(
        '\n'.repeat(2),
      );
    }

    if (typeof toAddContentTemp === 'string') {
      const prevFileContent = targetWritePartition.get(toAddFilePath);
      if (prevFileContent) {
        targetWritePartition.set(
          toAddFilePath,
          prevFileContent.concat('\n'.repeat(2)).concat(toAddContentTemp),
        );
      } else {
        targetWritePartition.set(toAddFilePath, toAddContentTemp);
      }
    }

    return SingletonWriterPropsProvider;
  };

  static produceWriterProps = (): WriterProps => {
    const {
      imports,
      writePartitions,
      wrappedWriteContent,
    } = SingletonWriterPropsProvider;

    Object.values(writePartitions).forEach(writePartition => {
      wrappedWriteContent.forEach((wrapper, fileName) => {
        let replacedWriteContent = '';
        wrapper.forEach(
          ({ wrapperStartWith, toWrapContent, wrapperEndWith }, wrapperKey) => {
            const toReplaceWriteContent = writePartition.get(fileName);

            if (toReplaceWriteContent) {
              replacedWriteContent = toReplaceWriteContent?.replace(
                new RegExp(wrapperKey, 'g'),
                `${wrapperStartWith}\n${toWrapContent}\n${wrapperEndWith}`,
              );
            }

            if (replacedWriteContent !== toReplaceWriteContent) {
              writePartition.set(fileName, replacedWriteContent);
            }
          },
        );
      });
    });

    return {
      imports: [...imports].join('\n'),
      writePartitions,
    };
  };
}
