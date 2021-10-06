import {
  JsonWebTokenError,
  NotBeforeError,
  sign,
  SignOptions,
  TokenExpiredError,
  verify,
  VerifyOptions,
} from 'jsonwebtoken';

import { AnyObject } from '../utils/typings';

const JWT_SECRET = process.env.JWT_SECRET;

if (JWT_SECRET == null) {
  throw new Error('"JWT_SECRET"을 설정해주세요.');
}

export function jwtSign<T extends AnyObject>(data: T, options?: SignOptions) {
  return new Promise<string>((resolve, reject) => {
    sign(data, JWT_SECRET, options ?? {}, (error, encoded) => {
      if (error != null) {
        reject(error);
      } else {
        resolve(encoded);
      }
    });
  });
}

export function jwtVerify<T extends AnyObject>(
  token: string,
  options?: VerifyOptions,
) {
  return new Promise<T>((resolve, reject) => {
    verify(token, JWT_SECRET, options ?? {}, (error, decoded) => {
      if (error != null) {
        reject(error);
      } else {
        resolve(decoded as T);
      }
    });
  });
}

export enum JwtErrorCode {
  토큰_만료됨,
  토큰_유효하지_않음,
  아직_활성화되지_않음,
  알수없음,
}

export function queryJwtErrorCode(error: unknown): JwtErrorCode {
  if (error == null || typeof error !== 'object') {
    return JwtErrorCode.알수없음;
  }

  if (error instanceof TokenExpiredError) {
    return JwtErrorCode.토큰_만료됨;
  } else if (error instanceof NotBeforeError) {
    return JwtErrorCode.아직_활성화되지_않음;
  } else if (error instanceof JsonWebTokenError) {
    return JwtErrorCode.토큰_유효하지_않음;
  }

  return JwtErrorCode.알수없음;
}
