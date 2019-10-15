import React, {Fragment} from 'react';
import './style.css';

export default () => (
  <Fragment>
<div class="loader-wrapper">
<div class="blobs">
	<div class="blob-center"></div>
	<div class="blob"></div>
	<div class="blob"></div>
	<div class="blob"></div>
	<div class="blob"></div>
	<div class="blob"></div>
	<div class="blob"></div>
</div>
<svg xmlns="http://www.w3.org/2000/svg" version="1.1">
  <defs>
    <filter id="goo">
      <feGaussianBlur in="SourceGraphic" stdDeviation="10" result="blur" />
      <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -7" result="goo" />
      <feBlend in="SourceGraphic" in2="goo" />
  	</filter>
  </defs>
</svg>
</div>
  </Fragment>
);