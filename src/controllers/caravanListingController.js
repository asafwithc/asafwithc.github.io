const fs = require("fs");
const path = require("path");
const aws = require("../services/s3");
const hash = require("random-hash");
const sharp = require('sharp');
const Caravan = require("../models/caravan");

exports.postAddCaravanListing = async (req, res, next) => {
  const userId = req.userId;
  const accomodation = req.body.accomodation;
  const caravanType = req.body.caravanType;
  const imagesPath = await UploadToS3(req.files);

  // const imagesPath = req.files.map((files) => files.path);
  const caravan = new Caravan({
    userId: userId,
    accomodation: accomodation,
    caravanType: caravanType,
    imagesPath: imagesPath,
  });

  caravan
    .save()
    .then((caravan) => res.status(200).json(caravan))
    .catch((err) => {
      err.statusCode = !err.statusCode ? 500 : err.statusCode;
      next(err);
    });
};

exports.getGetCaravanListings = (req, res) => {
  const userId = req.userId;
  const page = req.query.page == null ? 1 : req.query.page;
  const perPage = req.query.perPage == null ? 5 : req.query.perPage;

  Caravan.find({ userId: userId })
    .skip((page - 1) * perPage)
    .limit(perPage)
    .select("-__v")
    .then((result) => res.status(200).json(result));
};

exports.updateListing = (req, res, next) => {
  const caravanId = req.params.caravanId;
  const accomodation = req.body.accomodation;
  const caravanType = req.body.caravanType;
  let imageUrls = req.body.imageUrls;
  if (req.files) {
    imageUrls = req.files.map((files) => files.path);
  }
  if (!imageUrls) {
    const error = new Error("No file picked.");
  }
  Caravan.findById(caravanId)
    .then((caravan) => {
      if (!caravan) {
        const err = new Error("Couldn't find the caravan.");
        err.statusCode = 404;
        throw err;
      }
      if (req.userId != caravan.userId) {
        const err = new Error("Not allowed.");
        err.statusCode = 403;
        throw err;
      }
      caravan.accomodation = accomodation;
      caravan.caravanType = caravanType;
      caravan.imagesPath = imageUrls;

      return caravan.save();
    })
    .then((result) => res.status(200).json(result))
    .catch((err) => {
      err.statusCode = !err.statusCode ? 500 : err.statusCode;
      next(err);
    });
};

exports.deleteListing = (req, res, next) => {
  const caravanId = req.params.caravanId;

  Caravan.findById(caravanId)
    .then((caravan) => {
      if (!caravan) {
        const err = new Error("Couldn't find the caravan.");
        err.statusCode = 404;
        throw err;
      }
      if (req.userId != caravan.userId) {
        const err = new Error("Not allowed.");
        err.statusCode = 403;
        throw err;
      }
      clearImage(caravan.imagesPath);
      return Caravan.findByIdAndRemove(caravanId);
    })
    .then((result) => res.status(200).json({ message: result }))
    .catch((err) => {
      err.statusCode = !err.statusCode ? 500 : err.statusCode;
      next(err);
    });
};

const clearImage = (paths) => {
  paths.forEach((imagePath) => {
    filePath = path.join(__dirname, "..", "..", imagePath);
    fs.unlink(filePath, (err) => {
      if (err) {
        throw new Error(err.message);
      }
    });
  });
};

const UploadToS3 = async (files) => {
  const prefix = "experiment/";
  var imagesURL = [];
  
  await Promise.all(files.map(async (file) => {
    const imageName = prefix + hash.generateHash({ length: 32 }) + ".png";

    const fileBuffer = await sharp(file.buffer)
    .resize({ height: 960, width: 720, fit: "contain" })
    .toBuffer()

    const params = {
      Bucket: process.env.BUCKET_NAME,
      Key: imageName,
      Body: fileBuffer,
      ContentType: file.mimetype,
    };

    const command = new aws.PutObjectCommand(params);

    await aws.s3Client.send(command);

    const signedUrl = await aws.getSignedUrl(
      aws.s3Client,
      new aws.GetObjectCommand({
        Bucket: process.env.BUCKET_NAME,
        Key: imageName
      })
    );

    imagesURL.push(signedUrl);
  }));

  return imagesURL;
};
