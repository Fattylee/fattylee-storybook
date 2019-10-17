import React, {Fragment} from 'react';
import Loading from './loaders/Loading';
import MaterialDesignSpinnerCss from './loaders/MaterialDesignSpinnerCss';
import NewtonLoader from './loaders/NewtonLoader';
import Preloader from './loaders/Preloader';
//import Glowing from './loaders/Glowing';
import SwingMask from './loaders/SwingMask';
import GooLoader from './loaders/GooLoader';
//import RotatingCircle from './loaders/RotatingCircle';
import Rotator from './loaders/Rotator';


const loaders = [<Loading />, <MaterialDesignSpinnerCss />, <NewtonLoader />, <Preloader />, /*<Glowing />,*/ <SwingMask />, <GooLoader />, /*<RotatingCircle />,*/ <Rotator />];
// adjust Glowing size
const RandomizeLoader = ({ loaderIndex }) => {
  const random = loaderIndex || Math.floor(Math.random() * loaders.length);
  
  return (
  <Fragment>
    { loaders[random] }
  </Fragment>
  );
};

export default RandomizeLoader;
