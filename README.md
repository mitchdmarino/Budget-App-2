# Budget-App-2 (placeholder name)

## An app to automate your budgeting needs. An enhanced version of <a href='https://github.com/mitchdmarino/budget.py'>Budget.py</a> 

## Summary 

Budget-App-2 is a web app designed to track your monthly money flow, set budgeting goals, and be smarter with your money. Throw away the spreadsheets that you never really use, and use Budget-App-2 to automatically capture trends in your spending, save up for big purchases, and stop feeling oblivious to where your money goes. Simply upload your credit card statement to get started. 

## Technical Stack 

### Frontend 

Our frontend is served through React/TypeScript. TypeScript was chosen because I wanted to challenge myself with something new, and it is used throughout the industry. React was chosen to continue to build upon my technical knowledge/skill, and with the goal of integrating tests. 

### Backend 

In Budget.py, we used a Node/Express/MongoDB backend. MongoDB proved to be challenging as a NoSQL database, as it's more difficult to associate transactions/categories with a user and run queries to pull data for financial reporting purposes (Spending by month, categories, etc). I wanted to pivot to a relational database because it makes more sense for this type of application. We will use PostgreSQL. Python (pdfPlumber) is used to parse credit card statements and paystubs to a user's profile. Sensitive documents are deleted from the server immediately after saving transactional data. 

## Our client and server folders hold additional README files with expanded details/explanations of our technical choices, system design and planning, and important notes. 

## Goals 

1. Create an application that I can use to track my monthly spending habits and income, while also setting savings goals. Budget-App-2 should be a "One stop shop" to see how much money's coming in, where that money's going, and what I'm doing to foster a healthy but balanced financial lifestyle. 
2. Familiarize myself with TypeScript and use it to create a user friendly and visually appealing frontend, while keeping our application robust. 
3. Integrate unit and end-to-end testing. 
4. Use a postgreSQL datbase to store user accounts, financial transactions (income and spending), categories, and goals. Create dynamic queries that present useful trends in spending over time periods and categories, and track progress towards goals. 
5. Have fun. 

## Our client and server folders hold additional README files with expanded details/explanations of our technical choices, system design and planning, and important notes. 

## Getting Started 

To run Budget-App-2: 
1. Clone this repository. ```gh repo clone mitchdmarino/Budget-App-2``` 
2. Navigate to the server, install the dependencies, initialize the python environment, and start the server. 
3. Navigate to the client, install dependencies, and start the react app. 
4. Create an account and start saving! 

## Future Enhancements/Considerations 

1. Integrating directly with the bank account would be a much cleaner approach, rather than requiring the user to upload credit card statements/paystubs. For an industry competitive application, this would most certainly be required (but for my own purposes, the current version works just fine)
2. Convert to a desktop/mobile application. 