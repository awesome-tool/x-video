## 分辨率 HLS <!-- {docsify-ignore-all} -->

一个可以通过直播播放流切换不同分辨率的插件

<!-- [Demo](https://github.com/awesome-tool/x-video/examples/quality-hls.html) -->

### 使用

使用之前需要手动安装 [videojs-contrib-quality-levels](https://github.com/videojs/videojs-contrib-quality-levels) 并引入

```html inject keep
<script src="https://cdn.jsdelivr.net/npm/videojs-contrib-quality-levels@2.0.9/dist/videojs-contrib-quality-levels.js"></script>
<script src="../dist/plugins/quality-hls/index.js"></script>
```

<br />

```html inject
<video id="example-video" class="vjs-fluid">
  <source
    src="https://bitdash-a.akamaihd.net/content/MI201109210084_1/m3u8s/f08e80da-bf1d-4e3d-8899-f0f6155f6efa.m3u8"
    type="application/x-mpegURL"
  />
</video>
```

```js run
const player = videojs('example-video', { muted: true });

player.one('loadedmetadata', function () {
  player.findChild('SettingMenuButton')[0].component.handleClick();
});
```

### 在 menu 中 设置语言

```js
const language = "en-us";

videojs("example-video". {
  language
})

videojs.addLanguage(language, {
  '1080p': 'Full HD'
  '720p': 'HD',
  // ..
});
```

or

```js
player.on('before-quality-setup', (_, { levels }) => {
  const labels = [
    'Full HD',
    'HD'
    // ...
  ];
  levels.forEach((level, index) => {
    level.label = labels[index];
  });
});
```

#### API and Event

```js
// get all quality levels, for more details refer to videojs-contrib-quality-levels
player.qualityLevels();

// fire when all HLS playlist added.
player.on('hls-quality', (event, qualityLevels) => {
  console.log('qualities setup', qualityLevels);
});

player.on('hls-qualitychange', (event, currentQuality) => {
  console.log('quality changed');
});
```
