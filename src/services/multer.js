const express = require("express");
const multer = require("multer");

var app = express();

const fileStorage = multer.diskStorage({
  destionation: (req, file, cb) => {
    cb(null, '../../public/images');
  },
  filename: (req, file, cb) => {
    cb(null, new Date().toISOString() + "-" + file.originalname);
  },
});

const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === "image/png" ||
    file.mimetype === "image/jpg" ||
    file.mimetype === "image/jpeg"
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

app.use(multer({ storage: fileStorage, fileFilter: fileFilter }).single('image'));

// module.exports = { fileStorage, fileFilter };
