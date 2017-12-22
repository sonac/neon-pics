import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import comparisonMiddleware from './comparison/middleware';
import comparisonReducer from './comparison/reducer';

const finalCreateStore = compose(
  applyMiddleware(comparisonMiddleware),
  window.devToolsExtension ? window.devToolsExtension() : f => f
)(createStore);

const store = finalCreateStore(combineReducers({ comparison: comparisonReducer }));

export default store;
