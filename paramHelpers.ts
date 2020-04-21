import { Parameter, ParameterDataType, parser } from './Parser';

//@ts-ignore
export function resolveParameterInfo(parameter: Parameter): ParamterInfo {
  const { name, type, required, schema, $ref } = parameter;

  const paramInfo = { name, required: resolveParameterInfoRequired(required) };

  if (parameter.enum) {
    return {
      ...paramInfo,
      type: parameter.enum,
    };
  } else if (isPrimitiveParamterInfoType(type)) {
    return {
      ...paramInfo,
      type: resolveParameterInfoPrimitiveType(type),
    };
  } else if (type === 'object') {
    return {
      ...paramInfo,
      type: resolveParameterInfoObjectType(parameter),
    };
  } else if (type === 'array') {
    return {
      ...paramInfo,
      //@ts-ignore
      type: resolveParameterInfoArrayType(parameter),
    };
  } else if (schema) {
    return {
      ...paramInfo,
      type: resolveParameterInfoSchemaType(parameter),
    };
  } else if ($ref) {
    return {
      ...paramInfo,
      //@ts-ignore
      type: resolveParameterInfo$ref(parameter),
    };
  }

  throw new Error(`Cannot resolve Parameter ${name}`);
}

export interface ParamterInfo {
  name: string;
  type: PrimitiveParamterInfoType | (string | number)[] | ParamterInfo[];
  required: boolean;
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

function resolveParameterInfoPrimitiveType(type: ParameterDataType) {
  switch (type) {
    case 'string':
      return 'string';

    case 'number':
    case 'integer':
      return 'number';

    case 'boolean':
      return 'boolean';

    default:
      throw new Error(`Unknow PrimitiveParamterInfoType type ${type}!`);
  }
}

function resolveParameterInfoObjectType(parameter: Parameter) {
  const { properties } = parameter;

  if (properties) {
    return Object.entries(properties).map(([propName, prop]) =>
      resolveParameterInfo({ name: propName, in: parameter.in, ...prop }),
    );
  }

  return [];
}

function resolveParameterInfoArrayType(parameter: Parameter) {
  const { items } = parameter;

  if (items) {
    // @ts-ignore
    return resolveParameterInfo(items);
  }

  return [];
}

function resolveParameterInfoSchemaType(parameter: Parameter) {
  const { schema } = parameter;

  if (schema) {
    //@ts-ignore
    resolveParameterInfo({ ...schema, in: parameter.in });
  }

  return [];
}

function resolveParameterInfo$ref(parameter: Parameter) {
  const { $ref } = parameter;
  const schema = parser.schema;

  if ($ref && schema) {
    const refSegments = $ref.split('/');
    const refName = refSegments[refSegments.length - 1];

    const parameter = schema.definitions?.[refName];

    return resolveParameterInfo(parameter);
  }

  return [];
}
