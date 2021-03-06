const plugins = require('./plugins')
const nav = require('./config/nav')
const sidebar = require('./config/sidebar')
module.exports = {
  title: '南辰的博客',
  description: '你在凝望深渊的时候，深渊也在凝望你！！！',
  locales: {
    '/': {
      lang: 'zh-CN'
    }
  },
  head: [
    ['link', { rel: 'icon', href: '/favicon.ico' }],
    [
      'meta',
      {
        name: 'viewport',
        content: 'width=device-width,initial-scale=1,user-scalable=no'
      }
    ],
    ['meta', { name: 'author', content: '南辰' }],
    [
      'meta',
      {
        name: 'keywords',
        content:
          'html,css,vue,vue项目,个人博客,Vuepress,前端,JavaScript,HTML,Vue,web跨域,React,Nodejs,南辰的网站'
      }
    ],
    [
      'script',
      {},
      `var _hmt = _hmt || []
      ;(function () {
        var hm = document.createElement('script')
        hm.src = 'https://hm.baidu.com/hm.js?c1461b58ad9f5b7d36d29eab68e45f38'
        var s = document.getElementsByTagName('script')[0]
        s.parentNode.insertBefore(hm, s)
      })()`
    ]
  ],
  theme: 'reco',
  themeConfig: {
    type: 'blog',
    logo: '/img/logo.jpg',
    author: '南辰',
    authorAvatar: '/img/logo.jpg',
    lastUpdated: '最近更新时间',
    nav,
    sidebar,
    subSidebar: 'auto',
    noFoundPageByTencent: false,
    blogConfig: {
      category: {
        location: 6, // 在导航栏菜单中所占的位置，默认2
        text: '知识分类' // 默认文案 “分类”
      },
      tag: {
        location: 7, // 在导航栏菜单中所占的位置，默认3
        text: '分类标签' // 默认文案 “标签”
      },
      socialLinks: [
        // 信息栏展示社交信息
        { icon: 'reco-github', link: 'https://github.com/jxmchou' },
        { icon: 'reco-mayun', link: 'https://gitee.com/mchou' },
        {
          icon: 'reco-csdn',
          link: 'https://blog.csdn.net/jxmchou/article/details/121063363?spm=1001.2014.3001.5501'
        },
        { icon: 'reco-juejin', link: 'https://juejin.cn/' },
        {
          icon: 'reco-other',
          link: 'http://music.ychzx.top/',
          title: '网抑云音乐PC'
        }
      ]
    },
    // 备案
    record: '赣ICP备2021011762号',
    recordLink: 'https://beian.miit.gov.cn/',
    cyberSecurityRecord: '赣公网安备 36092302000144号',
    cyberSecurityLink:
      'http://www.beian.gov.cn/portal/registerSystemInfo?recordcode=36092302000144',
    // 项目开始时间，只填写年份
    startYear: '2022',
    search: true,
    searchMaxSuggestions: 10
  },
  markdown: {
    lineNumbers: true
  },
  plugins
}
