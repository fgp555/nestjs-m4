import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const date = new Date();
    console.log(req.method + ' ' + req.url + '    -----' + date);
    next();
  }
}

export function loggerGlobal(req: Request, res: Response, next: NextFunction) {
  console.log('Request Global...' + req.method + ' ' + req.url);
  next();
}
