Running Test
---
- Install require library with following command
  
  `pip install -r requirements.txt`

- Run test with command

  `robot Features`

Test options
---
- SITE: Load site config and test data file. Default is `DEFAULT`
- HEADLESS: Enable/Disable headless mode. Default is `False`

Example:

  `robot -v SITE:PROD -v HEADLESS:True Features`
