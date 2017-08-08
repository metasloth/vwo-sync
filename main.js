const fs = require('fs')
const request = require('request')
const sass = require('node-sass')

let configPath
let config

// Check for the optional 'c' flag, which is followed by a path to the configuration file
// If the 'c' flag is not present, the first argument is assumed to be the configuration file
if (process.argv.indexOf('-c') > -1) {
  configPath = process.argv[process.argv.indexOf('-c') + 1]
} else {
  configPath = process.argv[2]
}
// Update relative paths to full file paths
// TODO: There's is definitely a cleaner way to let node handle files
if (configPath.substring(0, 1) === '.') {
  configPath = process.cwd() + configPath.substring(1)
}

// Verify the configuration file exists and 
if (fs.existsSync(configPath)) {
  config = require(configPath);
  if (process.argv.indexOf('-i') > -1) {
    showInfo()
  } else if (process.argv.indexOf('-s') > -1) {
    saveOnce()
  } else {
    startWatching()
  }
} else {
  console.log('Error! The provided configuration file:\n\t"' + configPath + '"\ncould not be found.')
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
      function(err, res, body) {
        if (err) {
          console.log('Could not update vwo variation!\n ', err)
        } else {
          console.log('Updated Variation ' + JSON.parse(body)._data.name.trim())
        }
      }
    )
  }
}

// Add watchers for all configured files
function startWatching() {
  console.log('Now watching files...')
  for (let i = 0; i < config.variations.length; ++i) {
    fs.watchFile(config.variations[i].js, { interval: 500 }, function() {
      saveVariation(i)
    })
    fs.watchFile(config.variations[i].css, { interval: 500 }, function() {
      saveVariation(i)
    })
    if (config.variations[i].other) {
      for (let j = 0; j < config.variations[i].other.length; ++j) {
        fs.watchFile(config.variations[i].other[j], { interval: 500 }, function() {
          saveVariation(i)
        })
      }
    }
  }
}

// Save the configured variations once, then exit
function saveOnce() {
  console.log('Saving Variations')
  for (let i = 0; i < config.variations.length; ++i) {
    saveVariation(i)
  }
}

// Log configured account and campaign information
// TODO: use promises to avoid callback hell
function showInfo() {
  let acctUrl = 'https://app.vwo.com/api/v2/accounts/' + config.vwoAccount
  request({
      method: 'GET',
      uri: acctUrl,
      headers: {
        'token': config.vwoToken
      },
    },
    function(err, res, body) {
      if (err) {
        console.log('Error! Could not get information from VWO\n ', err)
      } else {
        console.log('Account: ' + JSON.parse(body)._data.name.trim())
      }
    }
  )
  let campUrl = 'https://app.vwo.com/api/v2/accounts/' + config.vwoAccount + '/campaigns/' + config.vwoTest
  request({
      method: 'GET',
      uri: campUrl,
      headers: {
        'token': config.vwoToken
      },
    },
    function(err, res, body) {
      if (err) {
        console.log('Error! Could not get information from VWO\n ', err)
      } else if (body) {
        console.log('Campaign: ' + JSON.parse(body)._data.name.trim())
      }
    }
  )
}
