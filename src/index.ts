import { db } from "./config";
import app from "./app";
console.log("starting app");
db().then(() => {
  console.log("db connected");
  app.listen(3000, () => {
    console.log(`Server started running on 3000`);
  });
});
