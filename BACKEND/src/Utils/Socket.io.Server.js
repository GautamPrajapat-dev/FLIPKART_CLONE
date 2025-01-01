/* eslint-disable no-console */
// const socketServer = (io) => {
//     io.on('connection', (socket) => {
//         console.log('sokect connection');
//         socket.on('sendNotification', ({ senderName, receiverName, type }) => {
//             // const receiver = getUser(receiverName)
//             io.to(receiverName.socketId).emit('getNotification', {
//                 senderName,
//                 type
//             });
//         });
//         socket.emit('notification', ({ socket }) => {
//             console.log(socket);
//         });
//         socket.on('IO', (arg) => {
//             console.log(arg);
//         });
//     });
// };
// export default socketServer;
