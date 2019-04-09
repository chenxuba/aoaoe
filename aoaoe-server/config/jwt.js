var jwt = require('jsonwebtoken');

module.exports = function(token, callback) {
    if (token) {
        // 解码 token (验证 secret 和检查有效期（exp）)
        jwt.verify(token, "chenruisheng", function (err, decoded) {
          // console.log(err)
          if (err) {
            return callback(false);
          }
          else {
              callback(true);
          }
        });
      } else {
        // 没有拿到token 返回错误 
        return callback(false);
      }
}