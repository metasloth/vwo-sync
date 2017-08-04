const fs = require('fs')
const request = require('request')
const sass = require('node-sass')
//const config = require('./config.json')
//const config = require('../dev/bap-mob-home2/vwo.config.json')

// Check configuration file
let configPath
let config

if (process.argv.indexOf('-c') > -1) {
  configPath = process.argv[process.argv.indexOf('-c') + 1]
} else {
  configPath = process.argv[2]
}

if (configPath.substring(0, 1) === '.') {
  configPath = process.cwd() + configPath.substring(1)
}

console.log('Verifying Configuration File' + configPath);

if (fs.existsSync(configPath)) {
  config = require(configPath);
  if (process.argv.indexOf('-i') > -1) {
    showInfo()
  }
  if (process.argv.indexOf('-s') > -1) {
    saveOnce()
  } else {
    startWatching()
  }
}


// Retrieve saved file information and send to VWO
function saveVariation(index) {
  let url = 'https://app.vwo.com/api/v2/accounts/' + config.vwoAccount + '/campaigns/' + config.vwoTest + '/variations/' + config.variations[index].variation
  let js = fs.readFileSync(config.variations[index].js, 'utf8')
  let css = sass.renderSync({ file: config.variations[index].css, outputStyle: 'nested' });
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
      function (err, res, body) {
        if (err) {
          console.log('Could not update vwo variation!\n ', err)
        } else {
          console.log('Updated Variation "', JSON.parse(body)._data.name.trim(), '"')
        }
      }
    )
  }
}

function startWatching() {
  // Add watchers for all configured files
  for (let i = 0; i < config.variations.length; ++i) {
    fs.watchFile(config.variations[i].js, { interval: 500 }, function () {
      saveVariation(i)
    })
    fs.watchFile(config.variations[i].css, { interval: 500 }, function () {
      saveVariation(i)
    })
    if (config.variations[i].other) {
      for (let j = 0; j < config.variations[i].other.length; ++j) {
        fs.watchFile(config.variations[i].other[j], { interval: 500 }, function () {
          saveVariation(i)
        })
      }
    }
  }
}

function saveOnce() {
  console.log('Saving Variations')
  for (let i = 0; i < config.variations.length; ++i) {
    saveVariation(i)
  }
}

function showInfo() {
  console.log('Checking Files');

}