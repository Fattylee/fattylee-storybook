import React, { Fragment } from 'react';
import {connect} from 'react-redux';



const List = ({expenses}) => {
  
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
  )) : <div  className="col">
           <p  className="jumbotron">No published stories,  be the first to <a href="/stories"  className="btn btn-primary"><span  className="fas fa-plus"></span> publish a story</a>
           </p>
         </div>;
         
  return (
<Fragment>

  {/*props.expenses.map((expense, i) =><li key={i}>{`${expense.description || 'default'} - ${expense.note}`} </li>)*/}
  {/*}<div  className="container story-list">*/}
      <div  className="row">
       
       {expensesList}
    
  </div>{/*}<!-- End row  -->*/}
{/*}</div>{/*}<!-- End container -->*/}

</Fragment>
);
};

const mstp = (state) => {
  return {
    expenses: state.expenses,
  };
}
export default connect(mstp)(List)
//export default List;