# Expense Tracker

A responsive web-based Expense Tracker application built using HTML, CSS, and JavaScript.

The application allows users to manage income and expenses, view financial summaries, filter transactions, and analyze spending patterns using monthly and category-wise expense summaries.

All transaction data is stored locally in the browser using Local Storage, so the data remains available after refreshing the page.

---

## Features

### Core Features

- Add income and expense transactions
- Enter transaction details:
  - Transaction type
  - Amount
  - Category
  - Date
  - Description
- Edit existing transactions
- Delete transactions
- View transaction history
- Filter transactions by:
  - Income / Expense
  - Category
- View financial summary:
  - Current Balance
  - Total Income
  - Total Expenses
- Form validation with helpful error messages
- Responsive design for desktop, tablet, and mobile devices
- Persistent data storage using browser Local Storage

### Bonus Features

#### Monthly Expense Summary

Displays the total expenses for each month based on recorded expense transactions.

#### Category-wise Expense Chart

Displays the distribution of expenses across different categories using a responsive donut chart.

The chart shows:

- Expense category
- Total amount spent
- Percentage of total expenses

The chart is implemented using HTML, CSS, and JavaScript without any external charting library.

---

## Technologies Used

- HTML5
- CSS3
- JavaScript
- Browser Local Storage

No external frameworks, libraries, or backend services are required.

---

## Project Structure

```text
expense-tracker/
│
├── index.html       # Application structure
├── style.css        # Styling and responsive layout
├── script.js        # Application logic
└── README.md        # Project documentation
```

---

## How to Run

### Using a Web Browser

1. Clone the repository:

```bash
git clone https://github.com/Annu-612/expense-tracker-annu.git
```

2. Open the project folder.

3. Open `index.html` in a web browser.

No backend server or additional dependencies are required.

---

## How It Works

The application stores transactions as JavaScript objects inside an array.

Each transaction contains:

```javascript
{
    id: 1,
    type: "expense",
    amount: 500,
    category: "Food",
    date: "2026-10-05",
    description: "Lunch"
}
```

The transaction data is used to calculate:

- Total income
- Total expenses
- Current balance
- Monthly expense totals
- Category-wise expense distribution

The transaction array acts as the main source of data for the application.

---

## Transaction Management

### Adding Transactions

Users can enter the transaction type, amount, category, date, and description.

After validation, the transaction is added to the transaction history and all relevant summaries are updated.

### Editing Transactions

Users can click the **Edit** button to load an existing transaction into the form.

After making changes, the transaction is updated without creating a duplicate entry.

### Deleting Transactions

Users can click the **Delete** button to remove a transaction.

After deletion, the application immediately updates:

- Transaction history
- Total income
- Total expenses
- Current balance
- Monthly expense summary
- Category-wise expense chart

---

## Filtering

Transactions can be filtered by:

- Transaction type:
  - All
  - Income
  - Expense
- Category

Filtering changes only the displayed transaction list. The original transaction data is preserved.

The selected filters are also saved using Local Storage and restored when the application is reopened.

---

## Financial Summary

The dashboard displays three financial values:

### Total Income

The sum of all income transactions.

### Total Expenses

The sum of all expense transactions.

### Current Balance

The current balance is calculated as:

```text
Balance = Total Income - Total Expenses
```

These values are calculated dynamically from the transaction data.

---

## Monthly Expense Summary

The application groups expense transactions by month and displays the total expense for each month.

For example:

```text
October 2026
Total Expenses: ₹8,500

November 2026
Total Expenses: ₹6,200
```

Only expense transactions are included in the monthly expense summary.

The summary is recalculated whenever a transaction is added, edited, or deleted.

---

## Category-wise Expense Chart

The application groups expense transactions by category and displays their distribution using a donut chart.

For example:

```text
Food          ₹3,000    40%
Transport     ₹2,000    27%
Shopping      ₹1,500    20%
Other         ₹1,000    13%
```

The percentage for each category is calculated using:

```text
Category Percentage =
(Category Expense / Total Expenses) × 100
```

The chart and category details are updated whenever the transaction data changes.

---

## Data Persistence

The application uses the browser's **Local Storage API** to persist transaction data.

Before storing the transaction array, it is converted into a JSON string using:

```javascript
JSON.stringify();
```

When the application starts, the stored JSON data is converted back into JavaScript objects using:

```javascript
JSON.parse();
```

This allows transaction data to remain available after refreshing the page.

The selected transaction filters are also stored and restored using Local Storage.

---

## Validation

The application validates transaction details before adding or updating a transaction.

Validation includes:

- Amount must be greater than zero
- Category must be selected
- Description cannot be empty

Helpful validation messages are displayed below the relevant form fields.

---

## Responsive Design

The application is designed to work across different screen sizes:

- Desktop
- Tablet
- Mobile

CSS media queries are used to adapt the layout for smaller screens.

The responsive layout adjusts:

- Summary cards
- Transaction history
- Form fields
- Monthly summary cards
- Category chart
- Action buttons

---
