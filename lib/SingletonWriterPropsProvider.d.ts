import { WritePartition, WriterProps } from './Writer';
import { WrappedObject } from './plugin-helpers';
export declare abstract class SingletonWriterPropsProvider {
    static imports: Set<string>;
    static writePartitions: Record<string, WritePartition>;
    static wrappedWriteContent: Map<string, Map<string, WrappedObject>>;
    static createWritePartitons: (partitions: string[]) => ((toAddFilePath: string, toAddContent: string | string[] | WrappedObject) => string)[];
    static addImports: (newimport?: string | string[]) => typeof SingletonWriterPropsProvider;
    static addContentToWritePartition: (targetWritePartition: WritePartition) => (toAddFilePath: string, toAddContent: string | string[] | WrappedObject) => string;
    static produceWriterProps: () => WriterProps;
}
