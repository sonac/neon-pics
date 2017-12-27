import { fetchComparison, fetchComparisonSuccess, fetchComparisonError, pictureClick } from './actions';

export default ({ getState, dispatch }) => next => action => {
  if (action.type === fetchComparison.type) {
    fetch(`comparison/${action.id}`)
      .then(response => response.json())
      .then(data =>
        // here we just change the field names received from backend, ratings logic should be added in reducer
        dispatch(fetchComparisonSuccess({
          question: data.text,
          pictures: data.pictures.map(pic => ({id: pic.id, url: pic.picUrl}))
        }))
      )
      .catch(error => {
        console.error(error);
        dispatch(fetchComparisonError(error))
      })
  }

  return next(action);
};
