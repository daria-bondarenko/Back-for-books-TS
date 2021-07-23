import { Secret } from "jsonwebtoken";

require('dotenv').config();

const jwtSecret: Secret = process.env.jwtSecret

const access = {
  type: 'access',
  expiresIn: process.env.timeForAccessToken
}

const refresh = {
  type: 'refresh',
  expiresIn: process.env.timeForRefreshToken
}

export {
  jwtSecret,
  access,
  refresh
}