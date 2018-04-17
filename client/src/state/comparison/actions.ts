import * as utils from 'state/utils';
import { FetchComparisonSuccessData, User, UserRegInput, UserLogInput, FetchUserData } from './types';
import { IdData, ErrorData, UserRegInputData, UserLogInputData } from 'state/types';

export const fetchComparison = utils.createActionCreator('FETCH_COMPARISON', id => ({
  id
}));

export const fetchComparisonSuccess =
  utils.createActionCreator('FETCH_COMPARISON_SUCCESS', (_: FetchComparisonSuccessData) => _);

export const fetchError =
  utils.createActionCreator('FETCH_ERROR', (error: string | Error): ErrorData => ({
    error
  }));

export const pictureClick = utils.createActionCreator('PICTURE_CLICK', (id: number): IdData => ({
  id
}));

export const nextTwo = utils.createActionCreator('NEXT_TWO');

export const postComparison = utils.createActionCreator('POST_COMPARISON');

export const updateCurrentUserInput = utils.createActionCreator('UPDATE_CURRENT_USER_INPUT', 
                                                                (userInp: UserRegInput): UserRegInputData => ({
  userInp
}));

export const updateCurrentLoginInput = utils.createActionCreator('UPDATE_CURRENT_LOGIN_INPUT',
                                                                (loginInp: UserLogInput): UserLogInputData => ({
  loginInp
}));

export const postUser = utils.createActionCreator('POST_USER');

export const loginSwitcher = utils.createActionCreator('LOGIN_SWITCHER');

export const login = utils.createActionCreator('LOGIN');

export const checkToken = utils.createActionCreator('CHECK_TOKEN');

export const checkTokenSuccess = utils.createActionCreator('CHECK_TOKEN_SUCCESS', (_: FetchUserData) => _);