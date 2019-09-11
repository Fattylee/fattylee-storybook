require('express-async-errors');
const express = require('express');
const app = express();
const debug = require('debug')('active:app');
const methodOverride = require('method-override');
const morgan = require('morgan');
const exphbs = require('express-handlebars');
const path = require('path');
const flash = require('connect-flash');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const stories = require('./routes/stories');
const users = require('./routes/users');
const auth = require('./routes/auth');
const index = require('./routes');
const uploads = require('./routes/uploads');
const startDB = require('./startups/db');
const passport = require('passport');
const isAuthenticated = require('./middlewares/auth');
const handlebarsConfig = require('./helpers/handlebars');
const storyError = require('./controllers/errors/storyError');
const expressFileupload = require('express-fileupload');
const mongoose = require('mongoose');
const cors = require('cors');

startDB(app);
require('./config/passport')(passport);

app.use(cors());
app.use(morgan('tiny'));
app.use(methodOverride('_method'));

app.use(expressFileupload());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.engine('html', exphbs(handlebarsConfig));
app.set('view engine', 'html');

app.use(express.static(path.join(__dirname, 'public')));

// cookieSession can also be used in place of this, see above
app.use(session({
  secret: 'keyboard cat',
  saveUninitialized: true,
  resave: true,
  store: new MongoStore({ mongooseConnection: mongoose.connection }),

}));

  
app.use(flash());

// initialize passport
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
app.use('/auth', auth);
app.use('/uploads', /*isAuthenticated,*/ uploads);

app.use((err, req, res, next) => {
  if(app.get('env') === 'production')
  console.log('Async error', err);
  else debug('Async error', err);
  
  if(err.message.includes('duplicate key error')) {
      req.flash('error_msg', `email "${req.userValue.email}" already registered, pls login to your account`);
    return res.redirect('/users/login');
    }
  res.status(500).render('errors/500');
  /*res.status(200).send({
    msg: 'na error bdis',
    err,
  });*/
});

// disable in production
//if(app.get('env') === 'development' || app.get('env') === 'staging') {
  app.use('/xyz', require('./routes/comments'));
  debug('comments routes loaded')
//}

app.all('*', (req, res, next) => {
  res.render('errors/404', {pageTitle: '404'});
});