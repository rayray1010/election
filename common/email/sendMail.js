// const sendMail = require("./gmail");
require("dotenv").config();
const nodemailer = require("nodemailer");

const sendToUser = async (emailList, info) => {
  console.log("emailList :>> ", emailList.join());
  let mailTransporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "da866810@gmail.com",
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  let mailDetails = {
    from: "da866810@gmail.com",
    to: emailList.join(),
    subject: "選舉結果",
    html: `<h2>選舉結果</h2>
      ${info.reduce(
        (updated, latest) =>
          updated.concat(`<li>${latest.name} 票數 ${latest.voteCount}</li>`),
        ""
      )}
    `,
  };

  mailTransporter.sendMail(mailDetails, function (err) {
    if (err) {
      console.log("err :>> ", err);
    } else {
      console.log("Email sent successfully");
    }
  });
};

exports.sendToUser = sendToUser;
