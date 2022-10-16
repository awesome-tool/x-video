## FindChild <!-- {docsify-ignore-all} -->

A function that find player component. For Example, you want to insert a button before SettingMenuButton.
一个获取播放器组件的方法。比如你想往 `SettingMenuButton` 前插入一个 `button`。

> 使用 findChild

```js
const { parent, component, index } = player.findChild('SettingMenuButton')[0];
parent.addChild(new Button(player), {}, index);
```

> 没使用 findChild

```js
const ControlBar = player.getChild('ControlBar');
const index = ControlBar.children_.indexOf('SettingMenuButton');
ControlBar.addChild(new Button(player), {}, index);
```
