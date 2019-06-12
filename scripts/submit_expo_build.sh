#!/usr/bin/env bash
set -ue

export dir="$( cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null 2>&1 && pwd )"
export root="$(dirname $dir)"
source "$dir/_env.sh"
source "$dir/_expo.sh"

echo "----- Signing in to Expo..."
_expo_login

echo "----- Submitting Android build..."
_expo build:android --no-wait

