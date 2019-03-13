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

echo "----- Publishing expo app..."
_expo publish

if [[ ! -z "${SUBMIT_BUILDS+x}" ]]; then
	echo "----- Submitting Android build..."
	_expo build:android --no-wait --no-publish
fi

