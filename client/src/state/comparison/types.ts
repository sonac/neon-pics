import { Action } from 'redux';
import { ActionCreator1 } from 'state/types';

export interface Picture {
  id: number;
  url: string;
  rating: number;
}

export type PicturesMap = Record<string, Picture>

export interface State {
  isLoading: boolean;
  error: null | string | Error;
  pics: Record<string, Picture>;
  question: string;
  questionId: null | number;
  currentVote: null | number;
  currentPicPairIndex: number;
  combs: [number, number][];
}

export type FetchComparisonSuccessData = {
  question: string;
  questionId: number;
  pictures: { id: number, url: string }[];
}
export type FetchComparisonSuccessAction = FetchComparisonSuccessData & Action;
export type FetchComparisonSuccessCreator = ActionCreator1<FetchComparisonSuccessData, FetchComparisonSuccessAction>;