import { ReducersMapObject, Reducer, Action } from 'redux';

export interface UntypedActionCreator<T> {
  (...args: any[]): T;
}

export interface ActionCreator<T> {
  (...args: any[]): T & Action;
  type: string;
}

export type BasicReducer = Reducer<object>;

export interface ReducerDescriptor extends ReducersMapObject {
  [key: string]: BasicReducer;
}
