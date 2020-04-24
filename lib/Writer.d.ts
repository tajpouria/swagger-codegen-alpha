import prettier from 'prettier';
export interface WriterProps {
    imports: string;
    writePartitions: Record<string, WritePartition>;
}
export declare type WritePartition = Map<string, string>;
export declare class Writer {
    private props;
    private writeContent;
    constructor(props: WriterProps);
    concatWritePatitions: () => this;
    concatImportToWriteContent: () => this;
    formatWriteContent: (prettierOptions?: prettier.Options) => this;
    write(): Promise<void>;
}
