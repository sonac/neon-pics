import { createReducerFromDescriptor } from 'state/utils';
import { fetchComparison, fetchComparisonSuccess, fetchComparisonError, pictureClick } from './actions'

const initState = {
  isLoading: true,
  error: null,
  pics: [{url: "none", rtng: 0}]
};

export default createReducerFromDescriptor({
  [fetchComparison.type]: state => ({ ...state, isLoading: true }),
  [fetchComparisonError.type]: (state, action) => ({ ...state, error: action.error, isLoading: false }),
  [fetchComparisonSuccess.type]: (state, action) => ({
    ...state,
    isLoading: false,
    pics: action.pics
  }),
  [pictureClick.type]: (state, action) => ({
    ...state,
    pics: action.pics
  })
}, initState);
