
module.exports = {
  modules: [
    {
      name: '../common',
      include: [
        'jquery',
        'app/lib',
        'app/controller/Base',
        'app/model/Base',
        'https://cdn.bootcss.com/vue/2.5.17-beta.0/vue.min.js'
      ]
    },
    {
      name: '../page1',
      include: ['app/main1'],
      exclude: ['../common']
    },
    {
      name: '../page2',
      include: ['app/main2'],
      exclude: ['../common']
    },
    {
      name: '../page3',
      include: ['app/main3'],
      exclude: ['../common']
    },
  ]
}