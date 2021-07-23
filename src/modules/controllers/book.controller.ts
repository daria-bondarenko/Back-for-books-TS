import { Request, Response } from "express";
import { IBook, Book } from "../../db/models/book";
// import _ from 'underscore';

const getAllBooks = async (req: Request, res: Response): Promise<void> => {
  try {
    const books: IBook[] = await Book.find()
    res.status(200).json({data: books})
  } catch (error) {
    throw error
  }
}

const getOneBook = async (req: Request, res: Response): Promise<void> => {
  try {
    const book: IBook[] = await Book.find({_id: req.query._id})
    res.status(200).json({data: book})
  } catch (error) {
    throw error
  }
}

const createNewBook = async (req: Request, res: Response): Promise<void> => {
  try {
    const body = req.body as Pick<IBook, "name" | "author" | "year" | "genre" | "img">

    const book = new Book({
      name: body.name,
      author: body.author,
      year: body.year,
      genre: body.genre,
      removed: false,
      img: body.img
    })

    const newBook: IBook = await book.save()
    const allBooks: IBook[] = await Book.find();

    res
      .status(201)
      .json({message: "Book added", todo: newBook, todos: allBooks})
  } catch (error) {
    throw error
  }
}

const editBook = async (req: Request, res: Response): Promise<void> => {
  try {
    const {
      params: {_id},
      body,
    } = req
    const updateBook: IBook | null = await Book.findByIdAndUpdate( //зачем тут null
      {_id: _id},
      body
    )
    const allBooks: IBook[] = await Book.find()
    res.status(200).json({
      message: "Book updated",
      todo: updateBook,
      todos: allBooks,
    })
  } catch (error) {
    throw error
  }
}

const deleteBook = async (req: Request, res: Response): Promise<void> => {
  try {
    const deletedBook: IBook | null = await Book.findByIdAndRemove( //зачем тут null
      req.params._id
    )
    const allBooks: IBook[] = await Book.find()
    res.status(200).json({
      message: "Book deleted",
      todo: deletedBook,
      todos: allBooks,
    })
  } catch (error) {
    throw error
  }
}

export {
  getAllBooks,
  getOneBook,
  createNewBook,
  editBook,
  deleteBook
}