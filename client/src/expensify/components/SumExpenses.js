import React from 'react';



const SumExpenses = ({expenses}) => (
 
    <div className='mb-4 text-info flash-expense'>
    Viewing {expenses.length} {expenses.length > 1 ? 'expenses' : 'expense'} and totalling ₦{expenses.reduce((sum, expense) => sum + expense.amount, 0).toFixed(2)}
   </div>
);

export default SumExpenses;

