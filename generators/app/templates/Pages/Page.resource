*** Settings ***
Library    PuppeteerLibrary

*** Variables ***
${<%= PageName %>_Page.Unique page identifier}    id=hplogo


*** Keywords ***
Wait for page load
  PuppeteerLibrary.Wait Until Page Contains Element   ${<%= PageName %>_Page.Unique page identifier}
