const { v1: uuid } = require("uuid");

const createSlug = (filename, userId) => {
  if (!userId) throw new Error("userId is required");

  if (!filename.includes("."))
    throw new Error(
      'Invalid filename, "filename" must include an extension name.'
    );
  const extIndex = filename.lastIndexOf(".");
  const ext = filename.slice(extIndex + 1);
  const name = filename.slice(0, extIndex);
  const file = name.toLowerCase().replace(/\W+/gi, "-");
  const len = file.length;
  // remove trailing dash
  const slug = file[len - 1].includes("-") ? file.slice(0, len - 1) : file;
  return `${userId}/${slug}-${uuid()}.${ext}`;
};

module.exports = createSlug;
