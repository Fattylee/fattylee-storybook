const dayjs = require('dayjs');
const debug = require('debug')('active:app');


module.exports = {
  // optional config goes here
  extname: 'html',
  helpers: {
    capitalizeEach(name) {
      return name.split(/\s+/)
      .map(e => e.slice(0,1).toUpperCase() + e.slice(1))
      .join(' ');
    }, 
    displayDate(date, format) {
      const formattedDate = dayjs(date).format(format);
      return  formattedDate;
    },
    isEqual(a, b, options) {
      debug(a, b, typeof a, typeof b);
      if(a.toString() === b.toString()) return options.fn(this);
      options.inverse(this);
    },
    isNotEqual(a, b, options) {
      debug('a b', a, b);
      if(a.toString() !== b.toString()) return options.fn(this);
      return options.inverse(this);
    },
   },
};
