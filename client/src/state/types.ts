import { ReducersMapObject, Reducer, Action } from 'redux';
import { User, UserRegInput, UserLogInput, PicInput } from 'state/comparison/types'
import { ActionCreator } from 'react-redux';

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

export type BasicActionCreator = ActionCreator0<Action>;

export type IdData = {
  id: number;
}
export type IdAction = IdData & Action;
export type IdActionCreator = ActionCreator1<number, IdAction>;

export type BasicReducer = Reducer<object>;

export interface ReducerDescriptor extends ReducersMapObject {
  [key: string]: BasicReducer;
}

export type ErrorData = {
  error: string | Error;
}
export type ErrorAction = ErrorData & Action;
export type ErrorActionCreator = ActionCreator1<string | Error, ErrorAction>;

export type UserRegInputData = {
  userInp: UserRegInput
}
export type UserRegInputAction = UserRegInputData & Action;
export type UserRegInputActionCreator = ActionCreator1<UserRegInput, UserRegInputAction>

export type UserLogInputData = {
  loginInp: UserLogInput
}
export type UserLogInputAction = UserLogInputData & Action;
export type UserLogInputActionCreator = ActionCreator1<UserLogInput, UserLogInputAction>

export type PicInputData = {
  picIdx: number,
  picInp: PicInput
}
export type PicInputAction = PicInputData & Action;
export type PicInputActionCreator = ActionCreator2<number, PicInput, PicInputAction>

export type NewQuestNameData = {
  picInpName: string
}
export type NewQuestNameAction = NewQuestNameData & Action
export type NewQuestNameActionCreator = ActionCreator1<string, NewQuestNameAction>