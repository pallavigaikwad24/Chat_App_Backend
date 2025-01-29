const socketIOInit = (io) => {
    io.on("connection", (socket) => {
        console.log(`Client connected: ${socket.id}`);

        // Event handlers
        socket.on("send_message", async (message) => {
            console.log("Message:", message);
            io.emit("receive_message", message);
        });

        socket.on("file_message", (message) => {
            io.emit("receive_message", message);
        });

        socket.on("img_message", (message) => {
            io.emit("receive_message", message);
        });

        // socket.on("emoji_reaction", (message) => {
        //     io.emit("receive_message", message);
        // });

        socket.on("join_group", (groupId) => {
            socket.join(groupId);
            console.log(`Socket ${socket.id} joined group ${groupId}`);
        });

        // Leave a group
        socket.on("leave_group", (groupId) => {
            socket.leave(groupId);
            console.log(`Socket ${socket.id} left group ${groupId}`);
        });

        socket.on("disconnect", () => {
            console.log(`Client disconnected: ${socket.id}`);
        });
    });
};

module.exports = socketIOInit;
