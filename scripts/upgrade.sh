#!/bin/bash

printf " \n"
printf " --------------------------------------\n"

if [[ $1 == "staging" ]]
then
  printf "  Upload epha.io/datensatz/* \n"
  aws --region eu-central-1 s3 sync --delete assets/ s3://epha.io/datensatz/assets/
  aws --region eu-central-1 s3 sync --delete data/ s3://epha.io/datensatz/data/

  aws --region eu-central-1 s3 cp index.html s3://epha.io/datensatz/index.html
  aws --region eu-central-1 s3 cp _coverpage.md s3://epha.io/datensatz/_coverpage.md
  aws --region eu-central-1 s3 cp SUMMARY.md s3://epha.io/datensatz/SUMMARY.md
  aws --region eu-central-1 s3 cp README.md s3://epha.io/datensatz/README.md
  aws --region eu-central-1 s3 cp LICENSE.md s3://epha.io/datensatz/LICENSE.md
  aws --region eu-central-1 s3 sync --delete docs/ s3://epha.io/datensatz/docs/

  aws cloudfront create-invalidation --distribution-id 	E3O8ET4HHUEUOM --paths /datensatz/* 1> /dev/null
fi

if [[ $1 == "release" ]]
then
  printf "  Upload epha.ch/assets \n"
  aws --region eu-central-1 s3 sync --delete assets/ s3://epha.ch/datensatz/assets/
  aws --region eu-central-1 s3 sync --delete data/ s3://epha.ch/datensatz/data/

  aws --region eu-central-1 s3 cp index.html s3://epha.ch/datensatz/index.html
  aws --region eu-central-1 s3 cp _coverpage.md s3://epha.ch/datensatz/_coverpage.md
  aws --region eu-central-1 s3 cp SUMMARY.md s3://epha.ch/datensatz/SUMMARY.md
  aws --region eu-central-1 s3 cp README.md s3://epha.ch/datensatz/README.md
  aws --region eu-central-1 s3 cp LICENSE.md s3://epha.ch/datensatz/LICENSE.md
  aws --region eu-central-1 s3 sync --delete docs/ s3://epha.ch/datensatz/docs/

  aws cloudfront create-invalidation --distribution-id 	ES8QILS3Z5OA1 --paths /datensatz/* 1> /dev/null
fi


printf " --------------------------------------\n"
printf " \n"
