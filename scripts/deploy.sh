#!/usr/bin/env bash
set -ue

# Login to expo w/ creds in envoronment
if [[ -z "${EXPO_USERNAME+x}" ]]; then
	echo "$0: \$EXPO_USERNAME not set"
	exit 1
fi
if [[ -z "${EXPO_PASSWORD+x}" ]]; then
	echo "$0: \$EXPO_PASSWORD not set"
	exit 2
fi

echo "----- Signing in to expo..."
yes | expo login -u "$EXPO_USERNAME" -p "$EXPO_PASSWORD"

echo "----- Publishing expo app..."
expo publish

echo "----- Submitting Android build..."
expo build:android --no-wait --no-publish

