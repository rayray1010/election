const User = require("~models/user");
const Candidate = require("~models/candidate");
const { NotFoundError, BadRequestError } = require("~common/error/httpError");
const { checkIsValidId } = require("~common/checker/checkType");

exports.vote = async function ({ userId, candidateId, electionId }) {
  checkIsValidId([userId, candidateId, electionId]);
  const user = await User.findOne(
    {
      _id: userId,
    },
    { votedRecord: 1 }
  );

  if (!user) throw new NotFoundError(`找不到 id: ${userId} 的用戶！`);

  user.votedRecord.forEach((record) => {
    if (record.electionId === electionId)
      throw new BadRequestError("本次選舉已投過票！");
  });

  const candidate = await Candidate.findOne({
    electionId,
    userId: candidateId,
  });

  if (!candidate)
    throw new NotFoundError(`本次選舉找不到 id: ${candidateId} 的參選者！`);

  await candidate.updateOne({ $push: { beVotedList: userId } });

  const afterUser = await user.updateOne({
    $push: { votedRecord: { electionId, candidateId } },
  });

  return afterUser;
};
