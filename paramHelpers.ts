import { Parameter, ParameterDataType } from './Parser';

//@ts-ignore
export function resolveParameterInfo(parameter: Parameter): ParamterInfo {
  const { name, type, required, schema } = parameter;

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
    //} else if (type === 'object') {
    //return {
    //...paramInfo,
    //type: resolveParameterInfoObjectType(parameter),
    //};
    //} else if (schema) {
    //return {
    //...paramInfo,
    ////@ts-ignore
    //type: resolveParameterInfoSchemaType(parameter),
    //};
  }
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

// @ts-ignore
function resolveParameterInfoObjectType(parameter) {}

// @ts-ignore
function resolveParameterInfoSchemaType(schema) {}
