#!/usr/bin/env bash

pushd src/website/assets;
    npm prune
    npm install
    node_modules/.bin/webpack --watch
popd;