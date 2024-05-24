module.exports = {
  extends: ["@commitlint/config-conventional"],
  rules: {
    "type-enum": [
      2,
      "always",
      [
        "build",
        "chore",
        "ci",
        "docs",
        "feat",
        "fix",
        "perf",
        "refactor",
        "revert",
        "style",
        "test",
      ],
    ],
    "type-case": [2, "always", "lower-case"],
    "type-empty": [2, "never"],
    "subject-empty": [2, "never"],
    "subject-case": [0],
    "custom-message": [2, "always"],
  },
  plugins: [
    {
      rules: {
        "custom-message": ({ type }) => {
          const types = [
            "build",
            "chore",
            "ci",
            "docs",
            "feat",
            "fix",
            "perf",
            "refactor",
            "revert",
            "style",
            "test",
          ];
          if (!types.includes(type)) {
            return [
              false,
              `Invalid type: "${type}". Use one of the following types: ${types.join(
                ", "
              )}.`,
            ];
          }
          return [true];
        },
      },
    },
  ],
};
