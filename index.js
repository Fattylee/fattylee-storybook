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

startDB();
const app = express();
app.use(morgan('dev'));
app.use(methodOverride('_method'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.engine('html', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'html');
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
  secret: 'keyboard cat',                                                  
  resave: false,
  saveUninitialized: true
}));

app.use(flash());

// set global variables
app.use((req, res, next) => {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error = req.flash('error');
  next();
});

app.use('/stories', stories);
app.use('/users', users);
app.use('/', index);

const port = process.env.PORT || 4000;
app.listen(port, () => console.log('Server running on port', port));