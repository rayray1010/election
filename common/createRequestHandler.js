const { CustomError } = require("./error/customError");
const {
  BadRequestError,
  HttpError,
  ForbiddenError,
  NotFoundError,
  UnauthorizedError,
} = require("./error/httpError");

function createRequestHandler(callback) {
  return function (req, res, next) {
    return tryHandleReq(req, res, next, callback);
  };
}

async function tryHandleReq(req, res, next, callback) {
  try {
    const result = await callback(req, res);
    return res.status(200).json(result);
  } catch (err) {
    if (err instanceof HttpError) {
      return res
        .status(err.statusCode)
        .json({ error: err.toClientMsg ?? "發生錯誤，請聯繫作者！" });
    }
    if (err instanceof CustomError) {
      return res
        .status(500)
        .json({ error: err.toClientMsg ?? "發生錯誤，請聯繫作者！" });
    }
  }
}

exports.createRequestHandler = createRequestHandler;
