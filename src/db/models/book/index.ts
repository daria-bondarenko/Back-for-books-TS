import mongoose from 'mongoose';

interface IBook {
  name: string;
  author: string;
  year: number;
  genre: string;
  removed: boolean;
  img: string;
}

const bookScheme = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  author: {
    type: String,
    required: true
  },
  year: {
    type: Number,
    required: true
  },
  genre: {
    type: String,
    required: true
  },
  removed: {
    type: Boolean,
    required: true
  },
  img: {
    type: String,
    required: true
  }
});

const Book = mongoose.model<IBook>('books', bookScheme);

export { Book, IBook }