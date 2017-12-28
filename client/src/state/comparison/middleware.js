import { fetchComparison, fetchComparisonSuccess, fetchComparisonError, pictureClick, postComparison } from './actions';
import { values } from 'ramda';

export default ({ getState, dispatch }) => next => action => {
  if (action.type === fetchComparison.type) {
    fetch(`comparison/${action.id}`)
      .then(response => response.json())
      .then(data =>
        // here we just change the field names received from backend, ratings logic should be added in reducer
        dispatch(fetchComparisonSuccess({
          question: data.text,
          questionId: data.id,
          pictures: data.pictures.map(pic => ({id: pic.id, url: pic.picUrl}))
        }))
      )
      .catch(error => {
        console.error(error);
        dispatch(fetchComparisonError(error))
      })
  }

  else if (action.type == postComparison.type) {
    const state = getState();
    const pics = values(state.comparison.pics);
    const questionId = state.comparison.questionId;
    const data = {questionnaireId: questionId, userId: 1, pictureIdScores: pics.map(x => ({pictureId: x["id"], score: x["rating"]}))};
    fetch('/comparison-answer/', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        data
      })
    });
  }

  return next(action);
};
