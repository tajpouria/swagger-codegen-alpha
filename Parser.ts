export interface OverallProps {
  basePath: string;
  host: string;
  tags?: string[];
}

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
  summary?: string;
  parameters: Parameter[];
  tags?: string[];
}

export interface Parameter {
  name: string;
  in: ParameterType;
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
