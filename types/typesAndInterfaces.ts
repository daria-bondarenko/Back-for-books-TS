interface IUpdateTokens {
  accessToken: string,
  refreshToken: string
}

interface IRefreshToken {
  id: string,
  token: string
}

export {
  IUpdateTokens,
  IRefreshToken
}