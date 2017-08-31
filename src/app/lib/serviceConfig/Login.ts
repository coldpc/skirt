export enum Enum {
  Red = 'RED',
  Green = 'GREEN',
  Blue = 'BLUE'
}

export class Login {
  // 修改密码
  static modifyPassword: any = {
      url: '/login/modifyPassword',
      paras: {
        dynamicPassword: 'dynamicPassword',
        internationalCode: 'internationalCode',
        mobile: 'mobile',
        password: 'password'
      }
  };

  // 验证手机号
  static verifyDynamicPwd: any = {
    url: '/login/verifyDynamicPwd',
    paras: {
      dynamicPassword: 'dynamicPassword', // 验证码
      mobile: 'mobile', // 手机号
      internationalCode: 'internationalCode', // 区号
      token: 'token' // 验证码的token
    }
  };



  // 修改绑定手机
  static modifyMobile: object = {
    url: '/login/modifyMobile',
    paras: {
      oldDynamicPassword: 'oldDynamicPassword', // 上一次的验证码
      oldMobile: 'oldMobile', // 上一次的手机号
      oldInternationalCode: 'oldInternationalCode', // 上一次的区号
      oldToken: 'oldToken', // 上一次的token
      dynamicPassword: 'dynamicPassword', // 验证码
      mobile: 'mobile', // 手机号
      internationalCode: 'internationalCode', // 区号
      token: 'internationalCode' // token
    }
  };
}
