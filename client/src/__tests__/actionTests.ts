import * as actions from 'state/comparison/actions';
import { FetchComparisonSuccessData } from 'state/comparison/types';
import { expect } from 'chai';

describe('testing actions', () => {
    it('should create an action to comparison', () => {
      const id = 1
      const expectedAction = {
        id,
        type: actions.fetchComparison.type
      }
      expect(actions.fetchComparison(id)).to.eql(expectedAction)
    }),
    it('should create an action for successful fetch', () => {
      const fetchedData: FetchComparisonSuccessData = null
      const expectedAction = {
        type: actions.fetchComparisonSuccess.type
      }
      expect(actions.fetchComparisonSuccess(fetchedData)).to.eql(expectedAction)
    }),
    it('should create an action for failed fetch', () => {
      const error: string = 'No data found'
      const expectedAction = {
        error,
        type: actions.fetchError.type
      }
      expect(actions.fetchError(error)).to.eql(expectedAction)
    }),
    it('shoudl create an action for picture click', () => {
      const id = 1
      const expectedAction = {
        id,
        type: actions.pictureClick.type
      }
      expect(actions.pictureClick(id)).to.eql(expectedAction)
    }),
    it('should create an action for post comparison', () => {
      const expectedAction = {
        type: actions.postComparison.type
      }
      expect(actions.postComparison()).to.eql(expectedAction)
    })
  })