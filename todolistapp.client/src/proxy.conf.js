const PROXY_CONFIG = [
  {
    context: ["/api/ToDoList"],
    target: "https://localhost:7259",
    secure: false,
  },
];

module.exports = PROXY_CONFIG;
