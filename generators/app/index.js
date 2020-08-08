const Generator = require('yeoman-generator')
const chalk = require('chalk')
const yosay = require('yosay')
const Scaffold = require('scaffold-generator')
const mustache = require('mustache')
const commonPrompts = require('common-generator-prompts')()

// Reference
// https://github.com/cristian-rincon/py-struct/blob/master/app/index.js
module.exports = class extends Generator {
  prompting() {
    this.log(yosay(
        "Welcome to robotframework-puppeteer\n" +
        "I'll walk you through the installation."
    ));

    return;
  }

  writing() {
    return;
  }

  end() {
    return;
  }

}
