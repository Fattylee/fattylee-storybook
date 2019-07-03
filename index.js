const express = require('express');
const methodOverride = require('method-override');
const morgan = require('morgan');
const exphbs = require('express-handlebars');
const path = require('path');
const stories = require('./routes/stories');
const users = require('./routes/users');
const startDB = require('./startups/db');

startDB();
const app = express();
app.use(morgan('tiny'));
app.use(methodOverride('_method'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.engine('html', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'html');
app.use(express.static(path.join(__dirname, 'public')));


app.use('/stories', stories);
app.use('/users', users);
app.get('/', (req, res) => {
  res.render('index');
});

app.get('/about', (req, res) => {
  res.render('about');
});

const port = process.env.PORT || 4000;
app.listen(port, () => console.log('Server running on port', port));