const User = require("~models/user");
const Candidate = require("~models/candidate");
const Election = require("~models/election");
const { NotFoundError, BadRequestError } = require("~common/error/httpError");
const { checkIsValidId } = require("~common/checker/checkType");
const { emailSchedule } = require("~batch/sendEmailSchedule");

exports.addCandidate = async function ({ userId, electionId }) {
  checkIsValidId([userId, electionId]);
  const today = new Date();
  const user = await User.findById(userId);
  if (!user) throw new NotFoundError(`找不到 userId : ${userId} 的用戶！`);

  const election = await Election.findById(electionId);
  if (!election)
    throw new NotFoundError(`找不到 electionId: ${electionId} 的選舉！`);

  const candidateCheck = await Candidate.findOne({ userId, electionId });
  if (candidateCheck) throw new BadRequestError(`userId: ${userId} 已參選！`);

  const newCandidate = new Candidate({ userId, electionId, name: user.name });
  await newCandidate.save();

  const activationOfElectionCheck = await Candidate.find({
    electionId,
  }).count();
  if (
    activationOfElectionCheck > 1 &&
    election.isActivated === false &&
    today > election.startDate()
  ) {
    await election.updateOne({ isActivated: true });
    await emailSchedule();
  }
  return newCandidate;
};
