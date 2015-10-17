var util = require('util');
var request = require('request');
var nconf = require('nconf');

function writeDefaultSettings()
{
  console.log('Write default configuration ...')

  nconf.set('accessToken',  '');
  nconf.set('widgetId',     '')
  nconf.set('url',          'https://developer.lametric.com/api/V1/dev/widget/update/');

  nconf.save(function (err) {
    if (err) {
      console.log('There has been an error saving your configuration data.');
      console.log(err.message);
      return;
    }
    console.log('Configuration saved successfully.')
  });
}

function emitMessageToLeMatric(frames)
{
  var headers = {
      'Accept': 'application/json',
      'X-Access-Token': nconf.get('accessToken'),
      'Cache-Control': 'no-cache' };

  var postURL  = nconf.get('url') + nconf.get('widgetId');
  var postData = JSON.stringify(frames);

  var options = {
    method: 'POST',
    url: postURL,
    headers: headers,
    body: postData
  };

  // Start the request
  request(options, function (error, response, body) {
    if (!error && response.statusCode == 200) {
      console.log(response.statusCode, body);
    } else {
      console.log(error);
    }
  });
}

module.exports = {
  /**
   * Push LaMetric Frames and update it's content
   *
   * @param  {Json} frames
   */
  pushFrames: function(frames) {
    return emitMessageToLeMatric(frames);
  }
};

var main = function() {
  console.log("Update LaMetric Text ...");

  nconf.use('file', { file: './lametric-config.json' });
  nconf.load();

  if (nconf.get('url') === undefined)
  {
    writeDefaultSettings();
  } else {

    var frames = {
        "frames": [
            {
                "index": 0,
                "text": " News ",
                "icon": "i1166"
            },
            {
                "index": 1,
                "text": "1# A chess-set you wear in a ring",
                "icon": null
            },
            {
                "index": 2,
                "text": "2# Gerichtsurteil: Google darf Bücher durchsuchen",
                "icon": null
            },
            {
                "index": 3,
                "text": "3# Safe Harbor: Drei Monate Galgenfrist für neue Regelung",
                "icon": null
            },
            {
                "index": 4,
                "text": "4# test sadf asdf",
                "icon": null
            },
            {
                "index": 5,
                "text": "",
                "icon": null
            }
        ]
    };

    emitMessageToLeMatric(frames);
  }
}

if (require.main === module) {
    main();
}


