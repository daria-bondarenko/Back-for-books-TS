import mongoose from 'mongoose';

interface IToken {
  tokenId: string;
  userId: string;
}

const tokenScheme = new mongoose.Schema({
  tokenId: {
    type: String,
    required: true
  },
  userId: {
    type: String,
    required: true
  }
});

const Token = mongoose.model<IToken>('tokens', tokenScheme);

export { Token, IToken }