import { inc, evolve } from 'ramda';
import { Action } from 'redux';
import { createReducerFromDescriptor } from 'state/utils';
import {
  fetchComparison,
  fetchComparisonSuccess,
  fetchError,
  pictureClick,
  postComparison,
  updateCurrentUserInput,
  postUser,
  loginSwitcher,
  login,
  logout,
  updateCurrentLoginInput,
  checkToken,
  checkTokenSuccess,
  addNewPictureLink,
  removePicutreLink,
  updatePicLink,
  updateNewQuestName
} from './actions'
import { pairwise, incrRating, updateInput } from 'utils/common';
import { processSortingStep } from 'utils/sorting';
import { State, FetchComparisonSuccessAction, FetchUserAction } from './types';
import { ErrorAction, IdAction, UserRegInputAction, UserLogInputAction, PicInputAction, NewQuestNameAction } from 'state/types';

const initState: State = {
  isLoading: true,
  error: null,
  pics: {},
  question: '',
  questionId: null,
  sortState: null,
  currentUser: null,
  regFormPlaceholder: {login: "Login:", eMail: "Email:", password: "Password:", confirmedPassword: "Password:"},
  userRegInput: null,
  userLogInput: null,
  mid: 0,
  showLogin: false,
  picInputs: [{url: ''}],
  picInpName: ''
};

export default createReducerFromDescriptor({
  [fetchComparison.type]: (state: State): State => ({
    ...state,
    isLoading: true
  }),
  [fetchError.type]: (state: State, action: ErrorAction): State => ({
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
  [updateCurrentUserInput.type]: (state: State, action: UserRegInputAction): State => ({ ...state, userRegInput: action.userInp}),
  [updateCurrentLoginInput.type]: (state: State, action: UserLogInputAction): State => ({...state, userLogInput: action.loginInp}),
  [postUser.type]: (state: State, action: Action): State => ({...state}),
  [loginSwitcher.type]: (state: State, action: Action): State => ({...state, showLogin: !state.showLogin}), 
  [login.type]: (state: State, action: Action): State => ({...state}),
  [logout.type]: (state: State, action: Action): State => ({...state, currentUser: null}),
  [checkToken.type]: (state: State, action: Action): State => ({...state}),
  [checkTokenSuccess.type]: (state: State, action: FetchUserAction): State => ({
    ...state, currentUser: action.currentUser}),
  [addNewPictureLink.type]: (state: State, action: Action): State => ({...state, picInputs: state.picInputs.concat({url: ''})}),
  [removePicutreLink.type]: (state: State, action: IdAction): State => ({
    ...state, 
    picInputs: state.picInputs.filter((p, pidx) => pidx !== action.id)}),
  [updatePicLink.type]: (state: State, action: PicInputAction): State => ({
    ...state,
    picInputs: updateInput(action.picIdx, state.picInputs, action.picInp.url) }),
  [updateNewQuestName.type]: (state: State, action: NewQuestNameAction): State => ({
    ...state,
    picInpName: action.picInpName
  })
}, initState);
