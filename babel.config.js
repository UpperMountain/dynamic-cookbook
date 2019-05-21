module.exports = api => {
  api.cache(true);
  return {
    presets: ["babel-preset-expo"],
    plugins: [
      [
        "transform-inline-environment-variables",
        {
          include: [
            "NODE_ENV",
            "COOKIE_BUILD_COMMIT",
            "COOKIE_BUILD_COMMIT_MESSAGE",
            "COOKIE_BUILD_JOB_NUMBER",
            "COOKIE_BUILD_NODE_VERSION"
          ]
        }
      ]
    ]
  };
};
