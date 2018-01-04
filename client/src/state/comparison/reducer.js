import { inc, values, map, evolve, add } from 'ramda';
import { evolvePath } from 'utils/common';
import { createReducerFromDescriptor } from 'state/utils';
import { fetchComparison, fetchComparisonSuccess, fetchComparisonError, pictureClick, postComparison, nextTwo } from './actions'

const initState = {
  isLoading: true,
  error: null,
  pics: {},
  question: null,
  questionId: null,
  currentVote: null,
  currentPicPairIndex: 0,
  combs: []
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
    combs: action.combs
  }),
  [pictureClick.type]: (state, action) => ({
    ...state,
    currentVote: action.id
  }),
  [nextTwo.type]: (state, action) => evolve({
    currentPicPairIndex: inc,
    currentVote: _ => null,
    pics: {[state.currentVote]: {rating: inc}}
  }, state),
  [postComparison.type]: (state, action) => ({ ...state})
}, initState);
