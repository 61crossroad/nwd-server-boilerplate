import bodyParser from 'body-parser';
import express from 'express';
import morgan from 'morgan';

const app = express();
const port = 8000;

app.use(morgan('dev')); // Log every request to the console

app.use(bodyParser.json()); // Parsing json objects
app.use(bodyParser.urlencoded({ extended: true })); // Parsing bodies from URL

app.use((req, res, next) => {
  console.log('Hello World Server!');
  res.send('Hello World Front!');
});

app.listen(port);
// eslint-disable-next-line no-console
console.log(`Now, the server starts on port ${port}`);
