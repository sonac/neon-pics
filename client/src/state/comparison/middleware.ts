import { fetchComparison, fetchComparisonSuccess, fetchComparisonError, pictureClick, postComparison } from './actions';
import { values } from 'ramda';

interface FetchPicture {
  id: number;
  picUrl: string
}

interface FetchComparisonResponse {
  id: number;
  text: string;
  pictures: FetchPicture[]
}

export default ({ getState, dispatch }) => next => action => {
  if (action.type === fetchComparison.type) {
    fetch(`comparison/${action.id}`)
      .then(response => response.json())
      .then((data: FetchComparisonResponse): void => {
      const pics = data.pictures.map(pic => ({id: pic.id, url: pic.picUrl}))
        // here we just change the field names received from backend, ratings logic should be added in reducer
        dispatch(fetchComparisonSuccess({
          question: data.text,
          questionId: data.id,
          pictures: pics,
          initSortState: {
            sortedPart: [pics.map(p => String(p.id))[0]],
            curElPos: 1,
            picsToCompare: [pics.map(p => String(p.id))[0], pics.map(p => String(p.id))[1]],
            start: 0,
            end: 0
          }
        }))}
      )
      .catch(error => {
        console.error(error);
        dispatch(fetchComparisonError(error))
      })
  }

  if (action.type == postComparison.type) {
    const state = getState();
    const pics = values(state.comparison.pics);
    const questionId = state.comparison.questionId;
    const data = {questionnaireId: questionId, userId: 1, pictureIdScores: pics.map(x => ({pictureId: x.id, score: x.rating}))};

    fetch('/comparison-answer/', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(
        data
      )
    });
  }

  return next(action);
};
