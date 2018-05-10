import * as utils from '../utils';
import { FetchComparisonSuccessData, 
  User, 
  UserRegInput, 
  UserLogInput, 
  FetchUserData, 
  PicInput, 
  FetchAllQuestsSuccessData,
  FetchAnsweredQuestionSuccessData,
  FetchAnswerResultSuccessData } from './types';
import { IdData, ErrorData, UserRegInputData, UserLogInputData, PicInputData, NewQuestNameData } from 'state/types';

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

export const logout = utils.createActionCreator('LOGOUT');

export const checkToken = utils.createActionCreator('CHECK_TOKEN');

export const checkTokenSuccess = utils.createActionCreator('CHECK_TOKEN_SUCCESS', (_: FetchUserData) => _);

export const addNewPictureLink = utils.createActionCreator('ADD_NEW_PIC_LINK');

export const removePicutreLink = utils.createActionCreator('REMOVE_PIC_LINK', (id: number): IdData => ({
  id
}));

export const updatePicLink = utils.createActionCreator('UPDATE_PIC_LINK', (picIdx: number, picInp: PicInput): PicInputData => ({
  picIdx, picInp
}));

export const updateNewQuestName = utils.createActionCreator('UPDATE_NEW_QUEST_NAME', (picInpName: string): NewQuestNameData => ({
  picInpName
}));

export const postNewQuestionnaire = utils.createActionCreator('POST_NEW_QUEST');

export const postNewQuestSuccess = utils.createActionCreator('POST_NEW_QUEST_SUCCESS');

export const postNewQuestError =
  utils.createActionCreator('POST_NEW_QUEST_ERROR', (error: string | Error): ErrorData => ({
    error
}));

export const fetchAllQuestionnaires = utils.createActionCreator('FETCH_ALL_QUESTS');

export const fetchAllQuestionnairesSuccess = utils.createActionCreator('FETCH_ALL_QUESTS_SUCCESS', 
  (_: FetchAllQuestsSuccessData) => _);

export const loadComparison = utils.createActionCreator('CHOOSE_COMPARISON');

export const fetchAnsweredQuestions = utils.createActionCreator('FETCH_ANSWERED_QUESTIONS');

export const fetchAnsweredQuestionsSuccess = utils.createActionCreator('FETCH_ANSWERED_QUESTIONS_SUCCESS', 
  (_: FetchAnsweredQuestionSuccessData) => _);

export const fetchAnswerResult = utils.createActionCreator('FETCH_ANSWER_RESULT', id => ({
  id
}));

export const fetchAnswerResultSuccess = utils.createActionCreator('FETCH_ANSWER_RESULT_SUCCESS',
  (_: FetchAnswerResultSuccessData) => _);