const mongoose = require("mongoose");

const dbConncection = () => {
  mongoose
    .connect(process.env.MONGO_CONNECTION)
    .then(() => {
      console.log("DB Conncected");
    })
    .catch((error) => {
      console.log(error);
    });
};
module.exports = dbConncection;
