require('express-async-errors');
const express = require('express');
const methodOverride = require('method-override');
const morgan = require('morgan');
const exphbs = require('express-handlebars');
const path = require('path');
const flash = require('connect-flash');
const session = require('express-session');
const stories = require('./routes/stories');
const users = require('./routes/users');
const index = require('./routes');
const startDB = require('./startups/db');
const passport = require('passport');
const isAuthenticated = require('./middlewares/auth');
const debug = require('debug')('active:app');
const handlebarsConfig = require('./helpers/handlebars');
const storyError = require('./controllers/errors/storyError');
const app = express();
const expressFileupload = require('express-fileupload');

startDB(app);
require('./config/passport')(passport);

app.use(morgan('dev'));
app.use(methodOverride('_method'));

app.use(expressFileupload());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.engine('html', exphbs(handlebarsConfig));
app.set('view engine', 'html');

app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
  secret: 'keyboard cat',
  saveUninitialized: true,
  resave: true,
}));
  
app.use(flash());

app.use(passport.initialize());
app.use(passport.session());

// set global variables
app.use((req, res, next) => {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error = req.flash('error');
  res.locals.user = req.user;
  res.locals.success = req.flash('success');
  next();
});

//app.use('/stories', storyError);
app.use('/', index);
app.use('/stories', isAuthenticated, stories);
app.use('/users', users);

app.use((err, req, res, next) => {
  debug('Async error', err);
  if(err.message.includes('duplicate key error')) {
      req.flash('error_msg', `email "${req.userValue.email}" already registered, pls login to your account`);
    return res.redirect('/users/login');
    }
  res.status(500).render('errors/500');
});


app.all('*', (req, res, next) => {
  res.render('errors/404');
});