const User = require("~models/user");
const { BadRequestError } = require("~common/error/httpError");
const { checkIsString } = require("~common/checker/checkType");
const { checkIsValidHKId } = require("~common/checker/checkHKId");

exports.createUser = async function ({ name, email, IdNumber }) {
  checkIsValidHKId(IdNumber);
  checkIsString(name);
  checkIsString(email, "email 格式不正確");
  const userCheck = await User.findOne({ IdNumber });
  if (userCheck) throw new BadRequestError("此身分證已註冊過！");
  const user = new User({ name, email, IdNumber });
  const obj = await user.save();
  return obj;
};
