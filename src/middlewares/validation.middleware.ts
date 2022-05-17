'use strict';
import { HttpException } from '~exceptions/HttpException';
import FastestValidator from 'fastest-validator';

const validationMiddleware = (schema: object, value: string | object, Validator: FastestValidator = new FastestValidator()): object => {
  if (typeof value === 'string') value = JSON.parse(value);

  const result = Validator.compile(schema)(value);

  if (result === true) {
    return value as object;
  } else {
    throw new HttpException(400, result[0].message, result);
  }
};

export default validationMiddleware;
