*** Settings ***
Library    PuppeteerLibrary

*** Variables ***
${<%= PageName %>_Page.Unique page identifier}    id=Please update locator


*** Keywords ***
Wait for page load
  PuppeteerLibrary.Wait Until Page Contains Element   ${<%= PageName %>_Page.Unique page identifier}
