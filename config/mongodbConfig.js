const { ENV, envKeyword } = require("./env");

module.exports = mongodb(ENV);

function mongodb(env) {
  switch (env) {
    case envKeyword.production: {
      return {
        mongoUrl:
          "mongodb+srv://daniel:danielProject@cluster0.awt41.mongodb.net/?retryWrites=true&w=majority",
      };
    }
    case envKeyword.development: {
      return {
        mongoUrl: "mongodb://127.0.0.1:27017/election",
      };
    }
    case envKeyword.docker: {
      return {
        mongoUrl: "mongodb://mongo:27017/election",
      };
    }

    default: {
      return {
        mongoUrl: "mongodb://127.0.0.1:27017/election",
      };
    }
  }
}
