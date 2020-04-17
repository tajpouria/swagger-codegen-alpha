import fs from 'fs';
import http from 'http';
import https from 'https';
import { promisify } from 'util';
import crypto from 'crypto';

export function flatten<T = string>(arr: any, depth: number = 1): T[] {
  return depth > 0
    ? arr.reduce(
        (acc: T[], val: T) =>
          acc.concat(Array.isArray(val) ? flatten(val, depth - 1) : val),
        [],
      )
    : arr;
}

export const readFile = promisify(fs.readFile);
export const writeFile = promisify(fs.writeFile);

export type RequireOnlyOne<T, Keys extends keyof T = keyof T> = Pick<
  T,
  Exclude<keyof T, Keys>
> &
  {
    [K in Keys]-?: Required<Pick<T, K>> &
      Partial<Record<Exclude<Keys, K>, undefined>>;
  }[Keys];

export const getRequest = async (
  url: string,
  postData?: Record<string, any>,
) => {
  const lib = url.startsWith('https://') ? https : http;
  return new Promise((resolve, reject) => {
    const req = lib.get(url, res => {
      if (res?.statusCode! < 200 || res?.statusCode! >= 300) {
        return reject(new Error(`Status Code: ${res.statusCode}`));
      }

      const data: any[] = [];

      res.on('data', chunk => {
        data.push(chunk);
      });

      res.on('end', () => resolve(Buffer.concat(data).toString()));
    });

    req.on('error', reject);

    if (postData) {
      req.write(postData);
    }

    req.end();
  });
};

export const isObject = (value: any) =>
  value && typeof value === 'object' && value.constructor === Object;

export const createMd5 = (data: string) =>
  crypto.createHash('md5').update(data).digest('hex');
