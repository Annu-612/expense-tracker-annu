// ========================================
// Expense Tracker - JavaScript
// ========================================


// ----------------------------------------
// 1. Transaction Data
// ----------------------------------------

let transactions = [];
let editingTransactionId = null;

// ----------------------------------------
// 2. Get HTML Elements
// ----------------------------------------

const transactionForm = document.getElementById("transaction-form");

const transactionType = document.getElementById("transaction-type");
const amountInput = document.getElementById("amount");
const categoryInput = document.getElementById("category");
const dateInput = document.getElementById("date");
const descriptionInput = document.getElementById("description");

const amountError = document.getElementById("amount-error");
const categoryError = document.getElementById("category-error");
const descriptionError = document.getElementById("description-error");

const transactionList = document.getElementById("transaction-list");

const balanceElement = document.getElementById("balance");
const totalIncomeElement = document.getElementById("total-income");
const totalExpensesElement = document.getElementById("total-expenses");
const monthlySummary = document.getElementById("monthly-summary");
const categoryChart = document.getElementById("category-chart");

const typeFilter = document.getElementById("type-filter");
const categoryFilter = document.getElementById("category-filter");

const formTitle = document.getElementById("form-title");
const submitButton = document.getElementById("submit-button");
const cancelEditButton = document.getElementById("cancel-edit-button");

typeFilter.addEventListener("change", function() {
    saveFilters();
    applyFilters();
});

categoryFilter.addEventListener("change", function() {
    saveFilters();
    applyFilters();
});
// ----------------------------------------
// 3. Test
// ----------------------------------------

console.log("Expense Tracker JavaScript loaded successfully.");
transactionForm.addEventListener("submit", handleTransactionSubmit);
function handleTransactionSubmit(event) {
    event.preventDefault();

    const type = transactionType.value;
    const amount = Number(amountInput.value);
    const category = categoryInput.value;
    const date = dateInput.value;
    const description = descriptionInput.value;

    amountError.textContent = "";
    categoryError.textContent = "";
descriptionError.textContent = "";

     if (amount <= 0) {
    amountError.textContent = "Amount must be greater than 0.";
    return;
}

    if (category === "") {
    categoryError.textContent = "Please select a category.";
    return;
}

if (description.trim() === "") {
    descriptionError.textContent = "Please enter a description.";
    return;
}

    const transaction = {
       id: editingTransactionId !== null
        ? editingTransactionId
        : Date.now(),
        type: type,
        amount: amount,
        category: category,
        date: date,
        description: description
    };
   if (editingTransactionId === null) {

    // Add new transaction
    transactions.push(transaction);

} else {

    // Update existing transaction
    transactions = transactions.map(function(existingTransaction) {

        if (existingTransaction.id === editingTransactionId) {

            return transaction;

        }

        return existingTransaction;

    });

    editingTransactionId = null;

    formTitle.textContent = "Add Transaction";
    submitButton.textContent = "Add Transaction";
    cancelEditButton.style.display = "none";

    document.getElementById("submit-button").textContent =
        "Add Transaction";
}


applyFilters();

updateSummary();

updateMonthlySummary();

updateCategoryChart();

saveTransactions();

transactionForm.reset();

console.log(transactions);
}

function renderTransactions(transactionArray = transactions) {

    // Clear the current transaction list
    transactionList.innerHTML = "";

    // If there are no transactions
    if (transactionArray.length === 0) {
    const emptyMessage = document.createElement("p");
    emptyMessage.id = "empty-message";

    if (transactions.length === 0) {
        emptyMessage.textContent = "No transactions yet.";
    } else {
        emptyMessage.textContent =
            "No transactions match the selected filters.";
    }

    transactionList.appendChild(emptyMessage);
    return;
}

    // Display each transaction
    transactionArray.forEach(function(transaction) {

        const transactionItem = document.createElement("div");

        transactionItem.classList.add("transaction-item");

        // Transaction information
        const transactionInfo = document.createElement("div");

        transactionInfo.classList.add("transaction-info");


        // Description
        const description = document.createElement("h3");

        description.textContent = transaction.description;


        // Category and date
        const details = document.createElement("p");

        details.textContent =
            transaction.category + " • " + transaction.date;


        transactionInfo.appendChild(description);
        transactionInfo.appendChild(details);


        // Amount
        const amount = document.createElement("p");

        amount.classList.add("transaction-amount");

        if (transaction.type === "income") {
            amount.classList.add("income");
            amount.textContent = "+ ₹" + transaction.amount.toFixed(2);
        } else {
            amount.classList.add("expense");
            amount.textContent = "- ₹" + transaction.amount.toFixed(2);
        }


        // Add everything to transaction item
        transactionItem.appendChild(transactionInfo);

transactionItem.appendChild(amount);


// Transaction buttons
const transactionActions = document.createElement("div");

transactionActions.classList.add("transaction-actions");


// Edit button
const editButton = document.createElement("button");

editButton.textContent = "Edit";

editButton.classList.add("edit-button");

editButton.dataset.id = transaction.id;

editButton.addEventListener("click", function() {

    const id = Number(editButton.dataset.id);

    editTransaction(id);

});


// Delete button
const deleteButton = document.createElement("button");

deleteButton.textContent = "Delete";

deleteButton.classList.add("delete-button");

deleteButton.dataset.id = transaction.id;

deleteButton.addEventListener("click", function() {

    const id = Number(deleteButton.dataset.id);

    deleteTransaction(id);

});


transactionActions.appendChild(editButton);

transactionActions.appendChild(deleteButton);

transactionItem.appendChild(transactionActions);


transactionList.appendChild(transactionItem);
    });
}

