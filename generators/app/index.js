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
    /*
    {
      type: "input",
      name: "projectName",
      message: "Please input project name without space",
      default: '',
      validate: function (input) {
          return validator.isAlphanumeric(input);
      }
    }, 
    */
    {
      type: "input",
      name: "isPageObject",
      message: "Would you like to use Page object pattern?",
      default: true
    }, {
      type: "input",
      name: "isAtdd",
      message: "Would you like to use ATDD/BDD?",
      default: false
    }, {
      type: "input",
      name: "isPdf",
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
    }]).then(answers => {
      this.args = answers;
      this.config.set(this.args);
    });
  }

  writing() {
    // Page object & ATDD
    /*
    if(this.args.isPageObject && this.args.isAtdd) {
      this.fs.copyTpl(
        this.templatePath("docs/source/" + conff[i]),
        this.destinationPath("docs/source/" + conff[i]), {
            projectID: this.args.projectID,
            desc: this.args.desc,
            email: this.args.email,
            user: this.args.user
        });
    } else if(this.args.isPageObject) {

    } else if(this.args.isAtdd) {

    } else {

    }
    */
    
    // YML Config
    if(this.args.isPdf) {
      this.fs.copyTpl(
        this.templatePath("config/SITE_CONFIG.yml"),
        this.destinationPath(`config/SITE_CONFIG.yml`));
    } 

    // Percy

    // Extra library (pdf, zxing)

    // Add demo scripts

    return;
  }

  end() {
    this.config.save();
  }

}
