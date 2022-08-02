const Candidate = require("~models/candidate");
const { NotFoundError } = require("~common/error/httpError");
const { checkIsValidId } = require("~common/checker/checkType");

exports.getAllCandidates = async function ({ electionId }) {
  checkIsValidId(electionId);
  const candidateInfo = await Candidate.aggregate([
    { $match: { electionId } },
    {
      $project: {
        electionId: 1,
        userId: 1,
        name: 1,
        beVotedCount: { $size: "$beVotedList" },
      },
    },
    {
      $sort: {
        beVotedCount: -1,
      },
    },
  ]);
  if (!candidateInfo.length)
    throw new NotFoundError(`找不到 id 為： ${electionId} 的選舉`);
  return candidateInfo;
};
