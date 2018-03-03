import {InStateModule} from "./InStateModule";
import {UserModule} from './User/UserModule'

export class StateManager implements InStateModule{
  static instance: StateManager;
  private modules:any = {};

  actions = {};
  moduleName = 'root';
  state = {};

  constructor(){
    if (StateManager.instance){
      throw new Error('This is a singleton!');
    }else{
      StateManager.instance = this;
      this.init();
    }
  }

  init (){
    StateManager.addModule(UserModule.getInstance());
  }

  static getInstance():StateManager {
    let instance: StateManager = StateManager.instance;
    if (!instance){
      instance = new StateManager();
    }
    return instance;
  }

  /**
   *
   * @param {InStateModule} module
   * 增加模块
   * 提供模块的名称
   * 模块的actions
   * 模块的状态数据
   * 实现状态的存取
   *
   */
  static addModule(module: InStateModule){
    let _this = StateManager.getInstance();
    let moduleName = module.moduleName;
    if (!_this.modules[moduleName]){
      _this.modules[moduleName] = module;
    }else{
      throw new Error("The module called '" + moduleName + "' has existed!");
    }
  }

  getModule(currentModule: InStateModule = null, moduleName: string): InStateModule{
    currentModule = currentModule || this;
    return currentModule[moduleName];
  }

  doAction(module: InStateModule, actionType: string, payload: any){
    let call = module.actions[actionType];
    if (typeof call == 'function'){
      call(payload);
    }
  }
}
