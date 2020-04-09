export interface SwaggerSchema extends OverallProps {
  paths: Paths;
}

export interface Paths {
  [url: string]: Path;
}

export type Path = {
  [method in MethodType]: PathProps;
};

export interface PathProps {
  operationId?: string;
  parameters: {
    name: string;
    in: ParameterType;
  };
}

export type MethodType = 'get' | 'post' | 'put' | 'delete' | 'patch';

type ParameterType = 'query' | 'path' | 'body';

export class Parser {
  private _schema: SwaggerSchema;

  constructor(inputSchema: SwaggerSchema) {
    this._schema = inputSchema;
  }

  public get schema() {
    return this._schema;
  }
}

export interface OverallProps {
  basePath: string;
  host: string;
}
