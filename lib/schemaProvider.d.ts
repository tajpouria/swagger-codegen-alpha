interface SchemaProviderProps {
    schemaURL?: string;
    schemaPath?: string;
}
export declare function schemaProvider(schemaProviderProps: SchemaProviderProps): Promise<string>;
export {};
