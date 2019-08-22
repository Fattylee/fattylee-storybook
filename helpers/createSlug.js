const uuid = require('uuid/v1');

const createSlug = (filename, userId) => {
  const extIndex = filename.lastIndexOf('.');
  const ext = filename.slice(extIndex + 1);
  const name = filename.slice(0, extIndex);
  const file = name.toLowerCase().replace(/\W+/ig, '-');
  const len = file.length;
  const slug = file[len - 1].includes('-') ? file.slice(0,len - 1) : file;
  return `${userId}/${slug}-${uuid()}.${ext}`;
};

module.exports = createSlug;
