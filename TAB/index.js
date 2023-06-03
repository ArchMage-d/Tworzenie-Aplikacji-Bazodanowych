const express = require("express");
require('express-async-errors');
require('./utils/db');
const methodOverride = require("method-override");
const {engine} = require("express-handlebars");
const {handleError} = require("./utils/errors");
const {homeRouter} = require("./routers/home");
const {authorsRouter} = require("./routers/authors");
const {reviewsRouter} = require("./routers/reviews");
const {handlebarsHelpers} = require("./utils/handlebars-helpers");

const app = express();

app.use(methodOverride('_method'));
app.use(express.urlencoded({
    extended: true,
}));

app.use(express.static('public'));
app.use(express.json());

app.engine('.hbs', engine({
    extname: '.hbs',
    helpers: handlebarsHelpers,
}));

app.set('view engine', '.hbs');

app.use('/', homeRouter);
app.use('/authors', authorsRouter);
app.use('/reviews', reviewsRouter);

app.use(handleError);

app.listen(3000, '127.0.0.1', () => {
    console.log('listenin on port 127.0.0.1')
});
