import * as utils from 'state/utils';
import { FetchComparisonSuccessData } from './types';
import { IdData, ErrorData } from 'state/types';

export const fetchComparison = utils.createActionCreator('FETCH_COMPARISON', id => ({
  id
}));

export const fetchComparisonSuccess =
  utils.createActionCreator('FETCH_COMPARISON_SUCCESS', (_: FetchComparisonSuccessData) => _);

export const fetchComparisonError =
  utils.createActionCreator('FETCH_COMPARISON_ERROR', (error: string | Error): ErrorData => ({
    error
  }));

export const pictureClick = utils.createActionCreator('PICTURE_CLICK', (id: number): IdData => ({
  id
}));

export const nextTwo = utils.createActionCreator('NEXT_TWO');

export const postComparison = utils.createActionCreator('POST_COMPARISON');
