[![Gitpod ready-to-code](https://img.shields.io/badge/Gitpod-ready--to--code-blue?logo=gitpod)](https://gitpod.io/#https://github.com/qahive/generator-robotframework)

# The Robot Fraemwork Test Project Generator

## Usage

Install `yo` and `generator-robotframework`:

```text
npm install -g yo generator-robotframework
```

Generate test project:

    yo robotframework


## Supported Configurations

**General**
* Test library: `Puppeteer` (Default `Puppeteer`)
* Page object pattern: `Yes`, `No` (Default `Yes`)
* ATDD/BDD style: `Yes`, `No` (Default `No`)

FYI: Test library: `Selenium` and `Appium` will support soon.

## Manual Setup
Run following command

    npm install -g .
    cd tmp
    yo robotframework
