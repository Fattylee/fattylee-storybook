import React, {Fragment} from 'react';
import './style.css';

export default () => (
  <Fragment>
<div class="v-align">

  <div class="loader">
    <aside class="loader__box loader--left"> 
      <span class="loader__circle"></span>   
    </aside>
    <aside class="loader__box loader--right">
      <span class="loader__circle"></span>
    </aside>
  </div>
</div>

  </Fragment>
);