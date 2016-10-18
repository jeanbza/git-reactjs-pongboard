#!/usr/bin/env bash

pushd src/website/assets;
    npm prune
    npm install
    node_modules/.bin/webpack
popd;

pushd src/website;
    GOOS=linux go build
popd;

rm -rf deploy 2>/dev/null;
mkdir -p deploy

pushd deploy;
    cp ../manifest.yml manifest.yml
    cp -R ../src/website/dist dist/
    cp -R ../src/website/images images/
    cp -R ../src/website/templates templates/
    cp ../src/website/website website

    chmod a+x website

    echo "web: website" > Procfile

    cf login -a api.run.pivotal.io -o denver-labs -s development
    cf push
popd;