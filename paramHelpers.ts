import { Parameter, parser } from './Parser';

type ResolveParameterInfoInputParamter = Omit<Parameter, 'in'>;

export function resolveParameterInfo(
  parameter: ResolveParameterInfoInputParamter,
): ParamterInfo {
  const { name, required } = parameter;

  const t = {
    name,
    required: resolveParameterInfoRequired(required),
    type: resolveParameterInfoType(parameter),
  };

  return t;
}

export interface ParamterInfo {
  name: string;
  type: ParameterInfoType;
  required: boolean;
}

type ParameterInfoType = string | PrimitiveParamterInfoType | ParamterInfo[];

function resolveParameterInfoType(
  parameter: Partial<ResolveParameterInfoInputParamter>,
): ParameterInfoType {
  const { type, schema, $ref } = parameter;

  if (parameter.enum) {
    return resolveParameterInfoEnumType(parameter);
  }

  if (isPrimitiveParamterInfoType(type)) {
    return resolveParameterInfoPrimitiveType(parameter);
  }

  if (type === 'object') {
    return resolveParameterInfoObjectType(parameter);
  }

  if (type === 'array') {
    return resolveParameterInfoArrayType(parameter);
  }

  if (schema) {
    return resolveParameterInfoSchemaType(parameter);
  }

  if ($ref) {
    return resolveParameterInfo$ref(parameter);
  }

  throw new Error(`Cannot resolve Parameter ${name}`);
}

const resolveParameterInfoRequired = (required?: boolean) => !!required;

type PrimitiveParamterInfoType = 'string' | 'number' | 'boolean';

function isPrimitiveParamterInfoType(
  type: any,
): type is PrimitiveParamterInfoType {
  return (
    type &&
    (type === 'string' ||
      type === 'number' ||
      type === 'boolean' ||
      type == 'integer')
  );
}

function resolveParameterInfoPrimitiveType(
  parameter: Partial<ResolveParameterInfoInputParamter>,
) {
  const { type } = parameter;

  switch (type) {
    case 'string':
      return 'string';

    case 'number':
    case 'integer':
      return 'number';

    case 'boolean':
      return 'boolean';

    default:
      return 'any';
  }
}

function resolveParameterInfoEnumType(
  parameter: Partial<ResolveParameterInfoInputParamter>,
): string {
  if (parameter.enum) {
    return parameter.enum.reduce((acc, el) => {
      if (acc) {
        return `${acc}|'${el}'`;
      }

      return `'${el}'`;
    }, '');
  }

  return 'any';
}

function resolveParameterInfoObjectType(
  parameter: Partial<ResolveParameterInfoInputParamter>,
) {
  const { properties } = parameter;

  if (properties) {
    return Object.entries(properties).map(([propName, prop]) =>
      resolveParameterInfo({ name: propName, ...prop }),
    );
  }

  return 'any';
}

function resolveParameterInfoArrayType(
  parameter: Partial<ResolveParameterInfoInputParamter>,
) {
  const { items } = parameter;

  if (items) {
    const type = resolveParameterInfoType(items);

    // TODO: Should changed to more general approach this kinda stuff should handled on client
    if (isPrimitiveParamterInfoType(type)) {
      return `${type}[]`;
    } else if (Array.isArray(type)) {
      return `{ ${type.reduce(
        (acc, el) => `${acc}\n${el.name}:${el.type};`,
        '',
      )} }[]`;
    }
  }

  return 'any';
}

function resolveParameterInfoSchemaType(
  parameter: Partial<ResolveParameterInfoInputParamter>,
) {
  const { schema } = parameter;

  if (schema) {
    return resolveParameterInfoType(schema);
  }

  return 'any';
}

function resolveParameterInfo$ref(
  parameter: Partial<ResolveParameterInfoInputParamter>,
) {
  const { $ref } = parameter;
  const schema = parser.schema;

  if ($ref && schema) {
    const refSegments = $ref.split('/');
    const refName = refSegments[refSegments.length - 1];

    const parameter = schema.definitions?.[refName];

    return resolveParameterInfoType(parameter);
  }

  return 'any';
}
