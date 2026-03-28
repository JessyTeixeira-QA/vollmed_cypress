module.exports = {
  apps: [
    {
      name: "backend-api",
      cwd: "./server",
      script: "npm",
      args: "run start",
      instances: 1,
      exec_mode: "fork",
      env: {
        NODE_ENV: "production",
        PORT: 8080
      }
    },
    {
      name: "frontend-web",
      cwd: "./web",
      script: "npm",
      args: "run start:prod",
      instances: 1,
      exec_mode: "fork",
      env: {
        NODE_ENV: "production"
      }
    }
  ]
};
