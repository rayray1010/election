const Election = require("~models/election");
const { NotFoundError } = require("~common/error/httpError");

exports.getAllElection = async function () {
  const elections = await Election.find().sort({ createdAt: -1 });
  if (!elections.length) throw new NotFoundError(`目前尚未新增選舉！`);
  return elections;
};
