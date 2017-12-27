import { createActionCreator } from 'state/utils';


export const fetchComparisonSuccess = createActionCreator('FETCH_COMPARISON_SUCCESS', (que, pics) => ({
  que, pics
}));

export const fetchComparisonError = createActionCreator('FETCH_COMPARISON_ERROR', error => ({
  error
}));

export const fetchComparison = createActionCreator('FETCH_COMPARISON');

//second arg isn't being sent?
export const pictureClick = createActionCreator('PICTURE_CLICK', (pics, url) => ({
  pics, url
}));
