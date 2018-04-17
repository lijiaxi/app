define(function(require) {
  var $ = require('jquery');
  var Vue = require('vue');
  var filter = require('./filter/index');
  var _ = require('lodash')
  $(document).ready(function(){
    for(var k in filter){
      Vue.filter(k , filter[k])
    }
    var vm = new Vue({
      el: "#app",
      data:{
        lists: [
          {
            id: 1,
            name: 'ljx',
            age: 50
          },
          {
            id: 2,
            name: 'jack',
            age: 20
          },
          {
            id: 3,
            name: 'lee',
            age: 30
          },
        ]
      },
      created(){
        var s = _.filter(this.lists, function(item){
          return item.age == 20
       })
       console.log(s);
      }
    })
  })
})