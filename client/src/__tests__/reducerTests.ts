import * as reducer from 'state/comparison/reducer';
import * as actions from 'state/comparison/actions';
import { State, FetchComparisonSuccessData } from 'state/comparison/types';
import { expect } from 'chai';

describe('testing reducer', () => {

  const initState: State = {
    isLoading: true,
    error: null,
    pics: {},
    question: '',
    questionId: null,
    sortState: null,
    mid: 0
  };

  const fetchedData = {"id":1,
                       "text":"Dummy question",
                       "pictures":[{"id":1,"picUrl":"dummy_url1"},
                                   {"id":2,"picUrl":"dummy_url2"},
                                   {"id":3,"picUrl":"dummy_url3"}]};
  const pics = fetchedData.pictures.map(pic => ({id: pic.id, url: pic.picUrl}));
  const question = fetchedData.text;
  const questionId = fetchedData.id;
  const pictures =  pics;
  const initSortState = {
    sortedPart: [pics.map(p => String(p.id))[0]],
    curElPos: 1,
    picsToCompare: [pics.map(p => String(p.id))[0], pics.map(p => String(p.id))[1]],
    start: 0,
    end: 0
  };
  const fetchSuccesData: FetchComparisonSuccessData = {
    question,
    questionId,
    pictures,
    initSortState
  };
  const expectedData = {
    ...initState,
    isLoading: false,
    question: fetchSuccesData.question,
    questionId: fetchSuccesData.questionId,
    pics: fetchSuccesData.pictures.reduce((acc, pic) => ({...acc, [pic.id]: {...pic, rating: 0} }), {}),
    sortState: fetchSuccesData.initSortState
  };
  console.log(expectedData);

  it('should return initial state', () => {
    const id = 1;
    expect(reducer.default(initState, actions.fetchComparison(id))).to.eql(initState);
  })

  it('should return some error when comparison failed', () => {
    const errState = {...initState, error: undefined, isLoading: false };
    expect(reducer.default(initState, actions.fetchComparisonError)).to.eql(errState);
  })

  it('should return data after successful fetch', () => {
    expect(reducer.default(initState, actions.fetchComparisonSuccess(fetchSuccesData))).to.eql(expectedData);
  })

  it('should process picture click', () => {
    const stateAfterClick = {...expectedData.sortState, end: 1, curElPos: 2, picsToCompare: ["2", "3"], sortedPart: ["1", "2"]}
    expect(reducer.default(expectedData, actions.pictureClick(1))).to.eql({...expectedData, sortState: stateAfterClick })
  })

})