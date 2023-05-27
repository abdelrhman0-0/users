const { StatusCodes } = require("http-status-codes");

module.exports = (schema) => {
  return (req, res, next) => {
    const validation = schema.body.validate(req.body);
    if (validation.error) {
      res
        .status(StatusCodes.BAD_REQUEST)
        .json({
          message: validation.error.details[0].message.split('"').join(""),
        });
    } else {
      next();
    }
  };
};
