import {Action} from '@ngrx/store'; // ng build --prod --aot
import {StateManager} from './StateManager'
import {InStateModule} from "./InStateModule";

const stateManager = StateManager.getInstance();
export function Reducers (state:StateManager, action: Action) {
  if (!state) {
    return stateManager;
  }

  let actionType = action.type.split('.');
  let l = actionType.length;
  let module: InStateModule = state;
  for (var i = 0; i < l; i++) {
    if (l === i + 1){
      return state.doAction(module, actionType[i], action.payload);
    }else {
      module = state.getModule(module, actionType[i]);
    }
  }
}
