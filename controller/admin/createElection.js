const Election = require("~models/election");
exports.createElection = async function ({ startDate, endDate }) {
  startDate = new Date(startDate);
  endDate = new Date(endDate);
  console.log(startDate, endDate);
  const election = new Election({
    startDate,
    endDate,
  });
  await election.save();
  return election;
};
