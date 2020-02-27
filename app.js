const express = require('express');
const path = require('path');
const logger = require('morgan');

const hbs = require('express-handlebars');
const indexRouter = require('./routes/index');

const app = express();
app.engine(
  'hbs',
  hbs({
    extname: 'hbs',
    defaultView: 'default',
    layoutsDir: `${__dirname}/views`,
  }),
);
app.set('view engine', 'hbs');

/* istanbul ignore if */
if (process.env.NODE_ENV !== 'test') {
  /* only log http requests when not testing */
  app.use(logger('dev'));
}
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, './static')));
app.use('/', indexRouter);

module.exports = app;
