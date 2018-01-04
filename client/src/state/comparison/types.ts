import { Action } from 'redux';

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

export type FetchComparisonAction = {};

export interface FetchComparisonSuccessData {
  question: string;
  questionId: number;
  pictures: { id: number, url: string }[];
}

export interface FetchComparisonSuccessAction extends FetchComparisonSuccessData, Action {}

export interface ErrorData {
  error: string | Error;
}

export interface ErrorAction extends ErrorData, Action {}

export interface IdData {
  id: number;
}

export interface IdAction extends IdData, Action {}

export type NextTwoAction = Action
export type PostComparisonAction = Action