const ENV = process.env.NODE_ENV;

const development = "development";
const production = "production";
const docker = "docker";

module.exports = {
  ENV,
  envKeyword: {
    development,
    production,
    docker,
  },
};
