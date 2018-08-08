#!/bin/bash

printf " \n"
printf " --------------------------------------\n"

if [[ $1 == "staging" ]]
then
  printf "  Upload epha.io/datensatz/* \n"

  aws --region eu-central-1 s3 sync --delete datensatz/ s3://epha.io/datensatz/ --exclude .DS_Store

  aws cloudfront create-invalidation --distribution-id 	E3O8ET4HHUEUOM --paths /datensatz/* 1> /dev/null
fi

if [[ $1 == "release" ]]
then
  printf "  Upload epha.ch/datensatz/ \n"

  aws --region eu-central-1 s3 sync --delete datensatz/ s3://epha.ch/datensatz/ --exclude .DS_Store

  aws cloudfront create-invalidation --distribution-id 	ES8QILS3Z5OA1 --paths /datensatz/* 1> /dev/null
fi


printf " --------------------------------------\n"
printf " \n"
