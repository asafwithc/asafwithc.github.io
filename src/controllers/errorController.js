var createError = require("http-errors");

exports.catch404 = (req, res, next) => {
  next(createError(404));
};

exports.get404 = (err, req, res, next) => {
  const status = err.statusCode || 500;
  const message = err.message;
  res.status(status).json({ message: message });
//   // set locals,  only providing error in development
//   res.locals.message = err.message;
//   res.locals.error = req.app.get("env") === "development" ? err : {};

//   // render the error page
//   res.status(err.status || 500);
};
