import { Request, Response } from "express";
import jwt from 'jsonwebtoken';
import { jwtSecret } from '../../../config/keys';
import { updateTokens } from '../helpers/helpersFunction';
import { Token, IToken } from "../../db/models/token";
import { Document } from 'mongoose';

const refreshTokens = async (req: Request, res: Response): Promise<void> => {
  const {refreshToken} = req.body;
  let payload;
  try {
    payload = jwt.verify(refreshToken, jwtSecret);
    if (payload.type !== 'refresh') {
      res.status(400).json({message: 'Токен не подходит'});
      return;
    }
  } catch (e) {
    if (e instanceof jwt.TokenExpiredError) {
      res.status(400).json({message: 'Токен истек'});
      return;
    } else if (e instanceof jwt.JsonWebTokenError) {
      res.status(400).json({message: 'Не подходит токен'});
      return;
    }
  }

  const token: (IToken & Document<any, any, IToken>) | null = await Token.findOne({tokenId: payload.id}); // если переменная пустая, то код до сюда не дойдет
  let tokens: { accessToken: string, refreshToken: string };
  if (token === null) {
    throw new Error('Невалидный токен');
  } else {
    tokens = await updateTokens(token.userId);
    try {
      res.json(tokens);
    } catch (e) {
      res.status(400).json({message: e.message})
    }
  }
}

export { refreshTokens }