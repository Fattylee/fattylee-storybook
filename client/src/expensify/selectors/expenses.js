import moment from 'moment';


export default function getVisibleExpenses(expenses, {sortBy, startDate, endDate, text}) {
  return expenses
    .filter(({description, createdAt}) => {
      const momentCreatedAt = moment(createdAt);
    const startDateMatch = startDate ? startDate.isSameOrBefore(momentCreatedAt, 'day') : true;
    const endDateMatch = endDate ? endDate.isSameOrAfter(momentCreatedAt, 'day') : true;
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