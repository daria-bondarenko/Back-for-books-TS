import { GetPublicKeyOrSecret, Secret } from "jsonwebtoken";

require('dotenv').config();

// @ts-ignore
const jwtSecret: Secret = process.env.jwtSecret

const access = {
  sub: 'access',
  exp: process.env.timeForAccessToken
}

const refresh = {
  sub: 'refresh',
  exp: process.env.timeForRefreshToken
}

export {
  jwtSecret,
  access,
  refresh
}