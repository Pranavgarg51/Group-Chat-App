const express = require ("express");
const app = express();
const http =  require("http");
const cors = require ("cors")
const {Server} = require("socket.io")

app.use(cors());
const server = http.createServer(app);

const io = new Server(server,{
    cors:{
        origin:'http://localhost:5173',
        methods:["GET","POST"],
    },

});

io.on ("connection",(socket)=>{
console.log(`user connected:${socket.id} `);
socket.on("send-message", (message)=>{
   // Broadcast the recevied message to all the users
   io.emit("received-message", message);
});

socket.on("disconnect",()=>console.log("user disconnected"))

});

server.listen(5000,()=>console.log("server running on port 5000"))