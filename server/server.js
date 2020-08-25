const express = require('express');
const cookieParser = require('cookie-parser');


const bodyParser = require('body-parser');
const helmet = require('helmet');
const passport = require('passport');
const cors = require('cors');

const PORT = 4000;
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors());

app.use(express.json())
const userRoutes = require('./Users');
app.use('/users', userRoutes);

app.listen(PORT, function () {
  console.log("Server is running on Port: " + PORT);
});

//for authenticateion
//https://stackoverflow.com/questions/54845053/express-react-with-cors-setting-http-only-secure-cookie-for-react-spa
