const typeEnum = ["feat", "fix", "style", "refactor", "test"];
const projectPrefix = "GIT";
module.exports = {
  extends: ["@commitlint/config-conventional"],
  rules: {
    "subject-case": [2, "always", "lower-case"],
    "subject-empty": [2, "never"],
    "type-empty": [2, "never"],
    "type-enum": [2, "always", typeEnum],
  },
  plugins: [
    {
      rules: {
        "type-enum": ({ type, subject, scope }) => {
          const isValidType = typeEnum.includes(type);

          const commitMessage = `${type}(${scope}): ${subject}`;
          const commitPattern = new RegExp(
            `^(${typeEnum.join("|")})\\(\\[${projectPrefix}-\\d+\\]\\): .+$`
          );
          const isCorrectFormat = commitPattern.test(commitMessage);

          if (isValidType && isCorrectFormat) {
            return [true];
          }

          let errorMessage = "";

          if (!isValidType) {
            errorMessage += `Type should be one of: ${typeEnum.join(", ")}. \n`;
          }

          if (!isCorrectFormat) {
            errorMessage += `Commit message should start with ${typeEnum.join(
              ", "
            )} followed by ([${projectPrefix}-<number>]): '.`;
          }

          return [false, errorMessage.trim()];
        },
      },
    },
  ],
};
