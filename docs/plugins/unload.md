## 自动卸载 <!-- {docsify-ignore-all} -->

这里插件对 `Single Page Application`很有用
如果你的 `video` 使用动态引入的资源，然后新的资源加载还需要一定的时间，你可以直接通过`playr.unload()` 卸载当前的播放器

### 使用

```html inject keep
<script src="../dist/plugins/unload/index.js"></script>
```

<br />

> 这个视频会在 5 秒后卸载，在 2s 后切换新的播放资源

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
  aspectRatio: '16:9',
  muted: true,
  autoplay: true
});

player.on('timeupdate', function unload() {
  if (player.currentTime() > 5) {
    player.off('timeupdate', unload);
    player.unload({ loading: true }); // highlight-line

    setTimeout(function () {
      player.src({
        poster: '',
        src:
          'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
        type: 'video/mp4'
      });
    }, 2000);
  }
});
```

#### 选项

| 选项    | 值      | 默认值 | 描述                 |
| ------- | ------- | ------ | -------------------- |
| loading | boolean | false  | 展示 loading 加载 UI |
