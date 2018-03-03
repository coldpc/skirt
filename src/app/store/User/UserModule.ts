import {InStateModule} from "../InStateModule";
export class Actions{
  static set = "SET";
}

export interface InUserInfo {
  name?: string
}
interface UserState {
  userInfo: InUserInfo;
}

export class UserModule implements InStateModule{
  state: UserState = {
    userInfo: {}
  };
  moduleName = 'user';

  actions:object = {
    set: function (userInfo) {
      UserModule.getInstance().state.userInfo = userInfo;
      return userInfo;
    },
    setName: function (name) {
      UserModule.getInstance().state.userInfo.name = name;
    }
  };
  static instance: UserModule;
  static getInstance():UserModule {
    let instance: UserModule = UserModule.instance;
    if (!instance){
      instance = new UserModule();
    }
    return instance;
  }

  constructor() {
    if (UserModule.instance) {
      throw new Error('This is a singleton!');
    } else {
      UserModule.instance = this;
    }
  }
}
