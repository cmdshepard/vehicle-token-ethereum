import { combineReducers } from 'redux';
import account from './accountReducer';
import vehicles from './vehiclesReducer';

const reducers = combineReducers({
  account,
  vehicles,
});

export default reducers;
