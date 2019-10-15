import React, {Fragment} from 'react';
import Loading from './Loading';
import MaterialDesignSpinnerCss from './loaders/MaterialDesignSpinnerCss';
import NewtonLoader from './loaders/NewtonLoader';
import Preloader from './loaders/Preloader';
import Glowing from './loaders/Glowing';
import SwingMask from './loaders/SwingMask';
import GooLoader from './loaders/GooLoader';
import RotatingCircle from './loaders/RotatingCircle';
import Rotator from './loaders/Rotator';


const loaders = [<Loading />, <MaterialDesignSpinnerCss />, <NewtonLoader />, <Preloader />, <Glowing />, <SwingMask />, <GooLoader />, <RotatingCircle />, <Rotator />];

const RandomizeLoader = () => {
  const random = Math.floor(Math.random(loaders.length) * 10);
  
  return (
  <Fragment>
    {loaders[random] }
  </Fragment>
  );
};

export default RandomizeLoader;
