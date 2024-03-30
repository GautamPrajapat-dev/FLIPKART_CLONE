const { default: mongoose } = require("mongoose");

const db = async () => {
  const URL =
    "mongodb://goutamprajapat554:goutam123@estore.t8zk1jd.mongodb.net/?retryWrites=true&w=majority&appName=estore";
  try {
    const clientOptions = {
      serverApi: {
        version: "1",
        strict: true,
        deprecationErrors: true,
      },
    };
    await mongoose.connect(URL, clientOptions);
    await mongoose.connection.db.admin().command({ ping: 1 });
    console.log("sucessfully connect");
  } catch (error) {
    console.log(error);
  }
};

module.exports = db;
