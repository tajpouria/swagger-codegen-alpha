import { writeFile } from './utils';
import prettier, { Options as PrettierOptions } from 'prettier';

export interface WriterProps {
  imports: string;
  writePartitions: Record<string, WritePartition>;
}

export type WritePartition = Map<string, string>;

export class Writer {
  private writeContent: Map<string, string> = new Map();

  constructor(private props: WriterProps) {}

  public concatWritePatitions = () => {
    const {
      writeContent,
      props: { writePartitions },
    } = this;

    Object.entries(writePartitions).forEach(([partionName, partitions]) => {
      partitions.forEach((partVal, partFileName) => {
        const previousWriteContent = writeContent.get(partFileName);

        if (previousWriteContent) {
          writeContent.set(
            partFileName,
            previousWriteContent.concat('\n'.repeat(2).concat(partVal)),
          );
        } else {
          writeContent.set(
            partFileName,
            `//${partionName}`.concat('\n'.repeat(2)).concat(partVal),
          );
        }
      });
    });

    return this;
  };

  public concatImportToWriteContent = () => {
    const {
      writeContent,
      props: { imports },
    } = this;

    writeContent.forEach((value, key) =>
      writeContent.set(key, imports.concat('\n'.repeat(3)).concat(value)),
    );

    return this;
  };

  public formatWriteContent = (
    prettierOptions: PrettierOptions = { parser: 'babel' },
  ) => {
    const { writeContent } = this;

    writeContent.forEach((value, key) => {
      const formattedContent = prettier.format(value, prettierOptions);

      writeContent.set(key, formattedContent);
    });

    return this;
  };

  public async write() {
    const { writeContent } = this;

    const writingPromises: Promise<void>[] = [];

    writeContent.forEach((value, key) =>
      writingPromises.push(
        writeFile(key, value, {
          encoding: 'utf-8',
        }),
      ),
    );

    try {
      await Promise.all(writingPromises);
    } catch (err) {
      console.error(err);
    }
  }
}
