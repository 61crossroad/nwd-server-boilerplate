import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import express from 'express';
import morgan from 'morgan';

import { authenticateJWT } from './apis/auth';
import routes from './routes';

const app = express();
const port = 8000;

app.use(morgan('dev')); // Log every request to the console

app.use(cookieParser(process.env.COOKIE_SECRET)); //  Read cookies (* secret parameter is used when signing cookie)
app.use(bodyParser.json()); // Parsing json objects
app.use(bodyParser.urlencoded({ extended: true })); // Parsing bodies from URL

app.use(authenticateJWT); // Authenticate every request
app.use('/', routes);

app.listen(port);
// eslint-disable-next-line no-console
console.log(`Now, the server starts on port ${port}`);
