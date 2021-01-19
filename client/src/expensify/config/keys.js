import testDbKeys from "./test_db";
import prodKeys from "./prod";

let keys;

if (process.env.NODE_ENV === "production") {
  keys = prodKeys;
} else if (process.env.NODE_ENV === "test") {
  keys = testDbKeys;
} else {
  keys = require("./dev");
}

console.log(keys, "=======keys====");
console.log(process.env);
export default keys;
