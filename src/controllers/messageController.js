const Message = require("../models/message");

exports.getMessages = (req, res, next) => {
  const page = req.query.page == null ? 1 : req.query.page;
  const perPage = req.query.perPage == null ? 25 : req.query.perPage;

  const senderId = req.query.senderId;
  const receiverId = req.body.receiverId;

  const messages = Message.find({
    senderId: senderId,
    receiverId: receiverId,
  })
    .skip((page - 1) * perPage)
    .limit(perPage)
    .sort({ updatedAt: 1 })
    .then((messages) => {
      res.status(200).json(messages);
    })
    .catch((err) => {
      err.statusCode = !err.statusCode ? 500 : err.statusCode;
      next(err);
    });
};

exports.postMessage = (req, res, next) => {
  const senderId = req.body.senderId;
  const receiverId = req.body.receiverId;
  const content = req.body.content;

  const message = new Message({
    senderId: senderId,
    receiverId: receiverId,
    content: content,
  });

  message
    .save((message) => res.status(200).json(message))
    .catch((err) => {
      err.statusCode = !err.statusCode ? 500 : err.statusCode;
      next(err);
    });
};
