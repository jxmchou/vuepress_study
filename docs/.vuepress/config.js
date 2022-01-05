module.exports = {
  title: 'MC猴的网站',
  description: 'MC猴的网站,MC猴的博客，MC猴的笔记',
  head: [
    ['link', { rel: 'icon', href: '/favicon.ico' }],
    ['meta', { name: 'author', content: 'MC猴' }],
    ['meta', { name: 'keywords', content: 'html,css,vue,vue项目,MC猴的网站' }]
  ],
  // 根路径对应为public
  themeConfig: {
    logo: '/assets/img/logo.jpg',
    lastUpdated: 'Last Updated',
    nav: [
      { text: 'HTML', link: '/html/html' },
      { text: 'JS', link: '/js/' },
      { text: 'AJAX', link: '/ajax/' },
      { text: 'VUE', link: '/vue/' },
      {
        text: 'VUE项目',
        items: [
          { text: '网抑云音乐PC', link: 'http://music.ychzx.top' },
          { text: '尚硅谷前台购物项目', link: 'http://shop.ychzx.top' },
          { text: '黑马后台电商管理项目', link: 'http://admin.ychzx.top' }
        ]
      }
    ],
    sidebar: {
      '/html/': ['html', 'css', 'css2', 'h5c3', 'mobile', 'details'],
      '/js/': ['j1', 'j2'],
    }
  },
  markdown: {
    lineNumbers: true
  }
}
