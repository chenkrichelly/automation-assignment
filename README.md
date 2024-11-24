## Overview

This project automates a form submission process using Puppeteer. It:

1. Fills out the Name, Email, Phone, Company, and Employees fields.
2. Takes a screenshot of the form before submission.
3. Submits the form and logs the submission URL.
4. Verifies successful navigation to the thank-you page.

## Files Included

### **Scripts**

- `formTest.js`: A standalone Puppeteer script to automate the form submission process.
- `tests/`: Contains Jest-based test cases for automation.
  - `jest.config.js`: Configuration file for Jest.
  - `form.test.js`: Jest-based automation script.

### **Screenshots**

- `pre_submit.png`: Screenshot of the form before submission.
- `post_submit.png`: Screenshot of the thank-you page after submission.

### **Dependencies**

- `package.json`: Includes the required dependencies.

## Prerequisites

- Node.js
- Puppeteer

## **How to Run**

### **Install Dependencies**
To install the necessary dependencies, run the following command in your terminal:
```bash
npm install
```

### **Run the script:**
```bash
node formTest.js
```
or for the Jest version:
```bash
npx jest
```

Screenshots will be saved in the project directory during the run.

pre_submit.png
post_submit.png

The project uses Puppeteer v1.5.0, as per the assignment requirements.
