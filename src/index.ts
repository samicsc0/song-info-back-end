import { db } from "./config";
import app from "./app";
db().then(() => {
  app.listen(3000, () => {
    console.log(`Server started running on 3000`);
  });
});
