import { createActionCreator } from 'state/utils';


export const fetchComparisonSuccess = createActionCreator('FETCH_COMPARISON_SUCCESS', _ => _);

export const fetchComparisonError = createActionCreator('FETCH_COMPARISON_ERROR', error => ({
  error
}));

export const fetchComparison = createActionCreator('FETCH_COMPARISON', id => ({
  id
}));

export const pictureClick = createActionCreator('PICTURE_CLICK', id => ({
  id
}));

export const postComparison = createActionCreator('POST_COMPARISON', pics => ({
  pics
}));
