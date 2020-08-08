const Generator = require('yeoman-generator')
const chalk = require('chalk')
const yosay = require('yosay')
const Scaffold = require('scaffold-generator')
const mustache = require('mustache')
const commonPrompts = require('common-generator-prompts')()

mustache.escape = v => v
const DEFAULT_PROPS = {
  gitignore: '.gitignore'
}