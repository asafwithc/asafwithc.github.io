const express = require("express");
const multer = require("multer");
const hash = require('random-hash');

var app = express();

const fileStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'images');
  },
  filename: (req, file, cb) => {
    let temp = file.originalname.split('.');
    const filename = temp[0] + '-' + hash.generateHash({length: 5}) + '.' + temp[1];
    cb(null, filename);
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

module.exports = { fileStorage, fileFilter };
