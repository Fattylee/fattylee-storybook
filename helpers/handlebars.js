const dayjs = require('dayjs');
const debug = require('debug')('active:app');
const path = require('path');

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
    isEqual(a, b={}, options) {
      if(a.toString() === b.toString()) return options.fn(this);
      options.inverse(this);
    },
    isNotEqual(a, b={}, options) { 
      if(a.toString() !== b.toString()) return options.fn(this);
      return options.inverse(this);
    },
    select(status, options) { 
      if(status) return options.fn(this).replace(new RegExp(`(value="${status}")`), '$1 selected');
    },
    truncateDetails(words, length) {
      return words.substr(0, length) + ' . . .';
    },
    imagePath(baseName, imageName) {
      const fullPath = path.join('/img/uploads/', baseName, '/', imageName);
      return /https?:\/\//i.test(imageName) ? imageName : fullPath;
    },
   },
};