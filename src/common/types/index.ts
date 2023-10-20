import { Request } from 'express';
import { IsEnum, IsNumber, IsString } from 'class-validator';

export enum Environment {
  Development = 'development',
  Production = 'production',
  Test = 'test',
}

export class EnvironmentVariables {
  @IsEnum(Environment)
  NODE_ENV: Environment;

  @IsNumber()
  PORT: number;

  @IsString()
  REDIS_URI: string;

  @IsString()
  STORAGE_DIR: string;

  @IsString()
  LOG_DIR: string;

  @IsString()
  DIALECT: string;
}

/**
 * ExcludeUndefinedIf<ExcludeUndefined, T>
 *
 * If `ExcludeUndefined` is `true`, remove `undefined` from `T`.
 * Otherwise, constructs the type `T` with `undefined`.
 */
export type ExcludeUndefinedIf<
  ExcludeUndefined extends boolean,
  T,
> = ExcludeUndefined extends true ? Exclude<T, undefined> : T | undefined;

export interface File {
  /** Name of the form field associated with this file. */
  fieldname: string;
  /** Name of the file on the uploader's computer. */
  originalname: string;
  /**
   * Value of the `Content-Transfer-Encoding` header for this file.
   * @deprecated since July 2015
   * @see RFC 7578, Section 4.7
   */
  encoding: string;
  /** Value of the `Content-Type` header for this file. */
  mimetype: string;
  /** Size of the file in bytes. */
  size: number;
  /** `DiskStorage` only: Directory to which this file has been uploaded. */
  destination: string;
  /** `DiskStorage` only: Name of this file within `destination`. */
  filename: string;
  /** `DiskStorage` only: Full path to the uploaded file. */
  path: string;
}

export interface JwtPayload {
  readonly sub: string;
}

export interface ValidatedUser {
  readonly id: string;
}

export interface AuthenticatedUser {
  readonly id: string;
}

export interface Context {
  readonly user: AuthenticatedUser;
}

export interface AuthenticatedRequest extends Request {
  readonly user: AuthenticatedUser;
}

export enum MailTemplate {
  VERIFICATION_CODE = 'verification-code',
}

export enum Sort {
  Desc = 'desc',
  Asc = 'asc',
}
