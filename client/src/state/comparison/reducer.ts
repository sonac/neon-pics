import { inc, evolve } from 'ramda';
import { Action } from 'redux';
import { createReducerFromDescriptor } from 'state/utils';
import {
  fetchComparison,
  fetchComparisonSuccess,
  fetchComparisonError,
  pictureClick,
  postComparison,
  updateCurrentUserInput
} from './actions'
import { pairwise, incrRating } from 'utils/common';
import { processSortingStep } from 'utils/sorting';
import { State, FetchComparisonSuccessAction } from './types';
import { ErrorAction, IdAction, UserInputAction } from 'state/types';

const initState: State = {
  isLoading: true,
  error: null,
  pics: {},
  question: '',
  questionId: null,
  sortState: null,
  currentUser: {login: "oh", password: "hi", eMail: "Mark"},
  userInput: {login: "login", eMail: "email@email.com", password: "password", confirmedPassword: "password"},
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
  [postComparison.type]: (state: State, action: Action): State => ({ ...state}),
  [updateCurrentUserInput.type]: (state: State, action: UserInputAction): State => ({ ...state, userInput: action.user}), 
}, initState);
