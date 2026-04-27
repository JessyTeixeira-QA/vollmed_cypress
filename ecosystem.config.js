module.exports = {
  apps: [
    {
      name: "backend-api",
      cwd: "./server",
      script: "npm",
      args: "run start",
      watch: false,
      env: {
        NODE_ENV: "production",
        PORT: 8080
      },
      error_file: "./logs/backend-error.log",
      out_file: "./logs/backend-out.log",
      log_file: "./logs/backend-combined.log",
      time: true
    },
    {
      name: "frontend-web",
      cwd: "./web",
      script: "npm",
      args: "run start:prod",
      watch: false,
      env: {
        NODE_ENV: "production"
      },
      error_file: "./logs/frontend-error.log",
      out_file: "./logs/frontend-out.log",
      log_file: "./logs/frontend-combined.log",
      time: true
    }
  ]
};