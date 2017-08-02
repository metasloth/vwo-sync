const fs = require('fs')
const request = require('request')
const sass = require('node-sass')
const config = require('./config.json')

// Retrieve saved file information and send to VWO
function saveVariation(index) {
  let url = 'https://app.vwo.com/api/v2/accounts/' + config.vwoAccount + '/campaigns/' + config.vwoTest + '/variations/' + config.variations[index].variation
  let js = fs.readFileSync(config.variations[index].js, 'utf8')
  let css = sass.renderSync({file: config.variations[index].css, outputStyle: 'nested'});
  if (js && css) {
    var reqBody = {
      'variations': {
        'changes': '<script>' + js + '</script><style>' + css.css + '</style>'
      }
    }
    request({
        method: 'PATCH',
        uri: url,
        headers: {
          'token': config.vwoToken
        },
        body: JSON.stringify(reqBody)
      },
      function(err, res, body) {
        if (err) {
          console.log('Could not update vwo variation!\n ', err)
        } else {
          console.log('Updated Variation "', JSON.parse(body)._data.name, '"')
        }
      }
    )
  }
}

// Add watchers for all configured files
for (let i = 0; i < config.variations.length; ++i) {
  fs.watchFile(config.variations[i].js, { interval: 500 }, function() {
    saveVariation(i)
  })
  fs.watchFile(config.variations[i].css, { interval: 500 }, function() {
    saveVariation(i)
  })
  if (config.variations[i].other.length){
    for (let j=0; j < config.variations[i].other.length; ++j){
      fs.watchFile(config.variations[i].other[j], { interval: 500 }, function() {
        saveVariation(i)
      })
    }
  }
}
