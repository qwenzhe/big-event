//每次调用get post ajax请求之前会先调用ajaxPrefilter函数
//在这个函数中可以拿到我们给ajax提供的配置对象
//在发起真正的ajax请求之前会先拼接url
$.ajaxPrefilter(function(options){
    options.url = 'http://www.liulongbin.top:3007'+options.url
    //以my开头的url加上请求头
    if(options.url.indexOf('/my/')!==-1){
        options.headers = {
            Authorization:localStorage.getItem('token') || ''
        }
    ////没有权限直接访问index页面强制返回登录页面并清除token
    }
    options.complete = function(res){
        //没有权限直接访问index页面强制返回登录页面并清除token这里只进行演示，实际上代码挂载在baseAPI上
        if(res.responseJSON.status===1&&res.responseJSON.message==="身份认证失败！"){
            localStorage.removeItem('token')
            location.href = "/login.html"
        }
    }
    
})