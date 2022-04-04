# SFMC Template Composer

POC API serverless app to convert terminus collections in to HTML newsletter content.

## Install

```
nvm use

npm install
```

## Running

```
npm run build

serverless invoke local --function template --data '{ "queryStringParameters": { "clientid": "test" }, "pathParameters": { "collectionid": "45910" } }' --env CLIENT_ID: test > test.html
```

## Deploy

```
# connect using aws-azure
aws-azure-login --profile abc
# select your profile
export AWS_PROFILE=abc
```

```
# create deployment s3 bucket
# (only if first time)
aws s3 mb s3://sfmc-template-composer-app
```

```
# package cf template
aws cloudformation package --template-file cloudformation.yaml --s3-bucket sfmc-template-composer-app --output-template-file packaged-template.yaml
```

```
# validate template
aws cloudformation validate-template --template-body file://packaged-template.yaml
```

```
# deploy to AWS
aws cloudformation deploy --template-file packaged-template.yaml --stack-name sfmc-template-composer --region ap-southeast-2 --capabilities CAPABILITY_IAM
```

```
# delete stack
aws cloudformation delete-stack --stack-name sfmc-template-composer
```

# Known Issues

Javscript template strings do not play nice with EJS templates. They encode all line breaks and double quotes. To resolve this issue we need to support external `.ejs` files rather than JS template strings.
