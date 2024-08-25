const socketServer = (io) => {
    io.on('connection', (socket) => {
        console.log('sokect connection')
        socket.on('sendNotification', ({ senderName, receiverName, type }) => {
            const receiver = getUser(receiverName)
            io.to(receiver.socketId).emit('getNotification', {
                senderName,
                type
            })
        })
        socket.emit('notification', ({ socket }) => {
            console.log(msg)
        })
        socket.on('IO', (arg) => {
            console.log(arg)
        })
    })
}
export default socketServer
