const admin = require("../services/firebase");
const User = require("../models/user");
const jwt = require("./jwtAuth");

exports.decodeToken = async (req, res, next) => {
  const token = req.headers.authorization.split(" ")[1];
  try {
    const decodeValue = await admin.auth().verifyIdToken(token);
    if (!decodeValue) throw new Error();

    var user = await User.findOne({ email: decodeValue.email });
    if (!user) {
      user = new User({
        name: decodeValue.name,
        email: decodeValue.email,
        providerId: decodeValue.user_id,
        role: "ROLE_USER"
      });

      await user.save();
    }

    var jwtToken = jwt.authJWT(user);

    return res.json({ token: jwtToken });
  } catch (e) {
    return res.status(500).json({ message: "Internal error" });
  }
};
