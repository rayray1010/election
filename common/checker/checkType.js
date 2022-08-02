const { BadRequestError } = require("~common/error/httpError");
const isObjectId = require("mongoose").isObjectIdOrHexString;
const defaultErrorMsg = "請確認所有參數皆已填入！";

exports.checkIsString = function (
  value,
  errorMsg = defaultErrorMsg,
  { allowEmptyString = true } = {}
) {
  if (typeof value !== "string" || (!allowEmptyString && value === "")) {
    throw new BadRequestError(errorMsg);
  }
};

exports.checkIsNumber = function (value, errorMeg = defaultErrorMsg) {
  if (typeof value !== "number") throw new BadRequestError(errorMeg);
};

exports.checkIsValidId = function (ids, errorMeg = "請輸入正確 id") {
  if (Array.isArray(ids)) {
    ids.forEach((id) => {
      if (!isObjectId(id)) throw new BadRequestError(errorMeg);
    });
  } else {
    if (!isObjectId(ids)) throw new BadRequestError(errorMeg);
  }
};
