## 移动端 <!-- {docsify-ignore-all} -->

手机端样式通过 `class` `vjs-mobile-view` 控制。

<div style="margin: auto">
  <img style="float: left; max-width: 300px; width: 49%" src="./assets/screenshot/mobileui.control.png">
  <img style="float: left; max-width: 300px; width: 49%; margin-left: 2%" src="./assets/screenshot/mobileui.setting.png" width="300px">
</div>

### 禁用手机视图

```js
const player = videojs("example-video", {
  // ...
  mobileView: false; // highlight-line
})
```
