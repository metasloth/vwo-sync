import request from 'request'


class VWO {
  constructor(token){
    this.token = token
  }
  verifyToken(callback){
    request({
      method: 'GET',
      uri: 'https://app.vwo.com/api/v2/accounts',
      headers: {
        'token': this.token
      }
    }, function(err, res, body){
      if (err) {
        callback(false)
      } else if (JSON.parse(body)._data) {
        callback(true)
      } else {
        callback(false)
      }
    })
  }

  
}

export default VWO