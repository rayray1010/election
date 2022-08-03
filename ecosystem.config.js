module.exports = {
  apps: [
    {
      name: "election",
      script: "./app.js",
      watch: true,
      env: {
        NODE_ENV: "production",
      },
    },
  ],
};
