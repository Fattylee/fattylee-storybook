require("dotenv").config();
if (process.env.NODE_ENV === "production") {
  module.exports = require("./prod");
} else if (process.env.NODE_ENV === "staging") {
  module.exports = require("./stag");
} else {
  module.exports = require("./dev");
}
