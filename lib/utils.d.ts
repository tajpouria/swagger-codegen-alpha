/// <reference types="node" />
import * as fs from 'fs';
export declare function flatten<T = string>(arr: any, depth?: number): T[];
export declare const readFile: typeof fs.readFile.__promisify__;
export declare const writeFile: typeof fs.writeFile.__promisify__;
export declare type RequireOnlyOne<T, Keys extends keyof T = keyof T> = Pick<T, Exclude<keyof T, Keys>> & {
    [K in Keys]-?: Required<Pick<T, K>> & Partial<Record<Exclude<Keys, K>, undefined>>;
}[Keys];
export declare const getRequest: (url: string, postData?: Record<string, any> | undefined) => Promise<unknown>;
export declare const isObject: (value: any) => boolean;
export declare const createMd5: (data: string) => string;
