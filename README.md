# PushLaMetric
Very simple node.js module to push frames to a LaMetric led device.

# LaMetric
LaMetric is a nice LED device which is successfully founded on Kickstarter. 
With a smartphone you could install new apps on the device. 
A app on LaMetric is basicly a canvas to display icon and the text on the device. A app could be configured either pull it's data from a http server or a server could push data via http post to the device.

On https://developer.lametric.com/ you can create free apps which could be private or public.

# Frames
One "app" could have several frames with different styles. Each frame will be displayed some time and then it will go to the next frame.
This module could be used to push frames to a specific app with the widget id provided on https://developer.lametric.com/

Frames are defined as json:

    "frames": [
        {
            "index": 0,
            "text": " Test Message ",
            "icon": null
        }
        ...
    ]
    
On https://developer.lametric.com/ is a editor which let you create the different frames style:
  - Icon and Text
  - Metric: Arrow (up or down) and a value
  - Goal: value counter
  - Sparkline: A line chart 

# How to create a app
Go to https://developer.lametric.com/ create and publish a app with a demo text and icon.
It sould have the right amount of frames which you need. 

I have tested this module only with private apps.

Then install this LaMetric app with the SmartPhone (Section Private). 

# Get Module
npm install https://github.com/McMasc/PushLaMetric.git --save

# Push a Frame
    var pushlametric = require("pushlametric");

    var frames = {
        "frames": [
            {
                "index": 0,
                "text": " Test Message ",
                "icon": null
            }
        ]
    };
    
    // both could be found on your app page (https://developer.lametric.com/)
    var accessToken = "AABB ... =="; // a base64 encoded id ends with ==
    var widgetID = "com.lametric. id"; // basicly a URL of the Widget (app) without https://developer.lametric.com/api/V1/dev/widget/update/
    pushlametric.pushFrames(frames, accessToken, widgetID, function(httpstate) { 
          if (httpstate == 200) { 
            console.log("message send");
          } else {
            console.log("error"); 
          }
    });
