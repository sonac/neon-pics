import { ReducersMapObject, Reducer, Action } from 'redux';

export type UntypedActionCreator0<R extends object> = () => R;
export type UntypedActionCreator1<T1, R extends object> = (a1: T1) => R;
export type UntypedActionCreator2<T1, T2, R extends object> = (a1: T1, a2: T2) => R;
export type UntypedActionCreator3<T1, T2, T3, R extends object> = (a1: T1, a2: T2, a3: T3) => R;

export type Typed = {
  type: string;
}

export type TypedFunc = ((...args: any[]) => any) & Typed;

export type ActionCreator0<R> = Typed & UntypedActionCreator0<R & Action>;
export type ActionCreator1<T1, R> = Typed & UntypedActionCreator1<T1, R & Action>;
export type ActionCreator2<T1, T2, R> = Typed & UntypedActionCreator2<T1, T2, R & Action>;
export type ActionCreator3<T1, T2, T3, R> = Typed & UntypedActionCreator3<T1, T2, T3, R & Action>;

export type BasicReducer = Reducer<object>;

export interface ReducerDescriptor extends ReducersMapObject {
  [key: string]: BasicReducer;
}
