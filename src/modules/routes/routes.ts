import express from 'express';
const router = express.Router();

import {
  getAllBooks,
  getOneBook,
  createNewBook,
  editBook,
  deleteBook
} from '../controllers/book.controller'

router.get('/books', getAllBooks)
router.get('/book', getOneBook)
router.post('/book', createNewBook)
router.put('/book', editBook)
router.delete('/book', deleteBook)

import {
  signIn,
  createNewUser
} from '../controllers/user.controller';

router.post('/signIn', signIn);
router.post('/createNew', createNewUser);

import {
  refreshTokens
} from '../controllers/token.controller';

router.post ('/refreshTokens', refreshTokens)

export { router as Router };