import { db } from "./config/db";
db().then(() => {
  console.log("hello");
});
