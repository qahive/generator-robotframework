const Generator = require('yeoman-generator')
const chalk = require('chalk')
const yosay = require('yosay')
const validator = require("validator");
const Scaffold = require('scaffold-generator')
const mustache = require('mustache')
const commonPrompts = require('common-generator-prompts')()


module.exports = class extends Generator {
  prompting() {
    this.log(yosay(
        "Welcome to robotframework-puppeteer\n" +
        "I'll walk you through the installation."
    ));

    return this.prompt([{
      type: "input",
      name: "isPageObject",
      message: "Would you like to use Page object pattern?",
      default: true
    }, {
      type: "input",
      name: "isAtdd",
      message: "Would you like to use ATDD/BDD style?",
      default: false
    } /*, {
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
    var pageName = 'Home';
    var stepName = 'Autentication';

    // Project detail
    var utils = ['.gitignore', 'README.md', 'requirements.txt'];
    for (var i in utils) {
      this.fs.copyTpl(
        this.templatePath(`${utils[i]}`),
        this.destinationPath(`${utils[i]}`)
      );
    }

    // YML Config
    // SITE_CONFIG
    this.fs.copyTpl(
      this.templatePath("Config/SITE_CONFIG.yml"),
      this.destinationPath(`Config/SITE_CONFIG_DEFAULT.yml`), {
        Environment: 'DEFAULT'
      });
    this.fs.copyTpl(
      this.templatePath("Config/SITE_CONFIG.yml"),
      this.destinationPath(`Config/SITE_CONFIG_PROD.yml`), {
        Environment: 'PROD'
      });
    
    // TEST_DATA
    this.fs.copyTpl(
      this.templatePath("Config/TEST_DATA.yml"),
      this.destinationPath(`Config/TEST_DATA_DEFAULT.yml`), {
        Environment: 'DEFAULT'
      });
    this.fs.copyTpl(
      this.templatePath("Config/TEST_DATA.yml"),
      this.destinationPath(`Config/TEST_DATA_PROD.yml`), {
        Environment: 'PROD'
      });
    
    // Utils
    var utils = ['TestConfigManagement', 'TestLifeCycle'];
    for (var i in utils) {
      this.fs.copyTpl(
        this.templatePath(`Utils/${utils[i]}.resource`),
        this.destinationPath(`Utils/${utils[i]}.resource`)
      );
    }

    // Add Page objects
    if(this.args.isPageObject || this.args.isAtdd) {
      this.fs.copyTpl(
        this.templatePath("Pages/Page.resource"),
        this.destinationPath(`Pages/${pageName}_Page.resource`), {
          PageName: pageName
        });
    }

    // Add ATDD
    if(this.args.isAtdd) {
      this.fs.copyTpl(
        this.templatePath("Steps/Steps.resource"),
        this.destinationPath( `Steps/${stepName}_Steps.resource`), {
          StepName: stepName,
          PageName: pageName,
          PageResources: `Resource  ../Pages/${pageName}_Page.resource`,
          KeywordResources: `${pageName}_Page.Wait for page load`
        });
    }

    // Add test scripts
    if(this.args.isAtdd) {
      this.fs.copyTpl(
        this.templatePath("Features/Demo.robot"),
        this.destinationPath( `Features/Demo.robot`), {
          StepResources: `Resource  ../Steps/${stepName}_Steps.resource`,
          TestSteps: `    Then Verify ${pageName} page load successfully`,
          PageName: pageName
        }
      );
    } else if(this.args.isPageObject) {
      this.fs.copyTpl(
        this.templatePath("Features/Demo.robot"),
        this.destinationPath( `Features/Demo.robot`), {
          StepResources: `Resource  ../Pages/${pageName}_Page.resource`,
          TestSteps: `    ${pageName}_Page.Wait for page load`,
          PageName: pageName
        }
      );
    } else {
      this.fs.copyTpl(
        this.templatePath("Features/Demo.robot"),
        this.destinationPath( `Features/Demo.robot`), {
          StepResources: `Library  PuppeteerLibrary`,
          TestSteps: `    PuppeteerLibrary.Wait Until Page Contains Element  id=hplogo`,
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
