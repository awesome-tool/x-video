## 自动卸载 <!-- {docsify-ignore-all} -->

这里插件对 `Single Page Application`很有用
如果你的 `video` 使用动态引入的资源，然后新的资源加载还需要一定的时间，你可以直接 `unload` 当前的 video
If your video dynamically changes with URL parameters and the new video source need to wait for a new API response. Then you could stop/unload current video by `playr.unload()`.

### 使用

```html inject keep
<script src="../dist/plugins/unload/index.js"></script>
```

<br />

> The video will unload when video time more than 5 seconds and a new video load after 2 seconds
> 这个视频会在5秒后卸载，在2s后切换新的播放资源
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

| 选项    | 值      | 默认  | 描述                 |
| ------- | ------- | ----- | -------------------- |
| loading | boolean | false | show loading spinner |
