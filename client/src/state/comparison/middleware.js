import { fetchComparison, fetchComparisonSuccess, fetchComparisonError } from './actions';

export default ({ getState, dispatch }) => next => action => {
  if (action.type === fetchComparison.type) {
    fetch('api/pictures')
      .then(response => response.json())
      .then(urls =>
        dispatch(fetchComparisonSuccess(urls.map(url => ({ url }))))
      )
      .catch(error =>
        dispatch(fetchComparisonError(error))
      )
  }

  return next(action);
};