let startingBalance = 0;
let totalBudget = 0;
let remainingBudget = 0;

const envelopes = [
    {
        id: 1,
        category: "Groceries",
        budget: 0,
        remaining: 0,
        expenses: [
            {
                name: "Party shopping",
                value: 50
            }
        ]
    },

    {
        id: 2,
        category: "Fuel",
        budget: 0,
        remaining: 0,
        expenses: []
    }
]

//Helper for all
const getEnvelopes = () =>{
    return envelopes
}
//Helper for one
const getEnvelopeById = (id) => {
    const idNo = id -1
    if(typeof idNo === 'number' && id <= envelopes.length) {
        return envelopes[idNo]
    }
    else {
        return -1
    }
}

//Index Helper
const getIndexById = (id) => {
    for (let i=0; i<envelopes.length; i++){
        if (envelopes[i].id === id){
            return i;
        }
    }
    return -1;
}

//category Helper
const getIndexByCategory = (cat) => {
    for (let i=0; i<envelopes.length; i++){
        if (envelopes[i].category === cat){
            return i
        }
    }
    return -1
}

//New envelope
const addNewEnvelope = (category, budget) =>{
    if( typeof category !== 'string' || typeof budget !== 'number'){
        const error = new Error('Provided values are incorrect.');
        error.status = 400;
        throw error;
    }
    if(getIndexByCategory(category) !== -1){
        const error = new Error('Duplicate category is not allowed.');
        error.status = 400;
        throw error;
    }
    if(budget < 0){
        const error = new Error('Negative budget is not allowed.');
        error.status = 400;
        throw error;
    }
        const objectToPush = {
            id: envelopes.length +1,
            category: category,
            budget: budget,
            remaining:0,
            expenses: []
            
        }
        envelopes.push(objectToPush);
        return envelopes[envelopes.length-1];
}

//New expenses
const addNewExpense = (id, name, value) => {
    const indexId = getIndexById(id)  
    const expensesPath = envelopes[indexId].expenses
    if(typeof id !== 'number' || typeof name !== 'string' || typeof value !== 'number'){
        const error = new Error('Provided values are incorrect.');
        error.status = 400;
        throw error;
    }
    if(indexId === -1){
        const error = new Error('ID does not exist.');
        error.status = 400;
        throw error;
    }
    if(value <= 0){
        const error = new Error('Costless operations are redundant, please add some financial operation.');
        error.status = 400;
        throw error;
    }
        const expenseToPush = {
            name: name,
            value: value,
        }
        expensesPath.push(expenseToPush)
        return expensesPath.length-1
}
//console.log(envelopes[0].expenses)
//console.log(envelopes[envelopes.length-1])

module.exports = {
    envelopes,
    startingBalance,
    totalBudget,
    remainingBudget,
    getEnvelopeById,
    getEnvelopes,
    addNewEnvelope,
    addNewExpense
};