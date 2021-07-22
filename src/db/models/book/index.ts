import mongoose from 'mongoose';

interface IBook {
  name: string;
  author: string;
  year: number;
  genre: string;
  removed: boolean;
  img: string;
}

interface bookModelInterface extends mongoose.Model<any>{
  createBook(attr: IBook): any
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

bookScheme.statics.createBook = (attr: IBook) => {
  return new Book (attr)
}

const Book = mongoose.model<any, bookModelInterface>('books', bookScheme);

export { Book }