$(function(){
    getUserInfo()
    var layer = layui.layer 
    $('#btnLogout').on('click',function(){
        //弹出是否退出的提示框
        layer.confirm('确定退出登录？',{icon:3,title:'提示'},function(index){
            localStorage.removeItem('token')
            location.href = '/login.html'
            layer.close(index)
        })
    })
})
function getUserInfo(){
    $.ajax({
        method:'GET',
        url:'/my/userinfo',
        // 这里只进行演示，实际上代码挂载在baseAPI上
        // headers:{
        //     Authorization:localStorage.getItem('token') || ''
        // },
        success:function(res){
            if(res.status!==0){
            return layui.layer.msg('获取用户信息失败')
            }
             renderAvater(res.data)
        },
        // complete:function(res){
            //没有权限直接访问index页面强制返回登录页面并清除token这里只进行演示，实际上代码挂载在baseAPI上
        //     if(res.responseJSON.status===1&&res.responseJSON.message==="身份认证失败！"){
        //         localStorage.removeItem('token')
        //         location.href = "/login.html"
        //     }
        // }

    })
}
//渲染用户头像
function renderAvater(user){
    var name = user.username || user.nickname
    $("#welcome").html('欢迎&nbsp;&nbsp'+name)
    if(user.user_pic !== null){
        $(".layui-nav-img").attr("src",user.user_pic).show()
        $(".text-avatar").hide()
    }else{
        $(".layui-nav-img").hide()
        // 获取username第一个字母并转化为大写
        var first = name[0].toUpperCase()
        $(".text-avatar").html(first).show()
    }
}