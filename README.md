# FME Server plugin

FME Server plugin is used to download data using FME Server.
Send active layers, map extent, selected destinationformat and optional username to FME Server.

#### Example usage of FME Server plugin

**index.html:**
```html
    <head>
    	<meta charset="utf-8">
    	<meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=no">
    	<meta http-equiv="X-UA-Compatible" content="IE=Edge;chrome=1">
    	<title>Origo exempel</title>
    	<link href="css/style.css" rel="stylesheet">
    </head>
    <body>
    <div id="app-wrapper">
    </div>
    <script src="js/origo.js"></script>
    <script src="plugins/fme.js"></script>

    <script type="text/javascript">
      //Init origo
      var origo = Origo('index.json');
      origo.on('load', function (viewer) {
        var fme = fme({
          destinationFormat: ["ACAD", "GeoJSON", "GeoPackage"],
          title: 'Hämta data',
          url: 'https://........'
        });
        viewer.addComponent(fme);
      });
    </script>
```
**index.json:**
```json
{
  "name": "mywfs",
  "title": "My wfs",
  "group": "test",
  "source": "local_wfs",
  "style": "mask",
  "type": "WFS",
  "fme": true
}
```
## Settings
### FME Server settings (in html file)
Option | Type | Description
---|---|---
`destinationFormat` | array | FME format short name displayed in dropdown and sent to FME Server.
`title` | string | Modal header text. Default is "Hämta data".
`url` | string | URL to FME Server script.
`username` | boolean | Optional, used to add username key from localStorage to FME Server URL, default is false.
