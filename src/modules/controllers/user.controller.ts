import { Request, Response } from "express";
import bcrypt from 'bcryptjs';
import { updateTokens } from '../helpers/helpersFunction';
import { User, IUser } from '../../db/models/user';
import {Document} from "mongoose";
import { IUpdateTokens} from "../../../types/typesAndInterfaces";


const createNewUser = async (req: Request, res: Response): Promise<void> => {
  const {email, password} = req.body as Pick<IUser, "email" | "password">;
  const regexp: RegExp = /^[A-Z0-9._%+-]+@[A-Z0-9-]+.+.[A-Z]{2,4}$/igm;

  if (regexp.test(email)) {
    const candidate: (IUser & Document<any, any, IUser>) | null = await User.findOne({email});

    if (candidate) {
      res.status(404).json({
        message: 'Такой пользователь уже существует'
      })
    } else {
      const salt: string = bcrypt.genSaltSync(10);
      const newUser = new User({
        email,
        password: bcrypt.hashSync(password, salt)
      })

      try {
        await newUser.save();
        const user: IUser[] = await User.find({email});
        if (user[0]._id) {
          const {accessToken, refreshToken} = await updateTokens(user[0]._id);
          res.status(200).json({
            email,
            accessToken,
            refreshToken
          })
        }
      } catch (e) {
        res.status(409).json({
          message: 'Что-то пошло не так, попробуй еще раз :)'
        })
      }
    }
  } else {
    res.status(400).json({
      message: 'Логин не корректный'
    })
  }


};

const signIn = async (req: Request, res: Response): Promise<void> => {
  const {email, password} = req.body as Pick<IUser, "email" | "password">;
  const candidate: (IUser & Document<any, any, IUser>) | null = await User.findOne({email});

  if (!candidate) {
    res.status(401).json({message: "Нет такого юзера..."})
  } else {
    try {
      const isValid = bcrypt.compareSync(password, candidate.password);
      if (isValid) {
        const tokens: IUpdateTokens = await updateTokens(candidate._id);
        res.json(tokens);
      } else {
        res.status(401).json({message: 'Проверь пароль...'})
      }
    } catch (e) {
      res.status(500).json({message: e.message})
    }
  }
}

export {
  createNewUser,
  signIn
}
