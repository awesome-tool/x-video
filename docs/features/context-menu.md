## 右键菜单 <!-- {docsify-ignore-all} -->

> 添加一个右键菜单的示例

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
const ContextMenuItem = videojs.getComponent('ContextMenuItem'); // highlight-line

class ContextMenuToggleLoop extends ContextMenuItem {
  constructor(player) {
    super(player, {
      name: 'ContextMenuToggleLoop',
      label: 'Loop',
      icon: 'vjs-icon-loop'
    });

    this.addClass('vjs-checkbox');

    player.on('loadstart', this.update.bind(this));
  }

  update() {
    this.selected(this.player_.loop());
  }

  handleClick() {
    super.handleClick();

    this.player_.loop(!this.player_.loop());

    this.update();
  }
}

videojs.registerComponent('ContextMenuToggleLoop', ContextMenuToggleLoop);
```
