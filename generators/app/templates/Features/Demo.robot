*** Settings ***
<%= StepResources %>
Variables    ../Config/USER_DATA.yml


*** Test Cases ***
Ensure <%= PageName %> page should load successfully
  <%= TestSteps %>
