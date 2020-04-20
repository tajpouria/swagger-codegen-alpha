import { Parameter, ParameterDataType } from './Parser';

//@ts-ignore
export function resolveParameterInfo(parameter: Parameter): ParamterInfo {
  const { name, type, required } = parameter;

  if (isPrimitiveParamterInfoType(type)) {
    return {
      name,
      type: resolveParameterInfoPrimitiveType(type),
      required: resolveParameterInfoRequired(required),
    };
  }
}

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

const resolveParameterInfoRequired = (required?: boolean) => !!required;

type PrimitiveParamterInfoType = 'string' | 'number' | 'boolean';

export interface ParamterInfo {
  name: string;
  type: PrimitiveParamterInfoType | ParamterInfo;
  required: boolean;
}
