## 音频 <!-- {docsify-ignore-all} -->

多音轨 `HLS streaming` 插件

### 使用

只需引入插件，然后音频菜单项将自动显示。

### 在 `menu` 中改变默认 `label`

默认 `label` 是 `HLS streaming` 清单中定义的 `label`，您可以自定义。

你也可以使用 [VideoJS 语言设置](https://docs.videojs.com/docs/guides/languages.html) 替换默认的 `label`

```js
const language = "en-us";
videojs("example-video". {
  language
  // ..other options
})
videojs.addLanguage(language, {
  "Audio 1": "Dubbing",
  "Audio 2": "Original",
});
```

or

```js
player.on('before-audio-setup', (event, audios) => {
  audios[0].label = 'Dubbing';
  audios[1].label = 'Original';
});
```

#### API and Event

```js
// switch audio
player.audio().pick(1);

// get current audio track
player.audio().track;

// get all audio track
player.audio().values();

// events
player.on('audio', audios => {
  console.log('audio setup', audio);
});

player.on('audio-change', audio => {
  console.log('audio changed');
});
```
