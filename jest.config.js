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
  "!./coverage/**"
];

module.exports = expoPreset;
