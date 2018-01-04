import { createActionCreator } from 'state/utils';
import { FetchComparisonSuccessData, IdData, ErrorData } from './types';

export const fetchComparison = createActionCreator('FETCH_COMPARISON', id => ({
  id
}));

export const fetchComparisonSuccess =
  createActionCreator('FETCH_COMPARISON_SUCCESS', (_: FetchComparisonSuccessData) => _);

export const fetchComparisonError =
  createActionCreator('FETCH_COMPARISON_ERROR', (error: string | Error): ErrorData => ({
    error
  }));

export const pictureClick = createActionCreator('PICTURE_CLICK', (id: number): IdData => ({
  id
}));

export const nextTwo = createActionCreator('NEXT_TWO');

export const postComparison = createActionCreator('POST_COMPARISON');
