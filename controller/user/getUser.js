const User = require("~models/user");
const { NotFoundError } = require("~common/error/httpError");
const { checkIsValidId } = require("~common/checker/checkType");

exports.getUser = async function ({ userId }) {
  checkIsValidId(userId);

  const user = await User.findOne({ _id: userId }).lean();

  if (!user) throw new NotFoundError("找不到該用戶");
  return user;
};
