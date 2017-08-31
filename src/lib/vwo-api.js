import request from 'request'

const baseUrl = 'https://app.vwo.com/api/v2'

class VWO {
  constructor(token){
    this.token = token
    this.verifyToken = verifyToken
    this.getAccounts = getAccounts
  }
}

// Returns true/false validity of VWO token
function verifyToken(callback){
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

// Returns all Accounts
function getAccounts (){
  let promise = new Promise((resolve, reject) => {
    request({
      method: 'GET',
      uri: baseUrl + '/accounts',
      headers: {'token': this.token}
    }, function(err, res, body){
      if (err) {
        reject('Could not connect to VWO API')
        //TODO: add handler for rejecected response
      } else if (JSON.parse(body)._data) {
        resolve(JSON.parse(body)._data)
      }
    })
  })
  return promise
}

// Returns all Campaigns
function getCampaigns (id){
  let promise = new Promise((resolve, reject) => {
    request({
      method: 'GET',
      uri: baseUrl + '/accounts/' + id + '/campaigns',
      headers: {'token': this.token}
    }, function(err, res, body){
      if (err) {
        reject('Could not connect to VWO API')
        //TODO: add handler for rejecected response
      } else if (JSON.parse(body)._data) {
        resolve(JSON.parse(body)._data)
      }
    })
  })
  return promise
}

export default VWO