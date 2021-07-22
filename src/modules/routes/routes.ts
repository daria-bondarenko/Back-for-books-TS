import express, { Request, Response } from 'express';

const router = express.Router();

router.get('/books', [], (req: Request, res: Response) => {
  return res.send('books get')
})

router.get('/book', [], (req: Request, res: Response) => {
  return res.send('book get')
})

router.post('/book', (req:Request, res: Response) => {
  return res.send('book post')
})

export { router as Router };