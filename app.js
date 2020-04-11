require('dotenv').config();
const express            = require('express');
const cors               = require('cors');
const bodyParser         = require("body-parser");
const cookieParesr       = require('cookie-parser');
const listRouter         = require('./routers/item.router');
const userRouter         = require('./routers/user.router');
const AuthMiddleWare     = require('./middleware/user.middleware');
const app = express();
app.use(cors({
    origin: "http://localhost:3000",
    credentials: true
}));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParesr(process.env.SECRET_KEY));
app.use('/lists', AuthMiddleWare.UserAuth ,listRouter);
app.use('/users', userRouter);
app.listen(1500, (req, res) => {
    console.log('Server is Running');
})