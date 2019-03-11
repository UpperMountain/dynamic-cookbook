#!/usr/bin/env bash

if [[ $(type -t convert) != "file" ]]; then
	echo "$0: could not find 'convert' binary"
	exit 1
fi

if [[ "$#" != 2 ]]; then
	echo "Usage: $0 [source] [destination]"
	exit 2
fi

convert "$1" -alpha off "$2"
