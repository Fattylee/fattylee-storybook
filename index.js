const mongoose = require('mongoose');
const express = require('express');
const methodOverride = require('method-override');
const morgan = require('morgan');
const exphbs = require('express-handlebars');
const path = require('path');
const ideas = require('./routes/ideas');

mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.Promise = global.Promise;


const app = express();

const startDB = async (mongdbUri) => {
  try {
    await mongoose.connect(mongdbUri);
    console.log('connected to mongodb(expert)');
  }
  catch(ex) {
    console.error('Could not connect', ex.message);
  }
};
startDB('mongodb://localhost/expert');



app.use(morgan('tiny'));
app.use(methodOverride('_method'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.engine('html', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'html');
app.use(express.static(path.join(__dirname, 'public')));


app.use('/ideas', ideas);
app.get('/', (req, res) => {
  res.render('index');
});



const port = 4000;
app.listen(port, () => console.log('Server running on port', port));