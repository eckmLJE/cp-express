import "dotenv/config";
import cors from "cors";
import express from "express";

import models, { connectDb } from "./models";

const app = express();

app.use(cors());

const eraseDatabaseOnSync = true;

connectDb().then(async () => {
  if (eraseDatabaseOnSync) {
    await Promise.all([
      models.User.deleteMany({}),
      models.Message.deleteMany({}),
      createUsersWithMessages()
    ]);
  }

  app.listen(process.env.PORT, () =>
    console.log(`Example app listening on port ${process.env.PORT}!`)
  );
});

const createUsersWithMessages = async () => {
  const user1 = new models.User({
    username: "eckm"
  });

  const user2 = new models.User({
    username: "cbrue"
  });

  const message1 = new models.Message({
    text: "started express-mongo backend",
    user: user1.id
  });

  const message2 = new models.Message({
    text: "I am featured",
    user: user2.id
  });

  const message3 = new models.Message({
    text: "Gladly",
    user: user2.id
  });

  await message1.save();
  await message2.save();
  await message3.save();

  await user1.save();
  await user2.save();
};
