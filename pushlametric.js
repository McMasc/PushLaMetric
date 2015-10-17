var util = require('util');
var request = require('request');
var nconf = require('nconf');

function writeDefaultSettings()
{
  console.log('Write default configuration ...')

  nconf.set('accessToken',  '');
  nconf.set('widgetId',     '')

  nconf.save(function (err) {
    if (err) {
      console.log('There has been an error saving your configuration data.');
      console.log(err.message);
      return;
    }
    console.log('Configuration saved successfully.')
  });
}

function emitMessageToLeMatric(frames, accessToken, widgetId, callback)
{
  var headers = {
      'Accept': 'application/json',
      'X-Access-Token': accessToken,
      'Cache-Control': 'no-cache' };

  var postURL  = 'https://developer.lametric.com/api/V1/dev/widget/update/' + widgetId;
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
      callback(response.statusCode);
    } else {
      callback(response.statusCode);
    }
  });
}

module.exports = {
  /**
   * Push LaMetric Frames and update it's content
   *
   * @param  {Json} frames
   * @param  {String} Access Token (Baes64)
   * @param  {String} WidgetID
   * @param  {Function} callback
   */
  pushFrames: function(frames, accessToken, widgetId, callback) {
    return emitMessageToLeMatric(frames, accessToken, widgetId, callback);
  };
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
                "text": " Test Message ",
                "icon": null
            }
        ]
    };
    emitMessageToLeMatric(frames, nconf.get('accessToken'), nconf.get('widgetId'));
  }
}

if (require.main === module) {
    main();
}


