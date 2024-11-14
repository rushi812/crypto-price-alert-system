module.exports = {
  trailingComma: "es5",
  tabWidth: 2,
  printWidth: 120,
  importOrder: [
    "^(?!(@|[./])).*",
    "^@(mui)(.*)$",
    "^@(types)(.*)$",
    "^@(api|config|contexts|hocs|hooks|utils)(.*)$",
    "^@(components|views)(.*)$",
    "^[./]",
    "^.*$",
    ".scss$",
  ],
  importOrderSeparation: true,
  importOrderSortSpecifiers: true,
  plugins: ["@trivago/prettier-plugin-sort-imports"],
};