function updateSummary() {

    let totalIncome = 0;
    let totalExpenses = 0;

    transactions.forEach(function(transaction) {

        if (transaction.type === "income") {
            totalIncome += transaction.amount;
        } else if (transaction.type === "expense") {
            totalExpenses += transaction.amount;
        }

    });

    const balance = totalIncome - totalExpenses;

    totalIncomeElement.textContent =
        "₹" + totalIncome.toFixed(2);

    totalExpensesElement.textContent =
        "₹" + totalExpenses.toFixed(2);

    balanceElement.textContent =
        "₹" + balance.toFixed(2);
}

function deleteTransaction(id) {

    transactions = transactions.filter(function(transaction) {

        return transaction.id !== id;

    });

    applyFilters();

    updateSummary();
    updateMonthlySummary();
    updateCategoryChart();
    saveTransactions();

}

function applyFilters() {
    const selectedType = typeFilter.value;
    const selectedCategory = categoryFilter.value;

    const filteredTransactions = transactions.filter(function(transaction) {
    const typeMatches =
        selectedType === "all" ||
        transaction.type === selectedType;

    const categoryMatches =
        selectedCategory === "all" ||
        transaction.category === selectedCategory;

    return typeMatches && categoryMatches;
});

renderTransactions(filteredTransactions);
}

function editTransaction(id) {

    const transaction = transactions.find(function(transaction) {

        return transaction.id === id;

    });

    if (!transaction) {
        return;
    }

    editingTransactionId = id;

    transactionType.value = transaction.type;

    amountInput.value = transaction.amount;

    categoryInput.value = transaction.category;

    dateInput.value = transaction.date;

    descriptionInput.value = transaction.description;

    formTitle.textContent = "Edit Transaction";
    submitButton.textContent = "Update Transaction";
    cancelEditButton.style.display = "block";
}

cancelEditButton.addEventListener("click", function() {
    editingTransactionId = null;

    transactionForm.reset();

    formTitle.textContent = "Add Transaction";
    submitButton.textContent = "Add Transaction";
    cancelEditButton.style.display = "none";
});

function saveTransactions() {
    localStorage.setItem(
        "transactions",
        JSON.stringify(transactions)
    );
}

function saveFilters() {
    localStorage.setItem("typeFilter", typeFilter.value);
    localStorage.setItem("categoryFilter", categoryFilter.value);
}

function loadTransactions() {
    const savedTransactions = localStorage.getItem("transactions");

    if (savedTransactions) {
        transactions = JSON.parse(savedTransactions);
    }
}

function loadFilters() {
    const savedTypeFilter = localStorage.getItem("typeFilter");
    const savedCategoryFilter = localStorage.getItem("categoryFilter");

    if (savedTypeFilter) {
        typeFilter.value = savedTypeFilter;
    }

    if (savedCategoryFilter) {
        categoryFilter.value = savedCategoryFilter;
    }
}

