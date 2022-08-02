const { connectMongo, disconnectMongo } = require("./common/mongodb/mongoDB");
const expressServer = require("./expressServer");
const { emailSchedule } = require("./batch/sendEmailOnTime");
async function main() {
  const app = expressServer();
  const PORT = process.env.PORT || 3000;
  await connectMongo();
  const server = app.listen(PORT, async () => {
    await emailSchedule();
    console.log(`server is running at port:${PORT}`);
  });
  process.on("SIGINT", () => {
    server.close(async (err) => {
      if (err) {
        console.log(err);
        process.exit(1);
      }
      await disconnectMongo();
      console.log("server closed!");
    });
  });
}

main();
