const User = require("~models/user");
const Candidate = require("~models/candidate");
const { BadRequestError } = require("~common/error/httpError");
const { checkIsValidId } = require("~common/checker/checkType");

exports.getCandidates = async function ({ userId, electionId }) {
  checkIsValidId([userId, electionId]);
  const userCheck = await User.findOne({
    _id: userId,
    votedRecord: { $elemMatch: { electionId } },
  });
  if (!userCheck) throw new BadRequestError("請先進行投票！");
  const candidates = await Candidate.aggregate([
    { $match: { electionId } },
    { $project: { name: 1, beVotedCount: { $size: "$beVotedList" } } },
  ]);
  return candidates;
};
