import { Request, Response } from "express";
import jwt from 'jsonwebtoken';
import {jwtSecret} from '../config/keys';

module.exports = (req: Request, res: Response, next: any): void => {
  const authHeader: string | undefined = req.get('Authorization');
  if (!authHeader) {
    res.status(401).json({message: 'Токен где?'});
    return;
  }

  const token = authHeader.replace('Bearer ', '');
  try {
    const payload = jwt.verify(token, jwtSecret);
    if (payload && payload.sub !== 'access') {
      res.status(401).json({message: 'Невалидный токен'});
      return;
    }
  } catch (e) {
    if (e instanceof jwt.TokenExpiredError) {
      res.status(401).json({message: 'Токен истек'});
      return;
    }
    if (e instanceof jwt.JsonWebTokenError) {
      res.status(401).json({message: 'Невалидный токен'});
      return;
    }
  }

  next();
}