/**
 * Welcome to your Workbox-powered service worker!
 *
 * You'll need to register this file in your web app and you should
 * disable HTTP caching for this file too.
 * See https://goo.gl/nhQhGp
 *
 * The rest of the code is auto-generated. Please don't update this file
 * directly; instead, make changes to your Workbox build configuration
 * and re-run your build process.
 * See https://goo.gl/2aRDsh
 */

importScripts("https://storage.googleapis.com/workbox-cdn/releases/4.3.1/workbox-sw.js");

self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});

/**
 * The workboxSW.precacheAndRoute() method efficiently caches and responds to
 * requests for URLs in the manifest.
 * See https://goo.gl/S9QRab
 */
self.__precacheManifest = [
  {
    "url": "404.html",
    "revision": "5557e3e6fe6dc4657b286920799d9e8c"
  },
  {
    "url": "assets/css/0.styles.9fcf92e8.css",
    "revision": "d06ca7303ea240ecd40e63681a7377e0"
  },
  {
    "url": "assets/fonts/iconfont.938fa69e.woff",
    "revision": "938fa69ea89bccb0f20d643cc5f07cbe"
  },
  {
    "url": "assets/fonts/iconfont.ecabaf00.ttf",
    "revision": "ecabaf00c2c5be9907d524bb21a0f0dc"
  },
  {
    "url": "assets/img/bg.2cfdbb33.svg",
    "revision": "2cfdbb338a1d44d700b493d7ecbe65d3"
  },
  {
    "url": "assets/img/iconfont.117d8006.svg",
    "revision": "117d8006a3c478fbc8c4ce04a36ddb5a"
  },
  {
    "url": "assets/js/1.fafbc9e9.js",
    "revision": "fbde40e0093570a4d6352e4826c1ba0d"
  },
  {
    "url": "assets/js/10.f71dc6cc.js",
    "revision": "f846c57cd0c6af84377ad62769111d74"
  },
  {
    "url": "assets/js/11.d368ea56.js",
    "revision": "6e8c54029e17fcf5adf45a20e06a543d"
  },
  {
    "url": "assets/js/12.5fb5604f.js",
    "revision": "a20009c0f187e5fc19d2bd21ae54f276"
  },
  {
    "url": "assets/js/13.1a70b68e.js",
    "revision": "d8d01f792d858c9f7cf585eb3bf08179"
  },
  {
    "url": "assets/js/14.b15fd939.js",
    "revision": "63e1a728e57371dbfa65941a914965f3"
  },
  {
    "url": "assets/js/15.466f52c1.js",
    "revision": "995da39f32d68d05af94aef839ba8c9d"
  },
  {
    "url": "assets/js/16.bbec4bcc.js",
    "revision": "fcc8e6aa741a9eae528dba2c4645da8b"
  },
  {
    "url": "assets/js/17.76f3a688.js",
    "revision": "81086340b6f972ddc219fca5c201cc72"
  },
  {
    "url": "assets/js/18.9aa164f6.js",
    "revision": "4e1b1ba4475d027bfc1942d8c2d21d42"
  },
  {
    "url": "assets/js/19.5690245b.js",
    "revision": "370ed68bc87afd9d3bfc0e3ee28a5083"
  },
  {
    "url": "assets/js/20.f7d45744.js",
    "revision": "ef2a98d8d0d731c7ad3b7cc8e929ea44"
  },
  {
    "url": "assets/js/21.ec5d66b7.js",
    "revision": "13980c8561f1f839d46b735984b4a84a"
  },
  {
    "url": "assets/js/22.9caed5e3.js",
    "revision": "4070c64c569a19de30d72fd33a333739"
  },
  {
    "url": "assets/js/4.0c37487e.js",
    "revision": "983ea688209ce898e09ca28903ff7a9f"
  },
  {
    "url": "assets/js/5.03b35608.js",
    "revision": "e06900bb11d09aba9fadf1a3618678c7"
  },
  {
    "url": "assets/js/6.4a19ab7f.js",
    "revision": "90cda22491725ccf87e6dc360b493c39"
  },
  {
    "url": "assets/js/7.06117567.js",
    "revision": "ad1a7264c58952a1ed6ce9419fc73123"
  },
  {
    "url": "assets/js/8.f0faa82b.js",
    "revision": "21c3831e7af07a3d8e7c1c570d876f6b"
  },
  {
    "url": "assets/js/9.9e395943.js",
    "revision": "02c789bf3575d53fa3667e77680db4ae"
  },
  {
    "url": "assets/js/app.7b35a7df.js",
    "revision": "ce8e55b10efaab612a2275af53223eae"
  },
  {
    "url": "assets/js/vendors~flowchart.bc160dcb.js",
    "revision": "eede879e60a564a66e03be4bf1074644"
  },
  {
    "url": "categories/H5C3/index.html",
    "revision": "17c890dad5bf0bbfe7e8dbcbbf1cfe87"
  },
  {
    "url": "categories/index.html",
    "revision": "e8c8008d8a2c962ef1d8e0d41d6f5a53"
  },
  {
    "url": "categories/移动端/index.html",
    "revision": "0b36718a34fba452d8bfe082eb1d71f4"
  },
  {
    "url": "css/prism.css",
    "revision": "3d60520171cd0e8a335167fefd65d6da"
  },
  {
    "url": "html/css.html",
    "revision": "564cc9d9508168b8bd75fb4e7aafc64f"
  },
  {
    "url": "html/css2.html",
    "revision": "ba2cac10c4e2d4e6927158ae4077d8b9"
  },
  {
    "url": "html/details.html",
    "revision": "3f189b750720d1c502ad889b4c2c94e6"
  },
  {
    "url": "html/h5c3.html",
    "revision": "45b76d3d66e47fbb3295fffeaf078a8d"
  },
  {
    "url": "html/html.html",
    "revision": "a490f24abee66d7a3b848e6dae3c6177"
  },
  {
    "url": "html/mobile.html",
    "revision": "30022d4348062dfac6d3ca8f90ec3599"
  },
  {
    "url": "img/logo.jpg",
    "revision": "feb72011800f10ab6f2069ada4b99fb5"
  },
  {
    "url": "index.html",
    "revision": "379528ddc64e9f44c6772ac8a25ced04"
  },
  {
    "url": "js/baidu.js",
    "revision": "02076d8703fad23c5420211c47d7a82e"
  },
  {
    "url": "js/index.html",
    "revision": "e64d785f089423073455d42653ef10e9"
  },
  {
    "url": "js/j1.html",
    "revision": "7327548d6ad8a956515de8ee2b052fea"
  },
  {
    "url": "js/j2.html",
    "revision": "f7c773975a5b4fee8ea4825ad89c50a2"
  },
  {
    "url": "js/prism.js",
    "revision": "25f3c0f49d7ea5470bea843fdf653e30"
  },
  {
    "url": "tag/css/index.html",
    "revision": "357e71a479b568c0acc267f8df411112"
  },
  {
    "url": "tag/h5/index.html",
    "revision": "abbe760db62bd4b4528be726c1538aa0"
  },
  {
    "url": "tag/h5c3新特性/index.html",
    "revision": "158e6c06978edc12febe2b97b53d732b"
  },
  {
    "url": "tag/html/index.html",
    "revision": "747e408766f4f566c9c99156f3ac4c78"
  },
  {
    "url": "tag/html细节/index.html",
    "revision": "ff89170a62e306f1e183824e4ef06e5d"
  },
  {
    "url": "tag/index.html",
    "revision": "8aceac710dcc06ffed1f37ab3eb4b332"
  },
  {
    "url": "timeline/index.html",
    "revision": "5017416090371e9da98c55d4562846cf"
  }
].concat(self.__precacheManifest || []);
workbox.precaching.precacheAndRoute(self.__precacheManifest, {});
addEventListener('message', event => {
  const replyPort = event.ports[0]
  const message = event.data
  if (replyPort && message && message.type === 'skip-waiting') {
    event.waitUntil(
      self.skipWaiting().then(
        () => replyPort.postMessage({ error: null }),
        error => replyPort.postMessage({ error })
      )
    )
  }
})
