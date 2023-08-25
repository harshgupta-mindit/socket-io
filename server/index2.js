const express = require('express');
const app = express();

const http = require('http');

const {Server} = require('socket.io');

const cors = require('cors');
app.use(cors());

const server = http.createServer(app);

const io = new Server(server, {
    cors:{
        origin: "http://localhost:3000",
        methods: ["GET", "POST"]
    }
})

io.on('connection', (socket)=> {
    console.log(`Client ID : ${socket.id}`);

    socket.on('send_roomID', (data)=> {
        socket.join(data);
        console.log(`Room ID : ${data}`);
    })

    socket.on("send_message", (data)=> {
        console.log(`Message : ${data.message}, Room ID : ${data.roomID}`);

        socket.to(data.roomID).emit("received_message", data.message);
    })

})

server.listen(3001, ()=> {
    console.log("Server is running !!!");
})