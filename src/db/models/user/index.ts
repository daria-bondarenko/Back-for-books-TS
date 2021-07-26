import mongoose from 'mongoose';

interface IUser {
  email: string;
  password: string;
}

const userScheme = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  }
});

const User = mongoose.model<IUser>('users', userScheme);

export { User, IUser }
