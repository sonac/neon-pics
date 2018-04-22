import * as reducer from 'state/comparison/reducer';
import * as actions from 'state/comparison/actions';
import { State, FetchComparisonSuccessData, User, UserRegInput, UserLogInput, FetchUserData } from 'state/comparison/types';
import { expect } from 'chai';

describe('testing reducer', () => {

  const initState: State = {
    isLoading: true,
    error: null,
    pics: {},
    question: '',
    questionId: null,
    sortState: null,
    currentUser: null,
    regFormPlaceholder: null,
    userRegInput: null,
    userLogInput: null,
    mid: 0,
    showLogin: false,
    picInputs: [{url:''}],
    picInpName: ''
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

  it('should return initial state', () => {
    const id = 1;
    expect(reducer.default(initState, actions.fetchComparison(id))).to.eql(initState);
  })

  it('should return some error when comparison failed', () => {
    const errState = {...initState, error: undefined, isLoading: false };
    expect(reducer.default(initState, actions.fetchError)).to.eql(errState);
  })

  it('should return data after successful fetch', () => {
    expect(reducer.default(initState, actions.fetchComparisonSuccess(fetchSuccesData))).to.eql(expectedData);
  })

  it('should process picture click', () => {
    const stateAfterClick = {...expectedData.sortState, end: 1, curElPos: 2, picsToCompare: ["2", "3"], sortedPart: ["1", "2"]}
    expect(reducer.default(expectedData, actions.pictureClick(1))).to.eql({...expectedData, sortState: stateAfterClick })
  })

  it('should process post request', () => {
    const stateAfterClick = {...expectedData.sortState}
    expect(reducer.default(expectedData, actions.postComparison())).to.eql({...expectedData, sortState: stateAfterClick })
  })

  it('should process updating input in reg form', () => {
    const testRegInput: UserRegInput = {
      login: "testLogin",
      eMail: "testEMail",
      password: "testPassword",
      confirmedPassword: "testPassword"
    }
    const stateAfterClick = {...initState, userRegInput: testRegInput}
    expect(reducer.default(initState, actions.updateCurrentUserInput(testRegInput))).to.eql({...stateAfterClick})
  })

  it('should process updating input in log form', () => {
    const testLogInput: UserLogInput = {
      login: "testLogin",
      password: "testPassword"
    }
    const stateAfterClick = {...initState, userLogInput: testLogInput}
    expect(reducer.default(initState, actions.updateCurrentLoginInput(testLogInput))).to.eql({...stateAfterClick})
  })

  it('should process sending post user request', () => {
    const stateAfterClick = {...initState}
    expect(reducer.default(initState, actions.postUser())).to.eql({...stateAfterClick})
  })

  it('should process switching login form', () => {
    const stateAfterClick = {...initState, showLogin: true}
    expect(reducer.default(initState, actions.loginSwitcher())).to.eql({...stateAfterClick})
  })

  it('should process user login', () => {
    const stateAfterClick = {...initState}
    expect(reducer.default(initState, actions.login())).to.eql({...stateAfterClick})
  })

  it('should process user logout', () => {
    const testUser: User = {login: "testLogin", eMail: "testEMail"}
    const stateBeforeClick = {...initState, currentUser: testUser}
    const stateAfterClick = {...stateBeforeClick, currentUser: null}
    expect(reducer.default(stateBeforeClick, actions.logout())).to.eql({...stateAfterClick})
  })

  it('should process check token', () => {
    const stateAfterClick = {...initState}
    expect(reducer.default(initState, actions.checkToken())).to.eql({...stateAfterClick})
  })

  it('should process successful token check', () => {
    const testUser: User = {login: "testLogin", eMail: "testEMail"}
    const testUserData: FetchUserData = {currentUser: testUser}
    const stateAfterClick = {...initState, currentUser: testUser}
    expect(reducer.default(initState, actions.checkTokenSuccess(testUserData))).to.eql({...stateAfterClick})
  })

  it('should process adding new field for picture links', () => {
    const stateAfterClick = {...initState, picInputs: [{url: ''}, {url: ''}]}
    expect(reducer.default(initState, actions.addNewPictureLink())).to.eql({...stateAfterClick})
  })

  it('should process removing of concrete field from picture links', () => {
    const stateBeforeClick = {...initState, picInputs: [{url: 'first'}, {url: 'second'}, {url: 'third'}]}
    const stateAfterClick = {...initState, picInputs: [{url: 'first'}, {url: 'third'}]}
    expect(reducer.default(stateBeforeClick, actions.removePicutreLink(1))).to.eql({...stateAfterClick})
  })

  it('should process updating field for picture links', () => {
    const stateAfterClick = {...initState, picInputs: [{url: 'testInput'}]}
    expect(reducer.default(initState, actions.updatePicLink(0, {url: 'testInput'}))).to.eql({...stateAfterClick})
  })

  it('should process updating quest name', () => {
    const stateAfterClick = {...initState, picInpName: 'testName'}
    expect(reducer.default(initState, actions.updateNewQuestName('testName'))).to.eql({...stateAfterClick})
  })

  it('should process posting of new questionnaire', () => {
    const stateAfterClick = {...initState}
    expect(reducer.default(initState, actions.postNewQuestionnaire())).to.eql({...stateAfterClick})
  })

  it('should process successful posting of new questionnaire', () => {
    const stateBeforeClick = {
      ...initState, 
      picInpName: 'testName', 
      picInputs: [{url: 'first'}, {url: 'second'}, {url: 'third'}]}
    const stateAfterClick = {...initState}
    expect(reducer.default(stateBeforeClick, actions.postNewQuestSuccess())).to.eql({...stateAfterClick})
  })

  it('should process posting of new questionnaire', () => {
    const stateAfterClick = {...initState, error: 'error'}
    expect(reducer.default(initState, actions.postNewQuestError('error'))).to.eql({...stateAfterClick})
  })

})