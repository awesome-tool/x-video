## Electron 全屏切换 <!-- {docsify-ignore-all} -->

<br />

如果你的 `Electron` `webPreferences` 的 `nodeIntegration` 选项不为 `true` 。你应该创建一个`preload.js` 并分配一个函数 `getCurrentWindow` 给 `window`

```js file=preload.js
import { remote } from 'electron';
window.getCurrentWindow = remote.getCurrentWindow;
```
