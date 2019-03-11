#!/usr/bin/env bash
set -ue

# Check code formatting for correctness
echo "----- Code formatting"
yarn format:check
echo


# Run all tests
echo "----- Test suite"
yarn test:ci
