import express from 'express';
import mongoose from 'mongoose';
import { Router } from './src/modules/routes/routes';

const app = express();
const uri: string = 'mongodb+srv://Daria:restart987@cluster0.tbek4.mongodb.net/Test-data-base?retryWrites=true&w=majority';

app.use(express.json());
app.use(Router);

mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}, () => {
  console.log('База в деле')
});

app.listen(4000, () => {
  console.log('Я работаю')
})