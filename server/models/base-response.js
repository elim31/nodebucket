/**
 * Author: Prof Richard Krasso
 * Modified by: Eunice Lim
 * Date: 2 Sept 2021
 * Title: base-response.js
*/


class BaseResponse{
  constructor(code,msg,data){
    this.code=code;
    this.msg=msg;
    this.data=data
  }
  toObject(){  //return object literal with those fields
    return {
      'code': this.code,
      'msg': this.msg,
      'data': this.data,
      'timestamp': new Date().toLocaleDateString()
    }
  }
}

module.exports  = BaseResponse;
