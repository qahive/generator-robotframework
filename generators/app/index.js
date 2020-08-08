const Generator = require('yeoman-generator')
const chalk = require('chalk')
const yosay = require('yosay')
const validator = require("validator");
const Scaffold = require('scaffold-generator')
const mustache = require('mustache')
const commonPrompts = require('common-generator-prompts')()

// Reference
// https://github.com/cristian-rincon/py-struct/blob/master/app/index.js
// https://github.com/angular-fullstack/generator-angular-fullstack/blob/master/src/generators/app/index.js
module.exports = class extends Generator {
  prompting() {
    this.log(yosay(
        "Welcome to robotframework-puppeteer\n" +
        "I'll walk you through the installation."
    ));

    return this.prompt([
    {
      type: "input",
      name: "project_name",
      message: "Please input project name without space",
      default: '',
      validate: function (input) {
          return validator.isAlphanumeric(input);
      }
    }, {
      type: "input",
      name: "page_object",
      message: "Would you like to use Page object pattern?",
      default: true
    }, {
      type: "input",
      name: "atdd",
      message: "Would you like to use ATDD/BDD?",
      default: false
    }, {
      type: "input",
      name: "pdf",
      message: "Would you like to include PDF reader?",
      default: true
    }, {
      type: "input",
      name: "zxing",
      message: "Would you like to include QRCode reader?",
      default: true
    }, {
      type: "input",
      name: "percy",
      message: "Would you like to include Visual Testing?",
      default: true
    }]);
  }

  writing() {
    return;
  }

  end() {
    return;
  }

}
