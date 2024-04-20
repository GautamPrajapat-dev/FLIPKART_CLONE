const socketServer = (io) => {
  io.on("connection", (socket) => {
    console.log("sokect connection");
    socket.emit("MSG", (msg) => {
      console.log(msg);
    });
    socket.on("IO", (arg) => {
      console.log(arg);
    });
  });
};
module.exports = socketServer;
