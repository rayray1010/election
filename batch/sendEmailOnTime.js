const schedule = require("node-schedule");
const Election = require("~models/election");
const { sendToUser } = require("~common/email/sendMail");
const User = require("~models/user");
const Candidate = require("~models/candidate");

const emailSchedule = async () => {
  const latestElection = await Election.find(
    { isActivated: true },
    { endDate: 1 }
  )
    .sort({ createdAt: -1 })
    .limit(1);

  if (!latestElection.length) return;

  console.log("latestElection :>> ", latestElection[0].endDate);
  console.log(`now => ${new Date().toISOString()}`);

  let job = schedule.scheduleJob(latestElection[0].endDate, async () => {
    try {
      const userEmails = await User.find(
        {
          votedRecord: {
            $elemMatch: { electionId: latestElection[0]._id.toHexString() },
          },
        },
        { email: 1, _id: 0 }
      );
      const candidateInfo = await Candidate.aggregate([
        {
          $match: { electionId: latestElection[0]._id.toHexString() },
        },
        {
          $project: { name: 1, voteCount: { $size: "$beVotedList" } },
        },
        {
          $sort: {
            voteCount: -1,
          },
        },
      ]);
      const emailList = userEmails.map((user) => user.email);
      await sendToUser(emailList, candidateInfo);
    } catch (err) {
      console.log(err);
    }
  });
  return { job };
};

exports.emailSchedule = emailSchedule;
