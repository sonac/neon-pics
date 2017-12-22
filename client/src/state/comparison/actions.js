import { createActionCreator } from 'state/utils';


export const fetchComparisonSuccess = createActionCreator('FETCH_COMPARISON_SUCCESS', pics => ({
  pics
}));

export const fetchComparisonError = createActionCreator('FETCH_COMPARISON_ERROR', error => ({
  error
}));

export const fetchComparison = createActionCreator('FETCH_COMPARISON');
