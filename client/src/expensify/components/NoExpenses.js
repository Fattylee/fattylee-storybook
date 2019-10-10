import React from 'react';
import {Link} from 'react-router-dom';


const NoExpenses = () => <div  className="col">
           <p  className="jumbotron bg-dark">No expenses, ready to <Link to="/react/expenses/add"  className="btn bg-black text-white"><span  className="fas fa-plus"></span> Add expense</Link>
           </p>
         </div>;
        
export default NoExpenses;