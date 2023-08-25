const express = require('express');
const app = express();
const http = require('http');

const {Server} = require('socket.io');

const cors = require('cors');
app.use(cors());

const server = http.createServer(app);


const io = new Server(server, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"],
    },
});

io.on("connection", (socket)=> {
    console.log(`CLient ID is : ${socket.id}`)

    socket.on("roomID", (data)=> {
        socket.join(data.roomID)
    })

    socket.on("send_message", (data)=> {
        console.log(data);
        socket.to(data.roomID).emit("received_meesage", data.message)
    })


})


server.listen(3001, ()=> {
    console.log("Server is running!!!!");
})