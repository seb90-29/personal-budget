const envelopes = require('./data.js')
const pool = require('./databasepg.js')

//Total budget
const getTotalBudget = () =>{
    let envTotal = 0;
    for (let i = 0; i < envelopes.length; i++){
        envTotal += envelopes[i].budget
    }
    return envTotal
}

//helper For All
const getEnvelopes = () =>{
    return envelopes
}
//helper For One
const getEnvelopeById = (id) => {
    const idNo = id -1
    if(typeof idNo === 'number' && id <= envelopes.length) {
        return envelopes[idNo]
    }
    else {
        return -1
    }
}

//index Helper
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
        const error = new Error('Provided values are incorrect.')
        error.status = 400;
        throw error;
    }
    if(indexId === -1){
        const error = new Error('Envelope ID does not exist.')
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

//Delete envelope
const deleteEnvelopeById = (id) => {
    const idNumber = getIndexById(id)
    if (idNumber === -1){
        return false
    }
    envelopes.splice(idNumber, 1)
    return true;
}

//Delete last expense
const deleteExpenseById = (id) => {
    const index = getIndexById(id)
    if (getIndexById(id) === -1){
        return false
    }
    const expense = envelopes[getIndexById(id)].expenses
    expense.splice(expense.length-1, 1)
        return true;
}

//Update envelope
const updateEnvelopeById = (id, category, budget) => {
    if(typeof id !== 'number' || typeof category !== 'string' || typeof budget !== 'number'){
        const error = new Error('Provided values are incorrect.')
        error.status = 400;
        throw error;
    }
    if(budget < 0){
        const error = new Error('Negative budget is not allowed.')
        error.status = 400;
        throw error;
    }
    const index = getIndexById(id);
    if (index === -1){
        const error = new Error('Envelope ID not found!')
        error.status = 404;
        throw error;
    }
        envelopes[index].id = id;
        envelopes[index].category = category;
        envelopes[index].budget = budget;
        envelopes[index].remaining = envelopes[index].remaining
        envelopes[index].expenses = envelopes[index].expenses
        return envelopes[index];  
}

//Remaining budget
const getRemainingBudget = (id) =>{
    const index = getIndexById(id)
    let sum = 0
    if (index === -1) {
        const error = new Error("Envelope ID does not exist.")
        error.status = 404;
        throw error;
    }
    const envBudget = envelopes[index].budget
    const exp = envelopes[index].expenses
    if (!exp) {
        exp = envBudget
        return exp
    }
    else{
        result = 0
        for(let i = 0; i < exp.length; i++){
            result += exp[i].value
        }
        sum = envBudget - result
        return sum
    }
}
const totalRemaining = () => {
    result = 0
    for (let i = 1; i <= envelopes.length; i++){
        result = result += getRemainingBudget(i)
    }
    return result
}


module.exports = {
    getEnvelopeById,
    getEnvelopes,
    addNewEnvelope,
    addNewExpense,
    deleteEnvelopeById,
    deleteExpenseById,
    updateEnvelopeById,
    getTotalBudget,
    getRemainingBudget,
    totalRemaining
};