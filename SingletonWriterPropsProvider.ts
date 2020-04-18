import { WritePartition, WriterProps } from './Writer';
import { flatten, createMd5 } from './utils';
import { WrappedObject, isInstanceOfWrappedObject } from './plugin-helpers';

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
      SingletonWriterPropsProvider.addContentToWritePartition(
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

  static addContentToWritePartition = (
    targetWritePartition: WritePartition,
  ) => (
    toAddFilePath: string,
    toAddContent: string | string[] | WrappedObject,
  ) => {
    let toAddContentTemp = toAddContent;

    let wrapperKey = '';
    if (isInstanceOfWrappedObject(toAddContentTemp)) {
      while (isInstanceOfWrappedObject(toAddContentTemp.toWrapContent)) {
        toAddContentTemp.toWrapContent = SingletonWriterPropsProvider.addContentToWritePartition(
          targetWritePartition,
        )(toAddFilePath, {
          ...toAddContentTemp.toWrapContent,
          wrapperLevel: toAddContentTemp.toWrapContent.wrapperLevel + 1,
        });
      }

      if (Array.isArray(toAddContentTemp.toWrapContent)) {
        toAddContentTemp.toWrapContent = flatten(
          toAddContentTemp.toWrapContent,
        ).join('\n'.repeat(2));
      }

      wrapperKey = createMd5(
        JSON.stringify({
          wrapperStartWith: toAddContentTemp.wrapperStartWith,
          wrapperEndWith: toAddContentTemp.wrapperEndWith,
        }),
      );

      const { wrappedWriteContent } = SingletonWriterPropsProvider;

      const wrapperFile = wrappedWriteContent.get(toAddFilePath);
      const prevWrapper = wrapperFile?.get(wrapperKey);

      if (wrapperFile && prevWrapper) {
        const previousWrappedContent = prevWrapper.toWrapContent as string;

        wrapperFile.set(wrapperKey, {
          ...prevWrapper,

          toWrapContent: previousWrappedContent
            .concat('\n'.repeat(3))
            .concat(toAddContentTemp.toWrapContent),
        });
      } else if (wrapperFile) {
        wrapperFile.set(wrapperKey, toAddContentTemp as WrappedObject);

        toAddContentTemp = !toAddContentTemp.wrapperLevel ? wrapperKey : '';
      } else {
        const wrapper = new Map<string, WrappedObject>();

        wrapper.set(wrapperKey, toAddContentTemp);

        wrappedWriteContent.set(toAddFilePath, wrapper);

        toAddContentTemp = !toAddContentTemp.wrapperLevel ? wrapperKey : '';
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

    return wrapperKey;
  };

  static produceWriterProps = (): WriterProps => {
    const {
      imports,
      writePartitions,
      wrappedWriteContent,
    } = SingletonWriterPropsProvider;

    // Sort WriteContents based on wrapperLevel
    wrappedWriteContent.forEach((files, fileName) => {
      const sortedWriteContent = [...files.entries()].sort(
        (a, b) => a[1].wrapperLevel - b[1].wrapperLevel,
      );

      wrappedWriteContent.set(fileName, new Map(sortedWriteContent as any));
    });

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
