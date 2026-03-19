# Factorial App - QA Assessment

Automated test suite for the Factorial Calculator web application at http://qainterview.pythonanywhere.com, completed as part of the Bitcube QA Engineer assessment.
This project demonstrates manual and automated testing skills, including exploratory testing, defect reporting, test case design, and Playwright-based automation.



## Project Structure

BITCUBE/
├── tests/
│   ├── part3.spec.js        # Main automation test suite
│   └── part4.spec.js        # Additional automation tests (Part 4)
├── playwright-report/        # HTML test reports
├── test-results/             # Screenshots on failure
├── Part1.pdf                 # Manual exploratory testing & defect report
├── Part 2.pdf                # Test case documentation
├── Automation_Test_Part4.pdf # Part 4 automation results
├── package.json
└── package-lock.json


## Assessment Overview

### Part 1 – Manual Exploratory Testing
Manual testing was performed on the factorial calculator, exploring valid and invalid inputs, UI behaviour, navigation, and usability. All identified defects are documented in `Part1.pdf` with steps to reproduce, expected vs actual results, and severity ratings.

### Exploratory Testing Video
Watch the recorded session here:  
https://go.screenpal.com/watch/cOeqfsnZSH0

### Part 2 – Test Case Documentation
A full test case document covering the application's functionality is available in `Part 2.pdf`, including test steps, expected results, and pass/fail outcomes.

### Part 3 – Automation Testing (part3.spec.js)
Automated tests built with Playwright, aligned with the test cases documented in Part 2. Screenshots are captured automatically on failure and saved to the `test-results/` folder.

### Part 4 – Additional Automation Tests (part4.spec.js)
Three specific scenarios tested separately from the main suite:
- Form validation styling
- Factorial of 12 (expected result: 479001600)
- API request verification (method, headers, and parameters)

Results are documented in `Automation_Test_Part4.pdf`.

> **Note:** Automation results are saved in `Automation_Test_Part4.pdf` inside the `tests/` folder.  
> To view the full interactive Playwright report locally, run `npx playwright show-report`



## Getting Started

### Clone the Repository

git clone https://github.com/yonelamica/BitC-Factorial.git
cd BitC-Factorial


### Prerequisites
- Node.js installed
- Playwright installed

### Installation

npm install
npx playwright install


### Running Tests

**Part 3 - Main test suite:**
npx playwright test tests/part3.spec.js


**Part 4 - Additional tests:**

npx playwright test tests/part4.spec.js


**Run all tests:**

npx playwright test


### Viewing the Interactive Report

npx playwright show-report


---

## Application Under Test

**URL:** http://qainterview.pythonanywhere.com  
**Description:** A web-based factorial calculator consisting of a text input, a Calculate button, three navigation links, and a copyright message.
