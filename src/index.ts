import { db } from "./config";
db().then(() => {
  console.log("hello");
});
