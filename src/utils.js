import React from 'react';
import { element } from 'prop-types';


const inject = obj => Component => props => <Component {...obj} {...props} />

export default inject; 
 
