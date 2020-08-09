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

    return this.prompt([{
      type: "input",
      name: "projectName",
      message: "Please input project name without space",
      default: '',
      validate: function (input) {
          return validator.isAlphanumeric(input);
      }
    }, {
      type: "input",
      name: "isPageObject",
      message: "Would you like to use Page object pattern?",
      default: true
    }, {
      type: "input",
      name: "isAtdd",
      message: "Would you like to use ATDD/BDD style?",
      default: false
    }/*, {
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
    } */ ]).then(answers => {
      this.args = answers;
      this.config.set(this.args);
    });
  }

  writing() {

    var projectName = this.args.projectName;
    var pageName = 'Home';
    var stepName = 'Autentication';

    // YML Config
    // SITE_CONFIG
    this.fs.copyTpl(
      this.templatePath("Config/SITE_CONFIG.yml"),
      this.destinationPath(`${projectName}/Config/SITE_CONFIG.yml`), {
        Environment: 'Defailt'
      });
    this.fs.copyTpl(
      this.templatePath("Config/SITE_CONFIG.yml"),
      this.destinationPath(`${projectName}/Config/SITE_CONFIG_PROD.yml`), {
        Environment: 'PROD'
      });
    
    // TEST_DATA
    this.fs.copyTpl(
      this.templatePath("Config/USER_DATA.yml"),
      this.destinationPath(`${projectName}/Config/USER_DATA.yml`), {
        Environment: 'Defailt'
      });
    this.fs.copyTpl(
      this.templatePath("Config/USER_DATA.yml"),
      this.destinationPath(`${projectName}/Config/USER_DATA_PROD.yml`), {
        Environment: 'PROD'
      });

    // Add Page objects
    if(this.args.isPageObject || this.args.isAtdd) {
      this.fs.copyTpl(
        this.templatePath("Pages/Page.resource"),
        this.destinationPath(`${projectName}/Pages/${pageName}_Page.resource`), {
          PageName: pageName
        });
    }

    // Add ATDD
    if(this.args.isAtdd) {
      this.fs.copyTpl(
        this.templatePath("Steps/Steps.resource"),
        this.destinationPath( `${projectName}/Steps/${stepName}_Steps.resource`), {
          StepName: stepName,
          PageResources: `Resource  ../Pages/${pageName}_Page.resource`,
          KeywordResources: `${pageName}_Page.Wait for page load`
        });
    }

    // Add test scripts
    if(this.args.isAtdd) {
      this.fs.copyTpl(
        this.templatePath("Features/Demo.robot"),
        this.destinationPath( `${projectName}/Features/Demo.robot`), {
          StepResources: `Resource  ../Steps/${stepName}_Steps.resource`,
          TestSteps: `  Then Verify ${pageName} page load successfully`
        }
      );
    } else if(this.args.isPageObject) {
      this.fs.copyTpl(
        this.templatePath("Features/Demo.robot"),
        this.destinationPath( `${projectName}/Features/Demo.robot`), {
          StepResources: `Resource  ../Pages/${pageName}_Page.resource`,
          TestSteps: `  ${pageName}_Page.Wait for page load`,
          PageName: pageName
        }
      );
    } else {
      this.fs.copyTpl(
        this.templatePath("Features/Demo.robot"),
        this.destinationPath( `${projectName}/Features/Demo.robot`), {
          StepResources: `Library  PuppeteerLibrary`,
          TestSteps: `  PuppeteerLibrary.Wait Until Page Contains Element  id=Please update locator`,
          PageName: pageName
        }
      );
    }

    // Extra library (Percy, Pdf, Zxing)
    return;
  }

  end() {
    this.config.save();
  }

}
