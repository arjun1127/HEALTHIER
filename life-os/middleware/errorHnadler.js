module.exports = function (err, req, res, next) {
  console.error(" Server Error:", err);

  if (res.headersSent) {
    return next(err);
  }

  res.status(err.statusCode || 500).json({
    success: false,
    error: err.message || "Internal Server Error",
  });
};
