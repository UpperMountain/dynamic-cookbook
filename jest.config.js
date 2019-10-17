const expoPreset = require("jest-expo/jest-preset");

expoPreset.transform = {
  ...expoPreset.transform,
  "^.+\\.{ts,tsx}$": "ts-jest"
};

expoPreset.testMatch = [
  "**/__tests__/**/*.{js,ts,tsx}",
  "**/?(*.)+(spec|test).{js,ts,tsx}"
];

expoPreset.transformIgnorePatterns = [
  "node_modules/(?!(jest-)?react-native|react-clone-referenced-element|@react-native-community|expo(nent)?|@expo(nent)?/.*|react-navigation|@react-navigation/.*|@unimodules/.*|sentry-expo|native-base)"
];

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
  "!./App.tsx",

  // ignore scripts
  "!./scripts/**"
];

module.exports = expoPreset;
