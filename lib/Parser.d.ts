export interface OverallProps {
    basePath: string;
    host: string;
    tags?: string[];
}
export interface SwaggerSchema extends OverallProps {
    paths: Paths;
    definitions: any;
}
export interface Paths {
    [url: string]: Path;
}
export declare type Path = {
    [method in MethodType]: PathProps;
};
export interface PathProps {
    operationId?: string;
    summary?: string;
    parameters: Parameter[];
    tags?: string[];
}
export interface Parameter {
    name: string;
    in: ParameterType;
    type?: ParameterDataType;
    required?: boolean;
    enum?: string[];
    schema?: ParamaterPropertyAndParameterSchema;
    properties?: Record<string, ParamaterPropertyAndParameterSchema>;
    $ref?: string;
    items?: ParamaterPropertyAndParameterSchema;
}
interface ParamaterPropertyAndParameterSchema {
    $ref?: string;
    type?: ParameterDataType;
    properties?: Record<string, ParamaterPropertyAndParameterSchema>;
}
export declare type ParameterDataType = 'object' | 'string' | 'boolean' | 'number' | 'integer' | 'array' | 'enum' | 'schema';
export declare type MethodType = 'get' | 'post' | 'put' | 'delete' | 'patch';
export declare type ParameterType = 'query' | 'path' | 'body' | 'header';
export declare class Parser {
    private _schema;
    set schema(inputSchema: SwaggerSchema);
    get schema(): SwaggerSchema;
    convertURLPathParametersToTemplateStringVar: () => this;
}
export declare const parser: Parser;
export {};
