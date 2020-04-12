import { readFile, getRequest } from './utils';

interface SchemaProviderProps {
  schemaURL?: string;
  schemaPath?: string;
}

export async function schemaProvider(
  schemaProviderProps: SchemaProviderProps,
): Promise<string> {
  const { schemaURL, schemaPath } = schemaProviderProps;

  if (schemaURL) {
    return getRequest(schemaURL) as Promise<string>;
  } else if (schemaPath) {
    return readFile(schemaPath, 'UTF-8');
  }
  throw new Error('schemaURL or schemaPath not provided!');
}
