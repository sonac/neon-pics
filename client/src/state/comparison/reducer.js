import { evolve, inc } from 'ramda';
import { createReducerFromDescriptor } from 'state/utils';
import { fetchComparison, fetchComparisonSuccess, fetchComparisonError, pictureClick } from './actions'

const initState = {
  isLoading: true,
  error: null,
  pics: {},
  question: null
};

export default createReducerFromDescriptor({
  [fetchComparison.type]: state => ({ ...state, isLoading: true }),
  [fetchComparisonError.type]: (state, action) => ({ ...state, error: action.error, isLoading: false }),
  [fetchComparisonSuccess.type]: (state, action) => ({
    ...state,
    isLoading: false,
    question: action.question,
    pics: action.pictures.reduce((acc, pic) => ({...acc, [pic.id]: {...pic, rating: 0} }), {}),
  }),
  [pictureClick.type]: (state, action) => evolve({ pics: { [action.id]: { rating: inc } } }, state)
}, initState);
