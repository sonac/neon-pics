import { StoreCreator, createStore, combineReducers, applyMiddleware, compose } from 'redux';
//import routerReducer from 'react-router-redux';
import comparisonMiddleware from './comparison/middleware';
import comparisonReducer from './comparison/reducer';

declare global {
  interface Window {
    devToolsExtension: Function
  }
}

const finalCreateStore = compose<any>(
  applyMiddleware(comparisonMiddleware),
  window.devToolsExtension ? window.devToolsExtension() : f => f
)(createStore) as StoreCreator;

const store = finalCreateStore(combineReducers({ comparison: comparisonReducer }));

export default store;
