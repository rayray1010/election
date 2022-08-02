const { BadRequestError } = require("~common/error/httpError");
const { subtractHours } = require("~common/helper/subtracHours");
const Election = require("~models/election");
exports.createElection = async function ({ startDate, endDate }) {
  let startDateToDb = subtractHours(8, new Date(startDate));
  let endDateToDb = subtractHours(8, new Date(endDate));
  const today = new Date();
  if (today > endDateToDb || startDateToDb > endDateToDb)
    throw new BadRequestError("date 日期邏輯錯誤!");
  const election = new Election({
    startDate: startDateToDb,
    endDate: endDateToDb,
  });
  await election.save();
  return election;
};
