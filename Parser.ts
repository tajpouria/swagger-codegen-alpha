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

export type Path = {
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

export type ParameterDataType =
  | 'object'
  | 'string'
  | 'boolean'
  | 'number'
  | 'integer'
  | 'array'
  | 'enum'
  | 'schema';

export type MethodType = 'get' | 'post' | 'put' | 'delete' | 'patch';

export type ParameterType = 'query' | 'path' | 'body' | 'header';

export class Parser {
  // @ts-ignore
  private _schema: SwaggerSchema;

  public set schema(inputSchema: SwaggerSchema) {
    this._schema = inputSchema;
  }

  public get schema() {
    return this._schema;
  }

  public convertURLPathParametersToTemplateStringVar = () => {
    const newPaths: Paths = {};

    Object.entries(this._schema.paths).forEach(([url, path]) => {
      let urlTemp = url;

      const containPathParamRegex = /\/{\w+}/gi;

      if (containPathParamRegex.test(url)) {
        const braceAfterSlashRegex = /\/{\b/g;

        urlTemp = urlTemp.replace(braceAfterSlashRegex, '/${');
      }

      newPaths[urlTemp] = path;
    });

    this._schema.paths = newPaths;

    return this;
  };
}

export const parser = new Parser();
