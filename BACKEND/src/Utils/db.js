const { default: mongoose } = require("mongoose");
const config = require("./config");

const db = async () => {
  try {
    const api = config.get("_URI");
    const clientOptions = {
      serverApi: { version: "1", strict: true, deprecationErrors: true },
    };
    await mongoose.connect(api, clientOptions);
    await mongoose.connection.db.admin().command({ ping: 1 });
    console.log("sucessfully connect");
  } catch (err) {
    console.log(err);
  }
};

module.exports = db;
