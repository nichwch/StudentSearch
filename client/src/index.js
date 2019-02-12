import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';

import Particles from 'react-particles-js';
import ParticleConfig from './ParticleConfig';

ReactDOM.render(
  <React.Fragment>
  <Particles className ="background" params = {ParticleConfig}/>
  <div className = "opacityLayer"></div>
  <App />
  </React.Fragment>


  , document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
