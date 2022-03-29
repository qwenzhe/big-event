//每次调用get post ajax请求之前会先调用ajaxPrefilter函数
//在这个函数中可以拿到我们给ajax提供的配置对象
//在发起真正的ajax请求之前会先拼接url
$.ajaxPrefilter(function(options){
options.url = 'http://www.liulongbin.top:3007'+options.url
})