module.exports = [
  [
    '@vuepress/last-updated',
    {
      transformer: (timestamp) => {
        // 不要忘了安装 moment
        const moment = require('moment')
        moment.locale('zh-cn')
        return moment(timestamp).format('LLLL')
      }
    }
  ],
  //#region
  /* [
    '@vuepress-reco/vuepress-plugin-kan-ban-niang',
    {
      theme: [
        'blackCat',
        'whiteCat',
        'haru1',
        'haru2',
        'haruto',
        'koharu',
        'izumi',
        'shizuku',
        'wanko',
        'miku',
        'z16'
      ],
      clean: false,
      messages: {
        welcome: '我是lookroot欢迎你的关注 ',
        home: '心里的花，我想要带你回家。',
        theme: '好吧，希望你能喜欢我的其他小伙伴。',
        close: '再见哦'
      },
      width: 240,
      height: 352
    }
  ], */
  //#endregion
  [
    'ribbon',
    {
      size: 90, // width of the ribbon, default: 90
      opacity: 0.1, // opacity of the ribbon, default: 0.3
      zIndex: -1 // z-index property of the background, default: -1
    }
  ],
  [
    'cursor-effects',
    {
      size: 3, // size of the particle, default: 2
      shape: ['circle'], // shape of the particle, default: 'star'
      zIndex: 999999999 // z-index property of the canvas, default: 999999999
    }
  ],
  [
    //动态标题
    'dynamic-title',
    {
      showIcon: '/favicon.ico',
      showText: '(/≧▽≦/)咦！又好了！',
      hideIcon: '/failure.ico',
      hideText: '(●—●)喔哟，崩溃啦！',
      recoverTime: 2000
    }
  ],
  [
    //图片放大插件
    '@vuepressplugin-medium-zoom',
    {
      selector: '.page img',
      delay: 1200,
      options: {
        margin: 24,
        background: 'rgba(25,18,25,0.9)',
        scrollOffset: 40
      }
    }
  ],
  [
    //插件广场的流程图插件 先安装在配置 yarn add vuepress-plugin-flowchart
    'flowchart'
  ],
  [
    //vuepress插件PWA 先安装在配置 yarn add -D @vuepress/plugin-pwa
    '@vuepress/plugin-pwa',
    {
      serviceWorker: true,
      updatePopup: {
        message: '发现新内容可用',
        buttonText: '刷新'
      }
    }
  ],
  [
    //vuepress复制粘贴提示插件P 先安装在配置 yarn add vuepress-plugin-nuggets-style-copy
    'vuepress-plugin-nuggets-style-copy',
    {
      copyText: '复制代码',
      tip: {
        content: '复制成功!'
      }
    }
  ]
]
