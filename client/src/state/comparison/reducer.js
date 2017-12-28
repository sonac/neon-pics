import { inc } from 'ramda';
import { evolvePath } from 'utils/common';
import { createReducerFromDescriptor } from 'state/utils';
import { fetchComparison, fetchComparisonSuccess, fetchComparisonError, pictureClick, postComparison, nextTwo } from './actions'

const initState = {
  isLoading: true,
  error: null,
  pics: {},
  question: null,
  questionId: null,
  curVote: null
};

export default createReducerFromDescriptor({
  [fetchComparison.type]: state => ({ ...state, isLoading: true }),
  [fetchComparisonError.type]: (state, action) => ({ ...state, error: action.error, isLoading: false }),
  [fetchComparisonSuccess.type]: (state, action) => ({
    ...state,
    isLoading: false,
    question: action.question,
    questionId: action.questionId,
    pics: action.pictures.reduce((acc, pic) => ({...acc, [pic.id]: {...pic, rating: 0} }), {}),
  }),
  [pictureClick.type]: (state, action) => ({
    ...state,
    curVote: action.id
  }),
  [nextTwo.type]: (state, action) => evolvePath(['pics', state.curVote, 'rating'], inc, state),
  [postComparison.type]: (state, action) => ({ ...state})
}, initState);
