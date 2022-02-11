### Admin account settings
1. Admin email setting = firebase functions:config:set admin.email=admin@email.com admin.db_url=databaseURL(ex: http://~firebase.app)
2. Setting check = firebase functions:config:get
3. ./functions/index.js > databaseURL: functions.config().admin.db_url

[ Ref : https://firebase.google.com/docs/functions/config-env?authuser=0 ]

4. database.rules.json
[ Ref : https://firebase.google.com/docs/database/security/rules-conditions?authuser=0#referencing_data_in_other_paths]

### Delete Function
1. firebase.json > "npm --prefix %RESOURCE_DIR% run lint"

### Date displayed
1. yarn add moment
2. create global JS file > plugins diretory