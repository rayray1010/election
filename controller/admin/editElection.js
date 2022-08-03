const { subtractHours } = require("~common/helper/subtractHours");
const Election = require("~models/election");
const { checkIsValidId } = require("~common/checker/checkType");
const { NotFoundError } = require("~common/error/httpError");
const { emailSchedule } = require("~batch/sendEmailSchedule");
exports.editElection = async function ({
  electionId,
  startDate,
  endDate,
  isActivated,
}) {
  checkIsValidId(electionId);
  const electionObj = await Election.findById(electionId);
  if (!electionObj)
    throw new NotFoundError(`找不到 id 為 ${NotFoundError} 的選舉！`);
  let startDateToDb = subtractHours(8, new Date(startDate));
  let endDateToDb = subtractHours(8, new Date(endDate));
  electionObj.startDate = startDateToDb;
  electionObj.endDate = endDateToDb;
  electionObj.isActivated = isActivated;
  await electionObj.save();
  await emailSchedule();
  return electionObj;
};
