## Reviewing the Test Environment Setup

### 1- Install Dependencies
npm install --save-dev angular2-template-loader html-loader jasmine
jasmine-spec-reporter karma karma-chrome-launcher karma-jasmine karma-jasmine-html-reporter karma-sourcemap-loader karma-webpack karma-coverage-istanbul-reporter istanbul-instrumenter-loader null-loader protractor ts-loader ts-node @types/jasmine @types/node

### 2- Scripts added to the package.json
"test": "karma start ./test-config/karma.conf.js",
"test-ci": "karma start ./test-config/karma.conf.js --single-run",
"test-coverage": "karma start ./test-config/karma.conf.js --coverage",
"e2e": "npm run e2e-update && npm run e2e-test",
"e2e-test": "protractor ./test-config/protractor.conf.js",
"e2e-update": "webdriver-manager update --standalone false --gecko false"

### 3- Folder test-config coppied from ionic-unit-testing-example and pasted on the root folder

### 4- Folder e2e coppied from ionic-unit-testing-example and pasted on the root folder

### 5- First unit test added by copping src/app/app.component.spec.ts from ionic-unit-testing-example and pasted on src/app/

### 6- Run unit tests
npm run test

### 7- Run e2e tests
npm run e2e

## Problems while setting up the test environment
### 1- Unit test did not run
-- Recreate -> npm run test
-- Message -> Problem running test: Cannot read property 'afterCompile'
-- Solve -> change to lower ts-loader version 3.5
-- Cmd Line:
```sh
npm install --save-dev ts-loader@3.5.0
```
### 2- e2e test did not run
-- Recreate -> npm run e2e
-- Message -> session not created exception: Chrome version must be >= 65.0.3325.0
-- Sove -> Intall newest chrome version
-- Cmd Line:
    google-chrome --version
    sudo apt-get --only-upgrade install google-chrome-stable
