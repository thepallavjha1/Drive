const express = require('express');
const app = express();
const userRouter = require('./routes/user.routes.js');
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use('/user', userRouter);
app.use(userRouter)


app.listen(3000);