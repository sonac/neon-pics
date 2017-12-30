import { isFunction } from 'utils/common';

export function createReducerFromDescriptor(descriptor, initState) {
  return (state = initState, action) => {
    const actionHandler = descriptor[action.type];
    return actionHandler ? actionHandler(state, action) : state;
  }
}

export function createActionCreator(type, creator) {
  const typedCreator = function() {
    const action = isFunction(creator) ? creator(...arguments) : {};
    action.type = type;
    return action;
  };

  typedCreator.type = type;

  return typedCreator;
}
