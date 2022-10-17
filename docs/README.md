## X Video <!-- {docsify-ignore-all} -->

<!-- [文档地址](https://awesome-tool.github.io/x-video/docs/) -->

### 安装

```bash
npm install x-video
# or
yarn add x-video
```

### 使用

- 引入文件

  ```html highlight=3,14,15,17
  <html>
    <head>
      <link rel="stylesheet" href="x-video.css" />
    </head>
    <body>
      <video
        id="example-video"
        class="vjs-fluid"
        poster="http://vjs.zencdn.net/v/oceans.png"
      >
        <source src="http://vjs.zencdn.net/v/oceans.mp4" />
      </video>
    </body>
    <script src="http://vjs.zencdn.net/7.4.1/video.js"></script>
    <script src="x-video.umd.js"></script>
    <script>
      const player = videojs('example-video');
    </script>
  </html>
  ```

- [React Hooks](https://codesandbox.io/s/71z2lm4ko6)

<br>

<br>

## License

See [Apache 2.0](LICENSE).
