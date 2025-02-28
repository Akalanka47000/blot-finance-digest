module.exports = {
  extends: ["@commitlint/config-conventional"],
  rules: {
    "type-enum": [
      2,
      "always",
      ["Feat!", "Feat", "Fix", "Patch", "Chore", "Build", "Perf", "Refactor", "Revert", "CI", "Style", "Test", "Docs", "Debug", "WIP"]
    ],
    "type-case": [0],
    "subject-case": [0]
  }
};
