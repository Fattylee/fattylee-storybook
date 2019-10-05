export default function getVisibleExpenses(expenses, {sortBy, startDate, endDate, text}) {
  return expenses
    .filter(({description, createdAt}) => {
    const startDateMatch = typeof  startDate === 'undefined' ||  createdAt >=  startDate;
    const endDateMatch = typeof  endDate != 'number' ||  createdAt <=  endDate;
    const textMatch =  description.toLowerCase().includes( text.toLowerCase());
    
    return startDateMatch && endDateMatch && textMatch;
  })
  .sort((expenseA, expenseB) => {
    if( sortBy === 'date'){
      return expenseB.createdAt - expenseA.createdAt
    }
    else {
      return expenseB.amount - expenseA.amount;
    }
  }); 
}

