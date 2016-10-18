#!/usr/bin/env bash

pushd src/website/assets;
    npm prune
    npm install
    node_modules/.bin/webpack
popd;

pushd src/website;
    go run main.go
popd;