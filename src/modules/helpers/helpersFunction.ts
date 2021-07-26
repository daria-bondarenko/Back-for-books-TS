import {v4 as uuid4} from 'uuid';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { jwtSecret, access, refresh } from '../../../config/keys';
import { Token, IToken } from '../../db/models/token';
import { IUpdateTokens, IRefreshToken } from '../../../types/typesAndInterfaces'

const generateAccessToken = (userId: string): string => {
  const payload: JwtPayload = {
    aud: userId,
    type: access.sub,
  };
  const options = {expiresIn: access.exp};
  return jwt.sign(payload, jwtSecret, options);
};

const generateRefreshToken = (): IRefreshToken => {
  const payload: JwtPayload = {
    jti: uuid4(),
    sub: refresh.sub,
  };
  const options = {expiresIn: refresh.exp};

  return <IRefreshToken>{
    id: payload.jti,
    token: jwt.sign(payload, jwtSecret, options)
  };
};

const replaceDbRefreshToken = async (tokenId: string, userId: string): Promise<void> => {
  await Token.findOneAndDelete({userId});
  await Token.create({tokenId, userId});
};

const updateTokens = async (userId: string): Promise<IUpdateTokens> => {
  const accessToken: string = generateAccessToken(userId);
  const refreshToken: IRefreshToken = generateRefreshToken();
  await replaceDbRefreshToken(refreshToken.id, userId);
  return {
    accessToken,
    refreshToken: refreshToken.token
  };
};

export { updateTokens }