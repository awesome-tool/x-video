## 标注 <!-- {docsify-ignore-all} -->

一个视频标注插件

### 使用

```html inject keep
<link rel="stylesheet" href="../dist/plugins/markers/style.css" />
<script src="../dist/plugins/markers/index.js"></script>
```

<br />

```html inject
<video
  id="example-video"
  class="vjs-fluid"
  poster="https://vjs.zencdn.net/v/oceans.png"
>
  <source src="https://vjs.zencdn.net/v/oceans.mp4" />
</video>
```

```js run
const player = videojs('example-video', {
  // markerOptions: {
  //   markers: [
  //     {
  //       time: 10,
  //       text:
  //         '123',
  //       overlayText:
  //         '123'
  //     }
  //   ]
  // }
});
player.markers.makers = [
  {
    time: 10,
    text: '123',
    overlayText: '123'
  }
];
player.markers.updateTime()
console.log(player.markers);
```

### API

```js
// initialize video.js
var player = videojs('video-id', {
  markerStyle: {
    width: '7px',
    'border-radius': '30%',
    'background-color': 'red'
  },
  markerTip: {
    display: true,
    text: function (marker) {
      return marker.text;
    },
    time: function (marker) {
      return marker.time;
    }
  },
  breakOverlay: {
    display: false,
    displayTime: 3,
    style: {
      width: '100%',
      height: '20%',
      'background-color': 'rgba(0,0,0,0.7)',
      color: 'white',
      'font-size': '17px'
    },
    text: function (marker) {
      return 'Break overlay: ' + marker.overlayText;
    }
  },
  markers: [
    {
      time: 9.5,
      text: 'marker',
      overlayText: 'overlay',
      class: 'custom-marker'
    }
  ]
});

//force update
player.markers.updateTime();

// next marker
player.markers.next();

// prev marker
player.markers.prev();

// delete markers array by index
player.markers.remove([1, 2]);

// delete all markers
player.markers.removeAll();

// add marker
player.markers.add([{ time: 40, text: "I'm added" }]);

// remove all marker and add marker
player.markers.reset([{ time: 23, text: "I'm reset" }]);

// destroy marker
player.markers.destroy();

// listen marker click
player.on('marker-click');

// listen marker reached
player.on('marker-reached');
```
