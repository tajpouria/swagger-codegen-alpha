import { writeFile } from './utils';
import prettier, { Options as PrettierOptions } from 'prettier';

export interface WriterProps {
  imports: string;
  writeContent: WriteContent;
}

export type WriteContent = Map<string, string>;

export class Writer {
  constructor(private props: WriterProps) {}

  public concatImportToWriteContent = () => {
    const { imports, writeContent } = this.props;

    writeContent.forEach((value, key) =>
      this.props.writeContent.set(
        key,
        imports.concat('\n'.repeat(3)).concat(value),
      ),
    );

    return this;
  };

  public formatWriteContent = (
    prettierOptions: PrettierOptions = { parser: 'babel' },
  ) => {
    const { writeContent } = this.props;

    writeContent.forEach((value, key) => {
      const formattedContent = prettier.format(value, prettierOptions);

      this.props.writeContent.set(key, formattedContent);
    });

    return this;
  };

  public async write() {
    const { writeContent } = this.props;

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
