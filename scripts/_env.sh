#!/usr/bin/env bash

# source this to get the COOKIE_BUILD_* env vars

export COOKIE_BUILD_COMMIT="${TRAVIS_COMMIT:-}"
export COOKIE_BUILD_TAG="${TRAVIS_TAG:-}"
export COOKIE_BUILD_COMMIT_MESSAGE="${TRAVIS_COMMIT_MESSAGE:-}"
export COOKIE_BUILD_JOB_NUMBER="${TRAVIS_JOB_NUMBER:-}"
export COOKIE_BUILD_NODE_VERSION="${TRAVIS_NODE_VERSION:-}"
