import uuid from 'uuid';
import jwt from 'jsonwebtoken';
import { jwtSecret, access, refresh } from '../../../config/keys';
import { Token, IToken } from '../../db/models/token';
import { IUpdateTokens } from '../../../types/typesAndInterfaces'

const generateAccessToken = (userId: string): string => {
  const payload = {
    userId,
    type: access.type,
  };
  const options = {expiresIn: access.expiresIn};

  return jwt.sign(payload, jwtSecret, options);
};

const generateRefreshToken = () => {
  const payload = {
    id: uuid.v4(),
    type: refresh.type,
  };
  const options = {expiresIn: refresh.expiresIn};

  return {
    id: payload.id,
    token: jwt.sign(payload, jwtSecret, options)
  };
};

const replaceDbRefreshToken = async (tokenId: string, userId: string): Promise<void> => {
  await Token.findOneAndDelete({userId});
  await Token.create({tokenId, userId});
};

const updateTokens = async (userId: string): Promise<IUpdateTokens> => {
  const accessToken: string = generateAccessToken(userId);
  const refreshToken: = generateRefreshToken();
  await replaceDbRefreshToken(refreshToken.id, userId);
  return {
    accessToken,
    refreshToken: refreshToken.token
  };
};

export { updateTokens }