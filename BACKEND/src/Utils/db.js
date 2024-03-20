const { default: mongoose } = require("mongoose");

const db = async () => {
  try {
    const clientOptions = {
      serverApi: { version: "1", strict: true, deprecationErrors: true },
    };
    await mongoose.connect(process.env.URL, clientOptions);
    await mongoose.connection.db.admin().command({ ping: 1 });
    console.log("sucessfully connect");
  } catch (error) {
    console.log(error);
  }
};

module.exports = db;
