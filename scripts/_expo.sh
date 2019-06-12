#!/usr/bin/env bash

# source this to get _expo and _expo_login functions

# Login to expo w/ creds in envoronment
if [[ -z "${EXPO_USERNAME+x}" ]]; then
	echo "$0: \$EXPO_USERNAME not set"
	exit 1
fi
if [[ -z "${EXPO_PASSWORD+x}" ]]; then
	echo "$0: \$EXPO_PASSWORD not set"
	exit 2
fi
if [[ -z "${root+x}" ]]; then
	echo "$0: \$root not set"
	exit 3
fi

_expo(){
	"$root/node_modules/.bin/expo" $@ --non-interactive
}

_expo_login(){
	yes | _expo login -u "$EXPO_USERNAME" -p "$EXPO_PASSWORD"
}