function updateMonthlySummary() {
    const monthlyExpenses = {};

    transactions.forEach(function(transaction) {
        if (transaction.type === "expense") {
            const month = transaction.date.substring(0, 7);

            if (!monthlyExpenses[month]) {
                monthlyExpenses[month] = 0;
            }

            monthlyExpenses[month] += transaction.amount;
        }
    });

    monthlySummary.innerHTML = "";

    const months = Object.keys(monthlyExpenses);

    if (months.length === 0) {
        monthlySummary.innerHTML =
            "<p>No expense data available.</p>";
        return;
    }

    months.forEach(function(month) {
    const monthCard = document.createElement("div");
    monthCard.classList.add("monthly-card");

    const monthTitle = document.createElement("h3");

    const [year, monthNumber] = month.split("-");

    const monthDate = new Date(
        Number(year),
        Number(monthNumber) - 1
    );

    monthTitle.textContent = monthDate.toLocaleString(
        "en-IN",
        {
            month: "long",
            year: "numeric"
        }
    );

    const expenseAmount = document.createElement("p");
    expenseAmount.classList.add("monthly-expense-amount");

    expenseAmount.textContent =
        "₹" + monthlyExpenses[month].toFixed(2);

    const expenseLabel = document.createElement("span");
    expenseLabel.textContent = "Total Expenses";

    monthCard.appendChild(monthTitle);
    monthCard.appendChild(expenseAmount);
    monthCard.appendChild(expenseLabel);

    monthlySummary.appendChild(monthCard);
});
}

function updateCategoryChart() {
    const categoryExpenses = {};

    transactions.forEach(function(transaction) {

        if (transaction.type === "expense") {

            if (!categoryExpenses[transaction.category]) {
                categoryExpenses[transaction.category] = 0;
            }

            categoryExpenses[transaction.category] +=
                transaction.amount;
        }
    });

    const categoryDonut =
        document.getElementById("category-donut");

    const donutTotal =
        document.getElementById("donut-total");

    categoryChart.innerHTML = "";

    const categories =
        Object.keys(categoryExpenses);

    /* No expense data */
    if (categories.length === 0) {

        categoryDonut.style.background =
            "#e5e7eb";

        donutTotal.textContent = "₹0";

        categoryChart.innerHTML =
            "<p>No expense data available.</p>";

        return;
    }

    /* Calculate total */
    const totalExpenses =
        Object.values(categoryExpenses).reduce(
            function(total, amount) {
                return total + amount;
            },
            0
        );

    donutTotal.textContent =
        "₹" + totalExpenses.toFixed(0);

    /* Chart colors */
    const colors = [
        "#2563eb",
        "#f59e0b",
        "#10b981",
        "#ef4444",
        "#8b5cf6",
        "#ec4899",
        "#14b8a6",
        "#64748b"
    ];

    /* Create donut segments */
    let currentPercentage = 0;

    const gradientParts = [];

    categories.forEach(function(category, index) {

        const amount =
            categoryExpenses[category];

        const percentage =
            (amount / totalExpenses) * 100;

        const start =
            currentPercentage;

        const end =
            currentPercentage + percentage;

        gradientParts.push(
            colors[index % colors.length] +
            " " +
            start +
            "% " +
            end +
            "%"
        );

        currentPercentage = end;
    });

    categoryDonut.style.background =
        "conic-gradient(" +
        gradientParts.join(", ") +
        ")";


    /* Sort categories by highest expense */
    categories.sort(function(a, b) {

        return categoryExpenses[b] -
               categoryExpenses[a];

    });


    /* Create category list */
    categories.forEach(function(category, index) {

        const amount =
            categoryExpenses[category];

        const percentage =
            (amount / totalExpenses) * 100;


        const item =
            document.createElement("div");

        item.classList.add("legend-item");


        /* Left side */
        const left =
            document.createElement("div");

        left.classList.add("legend-left");


        const dot =
            document.createElement("span");

        dot.classList.add("legend-color");

        dot.style.backgroundColor =
            colors[index % colors.length];


        const name =
            document.createElement("span");

        name.classList.add("legend-category");

        name.textContent =
            category;


        left.appendChild(dot);
        left.appendChild(name);


        /* Right side */
        const right =
            document.createElement("div");

        right.classList.add("legend-right");


        const amountText =
            document.createElement("strong");

        amountText.textContent =
            "₹" + amount.toFixed(2);


        const percentageText =
            document.createElement("span");

        percentageText.textContent =
            percentage.toFixed(1) + "%";


        right.appendChild(amountText);
        right.appendChild(percentageText);


        item.appendChild(left);
        item.appendChild(right);

        categoryChart.appendChild(item);
    });
}
loadTransactions();
loadFilters();
applyFilters();
updateSummary();
updateMonthlySummary();
updateCategoryChart();
