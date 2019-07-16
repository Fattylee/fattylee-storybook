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
const storyError = require('./controllers/errors/storyError');
const debug = require('debug')('active:app');


const hbs = exphbs.create({
  // optional config goes here
  extname: 'html',
  helpers: {
    abu: function (str){return 'Allaahu Akbar!' + str;},
    isNotStories(pageTitle, options) {
      if(pageTitle !== 'Stories') 
        return options.fn(this);
      return options.inverse(this);
      },
    isNotCreateStories(pageTitle, options) {
      if(pageTitle !== 'Create story') 
        return options.fn(this);
      return options.inverse(this);
      },
    capitalizeEach(first, options) {
      const {name, sex} = options.hash;
      if(sex === 'male') return 'You are a male';
      return name.split(/\s+/)
      .map(e => e.slice(0,1).toUpperCase() + e.slice(1))
      .join(' ');
    },
  }
});
startDB();
require('./config/passport')(passport);
const app = express();
app.use(morgan('dev'));
app.use(methodOverride('_method'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.engine('html', hbs.engine);
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
  next();
});

app.use('/stories', isAuthenticated, stories);
// catch all async errors related to stories route
app.use('/stories', storyError);
app.use('/users', users);
app.use('/', index);

/*
app.use('/', (error, req, res, next) => {
  debug('Async error', error);
  res.send('Error async' + error);
});
*/


const port = process.env.PORT || 4000;
app.listen(port, () => console.log('Server running on port', port));
