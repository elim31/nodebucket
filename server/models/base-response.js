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
