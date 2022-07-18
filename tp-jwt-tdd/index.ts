import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import { initializeOffers } from "./src/services/initializeOffers";
import { offers } from "./src/utils/data";
import * as dotenv from "dotenv";
import usersRoutes from './src/routes/usersRoutes';
import utilsRoutes from './src/routes/utilsRoutes';
import productsRoutes from "./src/routes/productsRoutes";
dotenv.config({ path: __dirname+'/.env' });

const cors = require('cors');
const SERVER_API_PORT = process.env.SERVER_API_PORT;
const SERVER_DB_HOST = process.env.SERVER_DB_HOST;
const app = express();

// mongoose connection
mongoose.Promise = global.Promise;
mongoose.connect(SERVER_DB_HOST!).then(() => console.log('mongo connected'));

// bodyparser setup
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

let state = initializeOffers(offers)

// cors
app.use(cors());

// serving static files
app.use(express.static('public'));

usersRoutes(app);
utilsRoutes(app);
productsRoutes(app, state);

app.get('/', (req, res) => {
    res.send(`Node and express server running on port ${SERVER_API_PORT}`)
});

app.listen(SERVER_API_PORT, () =>
    console.log(`Your server is running on port ${SERVER_API_PORT}`)
);
