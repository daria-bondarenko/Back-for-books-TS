import express, { Request, Response } from 'express';

import {
  getAllBooks,
  getOneBook,
  createNewBook,
  editBook,
  deleteBook
} from '../controllers/book.controller'

const router = express.Router();

router.get('/books', getAllBooks)
router.get('/book', getOneBook)
router.post('/book', createNewBook)
router.put('/book', editBook)
router.delete('/book', deleteBook)

export { router as Router };