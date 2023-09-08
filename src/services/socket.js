const { Server } = require("socket.io");
const www = require("../../bin/www");
const jwt = require("jsonwebtoken");

const Message = require("../models/message");
const OnlineUser = require("../models/onlineUser");
const User = require('../models/user');

const io = new Server(www.server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"]
  },
});

io.on("connection", (socket) => {
  // console.log(socket.id);

  socket.on("add-user", async (data) => {
    senderId = jwt.decode(data.senderToken)._id;

    const onlineUser = new OnlineUser({
      userId: senderId,
      socketId: socket.id,
    });

    await onlineUser.save().catch(err => console.log(err));
  });

  socket.on("send-msg", async (data) => {
    try {
      console.log(data.senderId);
      const receiver = OnlineUser.findOne({userId: data.receiverId});
      const message = new Message({
        senderId: data.senderId,
        receiverId: data.receiverId,
        content: data.content,
      }); 

      await message.save();
      io.to(receiver.socketId).emit("receive-msg", message);
    } catch (err) {
      console.log("error sending message: ", err);
    }
  });

  socket.on("disconnect", async () => {
    console.log("disconnected: ");
    await OnlineUser.deleteOne({ socketId: socket.id })
      .then(() => console.log("deleted"))
      .catch((err) => console.log(err));
  });
});

