const { default: mongoose } = require("mongoose");

const db = async () => {
  const uri =
    "mongodb+srv://goutam:fvPSHkRJlcpCqncG@estore.7jtxuw1.mongodb.net/?retryWrites=true&w=majority&appName=Estore";

  try {
    const clientOptions = {
      serverApi: { version: "1", strict: true, deprecationErrors: true },
    };
    await mongoose.connect(uri, clientOptions);
    await mongoose.connection.db("admin").command({ ping: 1 });
    console.log("sucessfully connect");
  } catch (err) {
    console.log(err);
  } finally {
    // Ensures that the client will close when you finish/error
    await mongoose.disconnect();
  }
};

module.exports = db;
