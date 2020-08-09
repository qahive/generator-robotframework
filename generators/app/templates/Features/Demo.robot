*** Settings ***
Suite Setup    TestLifeCycle.Default Suite Setup
Suite Teardown    TestLifeCycle.Default Suite Teardown
Test Setup    TestLifeCycle.Default Test Setup
Test Teardown    TestLifeCycle.Default Test Teardown
Resource    ../Utils/TestLifeCycle.resource
<%= StepResources %>
Variables    ../Config/TEST_DATA_DEFAULT.yml


*** Test Cases ***
Ensure <%= PageName %> page should load successfully
<%= TestSteps %>
