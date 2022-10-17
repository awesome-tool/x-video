## 直播模式 <!-- {docsify-ignore-all} -->

一个直播模式插件
### 使用

```html inject keep
<link rel="stylesheet" href="../dist/plugins/live/style.css" />
<script src="../dist/plugins/live/index.js"></script>
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
  muted: true
});

player.live();
```

### API

```js
// initialize
player.live();

// exit live mode
player.live().dispose();
```
