import { inc, evolve } from 'ramda';
import { Action } from 'redux';
import { createReducerFromDescriptor } from 'state/utils';
import {
  fetchComparison,
  fetchComparisonSuccess,
  fetchComparisonError,
  pictureClick,
  postComparison
} from './actions'
import { pairwise, incrRating } from 'utils/common';
import { processSortingStep } from 'utils/sorting';
import { State, FetchComparisonSuccessAction } from './types';
import { ErrorAction, IdAction } from 'state/types';

const initState: State = {
  isLoading: true,
  error: null,
  pics: {},
  question: '',
  questionId: null,
  sortState: null,
  mid: 0
};

export default createReducerFromDescriptor({
  [fetchComparison.type]: (state: State): State => ({
    ...state,
    isLoading: true
  }),
  [fetchComparisonError.type]: (state: State, action: ErrorAction): State => ({
    ...state,
    error: action.error,
    isLoading: false
  }),
  [fetchComparisonSuccess.type]: (state: State, action: FetchComparisonSuccessAction): State => ({
    ...state,
    isLoading: false,
    question: action.question,
    questionId: action.questionId,
    pics: action.pictures.reduce((acc, pic) => ({...acc, [pic.id]: {...pic, rating: 0} }), {}),
    sortState: action.initSortState
  }),
  [pictureClick.type]: (state: State, action: IdAction): State => ({
    ...state,
    sortState: processSortingStep(action.id, Object.keys(state.pics), state.sortState),
    pics: incrRating(action.id, state.pics)
  }),
  [postComparison.type]: (state: State, action: Action): State => ({ ...state})
}, initState);
