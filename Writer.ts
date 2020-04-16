import { writeFile } from './utils';

export interface WriterProps {
  imports: string;
  writeContent: WriteContent;
}

export interface WriteContent {
  [fileName: string]: string;
}

export class Writer {
  constructor(private props: WriterProps) {}

  async write() {
    const {
      props: { imports, writeContent },
    } = this;

    try {
      await Promise.all(
        Object.entries(writeContent).map(([filePath, fileContent]) =>
          writeFile(filePath, imports.concat('\n\n').concat(fileContent), {
            encoding: 'utf-8',
          }),
        ),
      );
    } catch (err) {
      console.error(err);
    }
  }
}
