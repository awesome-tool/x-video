## 副标题 <!-- {docsify-ignore-all} -->

<!-- This plugin is a wrapper of [VideoJS TextTrack API](https://docs.videojs.com/docs/guides/text-tracks.html). -->
创建一个[菜单设置项](../features/setting-menu.md) 选择控制 <br>
目前, 只支持文本的副标题

### 使用

```html inject keep
<link rel="stylesheet" href="../dist/plugins/subtitles/style.css" />
<script src="../dist/plugins/subtitles/index.js"></script>
```

<br />

```html inject
<video
  id="example-video"
  class="vjs-fluid"
  poster="https://vjs.zencdn.net/v/oceans.png"
></video>
```

```js run
const subtitles = [
  {
    default: true, // highlight-line
    kind: 'subtitles',
    srclang: 'zh-TW',
    label: '中文（繁體）',
    src: 'assets/vtt/vtt_TC.txt'
  },
  {
    kind: 'subtitles',
    srclang: 'en-US',
    label: 'English',
    src: 'assets/vtt/vtt_EN.txt'
  }
];

const player = videojs('example-video', {
  subtitles // highlight-line
});

// or
// player.subtitles().load(subtitles); // highlight-line

player.findChild('SettingMenuButton')[0].component.handleClick();
```

#### API and Event

```js
// remove all subtitles
player.subtitles().remove();

// switch subtitle
player.subtitles().pick(2);

// close subtitle
player.subtitles().pick(-1);

// get current subtitles
player.subtitles().track;

// get all subtitles
player.subtitles().values();

// expect `values` and `track`, apis are chainable
player.subtitles().load(subtitles).pick(0);

player.on('subtitles', (event, subtitles) => {
  console.log('subtitles setup', subtitles);
});

player.on('subtitlechange', (event, subtitle) => {
  console.log('subtitles changed');
});
```

### 注意

- HLS In-Manifest WebVTT 副标题暂不支持
- 目前仅支持 `vtt` 文件，如果你想使用 `webvtt`,请点击这里[imshaikot/srt-webvtt](https://github.com/imshaikot/srt-webvtt)。

```js
import WebVTTConverter from 'srt-webvtt/index';

const getSubtitle = async () => {
  const srt_url = 'https://www.example.com/srt_file.srt';
  const response = await axios.get(url, {
    responseType: 'blob'
  });
  const vttURL = await new WebVTTConverter(response.data).getURL();

  return {
    default: true,
    kind: 'subtitles',
    srclang: 'zh-HK',
    label: '繁體中文',
    src: vttURL
  };
};
```
