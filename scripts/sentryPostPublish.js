#!/usr/bin/env node
/* eslint-disable */
// @ts-ignore
const uploadSourcemaps = require("sentry-expo/upload-sourcemaps");

module.exports = async options => {
  // Wrap the sentry uploadSourcemaps hook, getting the Sentry token
  // from the environment.
  uploadSourcemaps({
    ...options,
    config: {
      organization: "upper-mountain",
      project: "cookie",
      authToken: process.env.SENTRY_AUTH_TOKEN
    }
  });
};
