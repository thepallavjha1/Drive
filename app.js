const express = require('express');
const app = express();
const userRouter = require('./routes/user.routes.js');
app.set('view engine', 'ejs');
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const dotenv = require('dotenv');
dotenv.config()
const connectDB = require('./config/db');
connectDB()

dotenv.config();

app.use('/user', userRouter);


app.listen(3000);