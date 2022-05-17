'use strict';
import { Request, Response, NextFunction } from 'express';

export const getAge = (date: string | Date): number => {
  var today: Date = new Date();
  var birthDate: Date = typeof date === 'string' ? new Date(date) : date;
  var age: number = today.getFullYear() - birthDate.getFullYear();
  var m = today.getMonth() - birthDate.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  return age;
};

export const exportAllJsons = (body: any, fields: string[] = []) => {
  if (!body) body = {};

  fields.forEach(field => {
    try {
      if (body[field] && typeof body[field] === 'string') body[field] = JSON.parse(body[field]);
    } catch (error) {
      throw {
        custom: true,
        message: `Sorry, the "${field}" field has to be an object or stringified object.`,
      };
    }
  });

  return body;
};

export const exportAllJsonFromQuery = (fields: string[] = []) => {
  return (req: Request, res: Response, next: NextFunction) => {
    exportAllJsons(req.body, fields);
    next();
  };
};
