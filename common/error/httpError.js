const { CustomError } = require("./customError");

class HttpError extends CustomError {
  constructor(statusCode, message) {
    super(message, { toClientMsg: message });
    this.statusCode = statusCode;
  }
}
exports.HttpError = HttpError;

exports.NotFoundError = class NotFoundError extends HttpError {
  constructor(message = "找不到該資源") {
    super(404, message);
  }
};

exports.ForbiddenError = class ForbiddenError extends HttpError {
  constructor(message) {
    super(403, message);
  }
};

exports.UnauthorizedError = class UnauthorizedError extends HttpError {
  constructor(message = "請先登入後再操作") {
    super(401, message);
  }
};

exports.BadRequestError = class BadRequestError extends HttpError {
  constructor(message) {
    super(400, message);
  }
};
