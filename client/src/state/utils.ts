import { Action } from 'redux';
import { UntypedActionCreator, ActionCreator, ReducerDescriptor, BasicReducer } from 'state/types';

export function createReducerFromDescriptor(descriptor: ReducerDescriptor, initState: object): BasicReducer {
  return (state: object = initState, action: Action): object => {
    const actionHandler = descriptor[action.type];
    return actionHandler ? actionHandler(state, action) : state;
  }
}

export function createActionCreator<T extends object>(type: string, creator?: UntypedActionCreator<T>): ActionCreator<T> {
  const typedCreator = <ActionCreator<T>>function(...args: any[]): T & Action {
    return <T & Action>{ ...(creator ? creator(...args) : {}), type };
  };

  typedCreator.type = type;

  return typedCreator;
}
