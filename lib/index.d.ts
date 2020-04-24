import { Options as PrettierOptions } from 'prettier';
import { OverallProps, MethodType, PathProps, Path } from './Parser';
import { RequireOnlyOne } from './utils';
export interface Plugin {
    main: (overallProps: OverallProps) => (urlPath: [string, Path]) => (methodPathProps: [MethodType, PathProps]) => any;
    imports?: string | string[];
}
declare type GeneratorProps = RequireOnlyOne<{
    schemaURL: string;
    schemaPath: string;
    plugin: Plugin;
    prettierOptions?: PrettierOptions;
}, 'schemaPath' | 'schemaURL'>;
export declare class Generator {
    private generatorProps;
    constructor(generatorProps: GeneratorProps);
    generate(): Promise<void>;
}
export {};
