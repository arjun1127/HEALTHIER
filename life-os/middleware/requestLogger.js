module.exports = function (req, res, next) {
  const start = Date.now();
  const method = req.method;
  const url = req.originalUrl;

  res.on("finish", () => {
    const duration = Date.now() - start;
    console.log(
      `${method} ${url} → ${res.statusCode} (${duration}ms)`
    );
  });

  next();
};
