const express = require('express');
const morgan = require('morgan');
const path = require('path');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const compression = require('compression');
const cors = require('cors');
const AppError = require('./utils/appError');
const globalError = require('./Controllers/errorController');
const users = require('./routes/users');
const roles = require('./routes/roles');
const shops = require('./routes/shop');
const products = require('./routes/product');
const administration = require('./routes/administration');
const category = require('./routes/category');
const cart = require('./routes/cart');
const order = require('./routes/order');

const app = express();
app.enable('trust proxy');
//body parse middleware
app.use(express.json());

//Global Middleware Stack

//implementing CORS
//Access-control-Allow-Origin(Allowing Everyone to use our API)
app.use(cors());
app.options('*', cors());
// app.options('api/v1/user/:id',cors())

//Setting Security Http Headers
app.use(helmet());
//Allowing Only 100 Request in 1 Hour For '/api'
const limit = rateLimit({
  max: 100,
  windowMs: 60 * 60 * 1000,
  message: 'Too Many Request From this IP.',
});
app.use('/api', limit);

//seting View Engine
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

//Data Sanitization against No Sql query injection(Filtering $ etc)
app.use(mongoSanitize());
//Data Sanitization against XSS
app.use(xss());

//Compressing text
app.use(compression());
//static File
app.use(express.static(`${__dirname}/public`));

//logging
process.env.NODE_ENV === 'development' ? app.use(morgan('dev')) : null;
//Routes Middleware
app.get('/', (req, res) => {
  res.status(200).render('base', {
    tour: 'the Forest Hiker',
    user: 'sami',
  });
});
app.use('/api/users', users);
app.use('/api/roles', roles);
app.use('/api/shops', shops);
app.use('/api/products', products);
app.use('/api/administration', administration);
app.use('/api/categories', category);
app.use('/api/cart', cart);
app.use('/api/order', order);

app.all('*', (req, res, next) => {
  next(
    new AppError(
      `requested Url ${req.originalUrl} could not be found on this server`,
      404
    )
  );
});
app.use(globalError);

module.exports = app;
