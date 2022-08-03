const Candidate = require("~models/candidate");
const Election = require("~models/election");
const { NotFoundError } = require("~common/error/httpError");
const { checkIsValidId, checkIsNumber } = require("~common/checker/checkType");

exports.getCandidate = async function ({ candidateId, electionId, page = 0 }) {
  checkIsValidId([candidateId, electionId]);
  checkIsNumber(page);
  const electionObj = await Election.findById(electionId);
  if (!electionObj)
    throw new NotFoundError(`找不到 id: ${electionId} 的選舉！`);
  const candidateInfo = await Candidate.aggregate([
    {
      $match: {
        userId: candidateId,
        electionId,
      },
    },
    {
      $project: {
        electionId: 1,
        userId: 1,
        name: 1,
        beVotedCount: { $size: "$beVotedList" },
        beVotedList: { $slice: ["$beVotedList", page * 10, page + 10] },
      },
    },
  ]);
  if (!candidateInfo.length) throw new NotFoundError("查無此選舉人資訊");
  return candidateInfo;
};
