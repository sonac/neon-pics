import * as actions from '../state/comparison/actions';
import { FetchComparisonSuccessData, UserRegInput, UserLogInput, FetchUserData, PicInput } from 'state/comparison/types';
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
    }),
    it('should create an action for update current reg input', () => {
      const testRegInput: UserRegInput = {
        login: "testLogin",
        eMail: "testEMail",
        password: "testPassword",
        confirmedPassword: "testPassword"
      }
      const expectedAction = {
        userInp: testRegInput,
        type: actions.updateCurrentUserInput.type
      }
      expect(actions.updateCurrentUserInput(testRegInput)).to.eql(expectedAction)
    }),
    it('should create an action for update current login input', () => {
      const testLogInput: UserLogInput = {
        login: "testLogin",
        password: "testPassword"
      }
      const expectedAction = {
        loginInp: testLogInput,
        type: actions.updateCurrentLoginInput.type
      }
      expect(actions.updateCurrentLoginInput(testLogInput)).to.eql(expectedAction)
    }),
    it('should create an action for post user', () => {
      const expectedAction = {
        type: actions.postUser.type
      }
      expect(actions.postUser()).to.eql(expectedAction)
    }),
    it('should create an action for login window switcher', () => {
      const expectedAction = {
        type: actions.loginSwitcher.type
      }
      expect(actions.loginSwitcher()).to.eql(expectedAction)
    }),
    it('should create an action for login', () => {
      const expectedAction = {
        type: actions.login.type
      }
      expect(actions.login()).to.eql(expectedAction)
    }),
    it('should create an action for logout', () => {
      const expectedAction = {
        type: actions.logout.type
      }
      expect(actions.logout()).to.eql(expectedAction)
    }),
    it('should create an action for checking of token', () => {
      const expectedAction = {
        type: actions.checkToken.type
      }
      expect(actions.checkToken()).to.eql(expectedAction)
    }),
    it('should create an action for successful fetch', () => {
      const fetchedData: FetchUserData = null
      const expectedAction = {
        type: actions.checkTokenSuccess.type
      }
      expect(actions.checkTokenSuccess(fetchedData)).to.eql(expectedAction)
    }),
    it('should create an action for adding new picture link', () => {
      const expectedAction = {
        type: actions.addNewPictureLink.type
      }
      expect(actions.addNewPictureLink()).to.eql(expectedAction)
    }),
    it('shoudl create an action for remove picture link from array', () => {
      const id = 1
      const expectedAction = {
        id,
        type: actions.removePicutreLink.type
      }
      expect(actions.removePicutreLink(id)).to.eql(expectedAction)
    }),
    it('shoudl create an action for updating picture input', () => {
      const picIdx = 1;
      const picInp: PicInput = {url: ''}
      const expectedAction = {
        picInp,
        picIdx,
        type: actions.updatePicLink.type
      }
      expect(actions.updatePicLink(picIdx, picInp)).to.eql(expectedAction)
    }),
    it('shoudl create an action for updating new quest name', () => {
      const picInpName = "testName"
      const expectedAction = {
        picInpName,
        type: actions.updateNewQuestName.type
      }
      expect(actions.updateNewQuestName(picInpName)).to.eql(expectedAction)
    }),
    it('should create an action for post request for new quest', () => {
      const expectedAction = {
        type: actions.postNewQuestionnaire.type
      }
      expect(actions.postNewQuestionnaire()).to.eql(expectedAction)
    }),
    it('should create an action for success after post', () => {
      const expectedAction = {
        type: actions.postNewQuestSuccess.type
      }
      expect(actions.postNewQuestSuccess()).to.eql(expectedAction)
    }),
    it('should create an action for failed fetch', () => {
      const error: string = 'No data found'
      const expectedAction = {
        error,
        type: actions.postNewQuestError.type
      }
      expect(actions.postNewQuestError(error)).to.eql(expectedAction)
    })
  })