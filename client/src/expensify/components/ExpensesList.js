import React, { Fragment, Component } from 'react';
import {connect} from 'react-redux';
import visibleExpenses from '../selectors/expenses';
import {removeExpense} from '../actions/expensesAction';
import ExpenseListFilters from './ExpenseListFilters';
import NoStories from './NoStories';
import {setPathname} from '../actions/pathnameAction';


class List extends Component { 
  
  componentDidMount() {
    this.props.dispatch(setPathname('/react'));
  }
  componentWillUnmount() {
    this.props.dispatch(setPathname());
  }
  render() { 
  const {expenses, dispatch, filters} = this.props;
      
  const expensesList = expenses.length ? expenses.map((expense, index) => (
  
     <Fragment key={index}>
     {/*{#each stories}*/}
        <div  className=" col-sm-6 get-title">
          <div  className="card mb-3 shadow-sm">
            <div  className="story-avatar" data-story_image="https://storage.cloud.google.com/storybook_uploads/{{storyImage}}" >
            <img   className="story-avatar-img"  alt=""/>
            </div>
          <div  className="card-body"> 
            <h5  className="card-title text-center story-card-title">{/*{title}*/}</h5>  
            <p  className="card-text story-card-body">{/*{{truncateDetails details 100}}*/}
              <a  className="btn text-secondary border-dark bg-white" href="/stories/{{slug}}">Read More &rarr;</a>
            </p>
          </div> 
          <div  className="card-footer card-footer-h">
            <small  className="text-muted mt-2">
            <span  className="fas fa-user"></span>     
           <span  className="pl-1"> {/*{capitalizeEach user.name}*/}</span> <span  className="ml-2 pl-1 fas fa-clock fa-1x"></span> {/*{displayDate updatedAt 'MMM DD[,] YYYY [at] hh:mm a' }*/} 
          </small>
          </div>{/*}<!--  className="card-footer" -->*/}
        </div>{/*}<!-- End Card-->*/}
      </div>{/*}<!-- End col -->*/}
        
    </Fragment>
  )) : <NoStories />; {/* expensesList */}
         
         
  const expensesListSketch = expenses.length ? expenses.map(expense => (
  
  <div key={expense.id} className='col-sm-6'>
  <div >
    
    <h3>{expense.description}</h3>
    <p>Amount: {expense.amount} - createdAt: {expense.createdAt}</p>
    
    <button className='btn btn-sm btn-danger'
    onClick={() =>dispatch(removeExpense(expense.id))}
    >Remove</button>
  </div>
  <hr  className='text-white'/>
 </div>
  )) : <NoStories />; {/* expensesListSketch */}
  
  
  return (
<Fragment>
     
     <ExpenseListFilters filters={filters} expenses={expenses} dispatch={dispatch}
     />
     
     <h1 className='text-white my-4 text-center' >Expenses List</h1>
     
      <div  className="row">
       
       {expensesListSketch}
    
  </div>{/*}<!-- End row  -->*/}
{/*}</div>{/*}<!-- End container -->*/}

</Fragment>
);
};
};

const mstp = (state) => {
  return {
    expenses: visibleExpenses( state.expenses, state.filters),
    filters: state.filters,
  };
}
export default connect(mstp)(List)
