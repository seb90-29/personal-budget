let startingBalance = 0;
let totalBudget = 0;
let remainingBudget = 0;

const envelopes = [
    {
        id: 1,
        category: "Groceries",
        budget: 0,
        remaining: 0,
        expenses: []
    },

    {
        id: 2,
        category: "Fuel",
        budget: 0,
        remaining: 0,
        expenses: []
    }
]

module.exports = {envelopes, startingBalance, totalBudget, remainingBudget};