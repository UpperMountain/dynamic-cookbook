#!/usr/bin/env bash
set -ue

dir="$( cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null 2>&1 && pwd )"
root="$(dirname $dir)"

# Login to expo w/ creds in envoronment
if [[ -z "${EXPO_USERNAME+x}" ]]; then
	echo "$0: \$EXPO_USERNAME not set"
	exit 1
fi
if [[ -z "${EXPO_PASSWORD+x}" ]]; then
	echo "$0: \$EXPO_PASSWORD not set"
	exit 2
fi

_expo(){
	"$root/node_modules/.bin/expo" $@ --non-interactive
}

echo "----- Signing in to expo..."
yes | _expo login -u "$EXPO_USERNAME" -p "$EXPO_PASSWORD"

# Export Travis environment to the app, for Debug view
export COOKIE_BUILD_COMMIT="$TRAVIS_COMMIT"
export COOKIE_BUILD_TAG="$TRAVIS_TAG"
export COOKIE_BUILD_COMMIT_MESSAGE="$TRAVIS_COMMIT_MESSAGE"
export COOKIE_BUILD_JOB_NUMBER="$TRAVIS_JOB_NUMBER"
export COOKIE_BUILD_NODE_VERSION="$TRAVIS_NODE_VERSION"

echo "----- Publishing expo app..."
_expo publish

# Only submit builds for tagged releases
if [[ ! -z "${TRAVIS_TAG+x}" ]]; then
	echo "----- Submitting Android build..."
	_expo build:android --no-wait --no-publish
fi

