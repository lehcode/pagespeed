# Google PageSpeed example

Displays PageSpeed results for predefined set of pages.

### Prepare
Copy `.env.dist` to `.env` and add PageSpeed API key to it.
 
Add AWS account secrets in `~/.aws/credentials` with following content:

```
[default]
aws_access_key_id = <ACCESS_KEY_ID>
aws_secret_access_key = <SECRET_ACCESS_KEY>
```

## Run tests

  1. Use `yarn install` to install dependencies.
  2. Run `yarn test` to run tests

## Fetch data

  1. Run local endpoint using Serverless machine with `yarn local` in other shell.
  2. Use endpint URL displayed upon Step 1 to fetch live metrics in JSON format.
