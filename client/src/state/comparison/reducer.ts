import { inc, evolve } from 'ramda';
import { Action } from 'redux';
import { createReducerFromDescriptor } from 'state/utils';
import {
  fetchComparison,
  fetchComparisonSuccess,
  fetchComparisonError,
  pictureClick,
  postComparison,
  nextTwo
} from './actions'
import { pairwise } from 'utils/common';
import { sort } from 'utils/sorting';
import { State, FetchComparisonSuccessAction } from './types';
import { ErrorAction, IdAction } from 'state/types';

const initState = {
  isLoading: true,
  error: null,
  pics: {},
  question: '',
  questionId: null,
  currentVote: null,
  currentPicPairIndex: 0,
  combs: [],
  picsToCompare: [],
  sortState: {},
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
    combs: pairwise(action.pictures.map(pic => pic.id)),
    picsToCompare: state.combs[state.currentPicPairIndex],
    sortState: action.initSortState
  }),
  [pictureClick.type]: (state: State, action: IdAction): State => ({
    ...state,
    sortState: sort(action.id, Object.keys(state.pics), state.sortState)
  }),
  [nextTwo.type]: (state: State, action: Action): State => evolve({
    currentPicPairIndex: inc,
    currentVote: _ => null,
    pics: {[state.currentVote]: {rating: inc}}
  }, state),
  [postComparison.type]: (state: State, action: Action): State => ({ ...state})
}, initState);
