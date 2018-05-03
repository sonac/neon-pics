import { Action } from 'redux';
import { ActionCreator1 } from 'state/types';

export type Picture = {
  id: number;
  url: string;
  rating: number;
}

export type PicInput = {
  url: string;
}

export type PicturesMap = Record<string, Picture>

export type SortState = {
  sortedPart: Array<string>;
  curElPos: number;
  picsToCompare: Array<string>;
  start: number;
  end: number;
};

export type User = {
  login: string;
  eMail: string;
}

export type UserRegInput = {
  login: string;
  eMail: string;
  password: string;
  confirmedPassword: string;
}

export type UserLogInput = {
  login: string;
  password: string;
}

export type Questionnaire = {
  text: string,
  pictureIds: Array<number>
}

export type Question = {
  id: number,
  text: string
}

export type EnhancedQuestionnaire = {
  id: number,
  question: string,
  pics: Array<Picture>
}

export type QuestionnaireSeq = Array<EnhancedQuestionnaire>

export interface State {
  isLoading: boolean;
  error: null | string | Error;
  pics: PicturesMap;
  question: string;
  questionId: null | number;
  sortState: SortState | null;
  currentUser: User | null;
  regFormPlaceholder: UserRegInput;
  userRegInput: UserRegInput | null;
  userLogInput: UserLogInput | null;
  mid: number;
  showLogin: boolean;
  picInputs: Array<PicInput>;
  picInpName: string | null;
  questionnaires: QuestionnaireSeq | null;
  isSent: boolean;
  comparisonToFetch: number | null;
  answeredQuestions: Array<Question> | null;
  questionnaireResult: Array<Picture> | null;
}

export type FetchComparisonSuccessData = {
  question: string;
  questionId: number;
  pictures: { id: number, url: string }[];
  initSortState: SortState;
}
export type FetchComparisonSuccessAction = FetchComparisonSuccessData & Action;
export type FetchComparisonSuccessCreator = ActionCreator1<FetchComparisonSuccessData, FetchComparisonSuccessAction>;

export type FetchUserData = {
  currentUser: User
}
export type FetchUserAction = FetchUserData & Action;
export type FetchUserCreator = ActionCreator1<FetchUserData, FetchUserAction>;

export type FetchAllQuestsSuccessData = {
  quests: QuestionnaireSeq
}
export type  FetchAllQuestsSuccessAction = FetchAllQuestsSuccessData & Action;
export type FetchAllQuestsSuccessCreator = ActionCreator1<FetchAllQuestsSuccessData, FetchAllQuestsSuccessAction>;

export type FetchAnsweredQuestionSuccessData = {
  questions: Array<Question>
} 
export type FetchAnsweredQuestionSuccessAction = FetchAnsweredQuestionSuccessData & Action;
export type FetchAnsweredQuestionSuccessCreator = ActionCreator1<FetchAnsweredQuestionSuccessData
, FetchAnsweredQuestionSuccessAction>;

export type FetchAnswerResultSuccessData = {
  results: Array<Picture>
} 
export type FetchAnswerResultSuccessAction = FetchAnswerResultSuccessData & Action;
export type FetchAnswerResultSuccessCreator = ActionCreator1<FetchAnswerResultSuccessData
, FetchAnswerResultSuccessAction>;