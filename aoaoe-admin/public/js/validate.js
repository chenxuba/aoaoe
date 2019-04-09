/** 这个文件只允许放表单验证方法 **/
 
//验证手机号
export default function isPhone(rule, value, callback) {
    if (!value) {
      return callback(new Error('输入不可以为空'));
    }
    var pattern = /^1[34578]\d{9}$/
    if(pattern.test(value)){
      return callback()
    }
    return callback(new Error('输入的手机号错误'))
  }