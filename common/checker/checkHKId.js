const { BadRequestError } = require("~common/error/httpError");

exports.checkIsValidHKId = function (HKId) {
  if (typeof HKId === "string" && /^[A-Z][0-9]{6}\([0-9]\)$/.test(HKId))
    return true;
  throw new BadRequestError("身分證格式錯誤！");
};
