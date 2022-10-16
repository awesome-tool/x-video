## 剧场模式 <!-- {docsify-ignore-all} -->

因为iOS原生全屏不能被覆盖，你可能想使用一个完整的窗口来代替。<br>
只需包括插件，然后全屏按钮将被全窗口按钮取代。

### 使用

Include the plugin js and css

```html inject keep
<link rel="stylesheet" href="../dist/plugins/full-window-toggle/style.css" />
<script src="../dist/plugins/full-window-toggle/index.js"></script>
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
  aspectRatio: '16:9'
});

player.on('fullscreenchange', function (event) {
  console.log('[fullscreenchange]', 'is fullscreen:', player.isFullscreen());
});
```
