#!/usr/bin/env bash
set -ue

dir="$( cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null 2>&1 && pwd )"
root="$(dirname $dir)"

cd "$root"

# Check code formatting for correctness
echo "----- Code formatting"
yarn format:check
echo


# Run all tests
echo "----- Test suite"
yarn test:ci

# If on travis, upload test coverage
if [[ "$CI" == "true" ]]; then
	echo "Uploading code coverage to coveralls.io..."
	cat ./coverage/lcov.info | coveralls
fi
