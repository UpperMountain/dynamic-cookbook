const expoPreset = require("jest-expo/jest-preset");

expoPreset.transform = {
  ...expoPreset.transform,
  "^.+\\.{ts,tsx}$": "ts-jest"
};

expoPreset.testMatch = [
  "**/__tests__/**/*.{js,ts,tsx}",
  "**/?(*.)+(spec|test).{js,ts,tsx}"
];

expoPreset.moduleFileExtensions = ["js", "ts", "tsx"];

expoPreset.globals = {
  "ts-jest": {
    tsConfig: {
      jsx: "react"
    }
  }
};

expoPreset.collectCoverageFrom = [
  "./{**/,}*.{js,ts,tsx}",
  "!./{**/,}*.config.js",
  "!./coverage/**",

  // Ignore navigation index files, they're mostly 3rd-party glue code and hard to test
  "!./screens/{Browse/,Meal/,}index.tsx",

  // Same with the main index file.
  "!./App.tsx"
];

module.exports = expoPreset;
