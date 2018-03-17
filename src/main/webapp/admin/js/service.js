/**
 * Created by 平凡的世界 on 2017/3/3.
 */
$(function () {
    information(1,""); //默认传第一页，类型0全部，搜索空值
    //添加
    addServer();

});
//获取server
function information(index,text) { //index代表页码 val代表类型0 1 2 3 text代表搜索内容
    $("#messageMy").children().remove();
    var sendData = {
        "account": ReadCookie("account"),
        "code": ReadCookie("code"),
        "groupId":ReadCookie("groupId"),
        "keyword":text,//搜索关键字
        "pageSize":12,//每页显示12条
        "pageIndex":index,//第几页

    };
    $.ajax({
        url: "../server/selectServer",
        type: "post",
        dataType: "json",
        data: JSON.stringify(sendData),
        contentType: "application/json",
        success: function (json) {
            if (json.result == "success") {

                if(json.array.length==0){
                    var tr=$("<tr>"+
                        "<td colspan='4'>无消息数据</td>"+
                        "</tr>");
                    $("#messageMy").append(tr);
                }
                for(var i=0;i<json.array.length;i++){
                    var tr=$("<tr id='"+json.array[i].serverId+"'>"+
                        "<td>"+json.array[i].serverName+"</td>"+
                        "<td>"+json.array[i].serverTell+"</td>"+
                        "<td>"+json.array[i].serverAddress +"</td>"+
                        "<td>" +
                        "<a class='amend'>修改</a>" +
                        "<a class='delete'>删除</a>" +
                        "</td>"+
                        "</tr>");
                    $("#messageMy").append(tr);

                }

                $("#Pagination").css("display","table");
                $('#Pagination').pagination({
                    coping:true,
                    homePage:'首页',
                    endPage:'末页',
                    jump:true,
                    pageCount:json.totalPage,
                    callback:function(index){
                        informationPage(index.getCurrent(),text)
                    }
                });
                //删除
                expurgate();
                //修改
                amend();
                //搜索
                search();



            }else if(json.result == "wrong code"){
                alert("令牌错误，请重新登录",2);
                window.location.href ="login.html";
            }else if(json.result == "no attention)"){
                alert("没有关注",2);
            }
        },
        error: function () {
            alert("获取信息失败", 1);
        }
    });
}
//翻页
function informationPage(index,text) { //index代表页码 val代表类型0 1 2 3 text代表搜索内容
    $("#messageMy").children().remove();
    var sendData = {
        "account": ReadCookie("account"),
        "code": ReadCookie("code"),
        "groupId":ReadCookie("groupId"),
        "keyword":text,//搜索关键字
        "pageSize":12,//每页显示12条
        "pageIndex":index,//第几页
    };
    $.ajax({
        url: "../server/selectServer",
        type: "post",
        dataType: "json",
        data: JSON.stringify(sendData),
        contentType: "application/json",
        success: function (json) {
            if (json.result == "success") {

                if(json.array.length==0){
                    var tr=$("<tr>"+
                        "<td colspan='4'>无消息数据</td>"+
                        "</tr>");
                    $("#messageMy").append(tr);
                }
                for(var i=0;i<json.array.length;i++){
                    var tr=$("<tr id='"+json.array[i].serverId+"'>"+
                        "<td>"+json.array[i].serverName+"</td>"+
                        "<td>"+json.array[i].serverTell+"</td>"+
                        "<td>"+json.array[i].serverAddress +"</td>"+
                        "<td>" +
                        "<a class='amend'>修改</a>" +
                        "<a class='delete'>删除</a>" +
                        "</td>"+
                        "</tr>");
                    $("#messageMy").append(tr);

                }

                //删除
                expurgate();
                //修改
                amend();
                //搜索
                search();



            }else if(json.result == "wrong code"){
                alert("令牌错误，请重新登录",2);
                window.location.href ="login.html";
            }else if(json.result == "no attention)"){
                alert("没有关注",2);
            }
        },
        error: function () {
            alert("获取信息失败", 1);
        }
    });
}
//删除
function expurgate() {
    $("#messageMy a.delete").unbind("click").on("click",function(){
        if(confirm("确定要删除吗？")) {
            var sendData = {
                "serverId": $(this).parents().parents().attr("id"),
                "account": ReadCookie("account"),
                "code": ReadCookie("code"),
                "groupId":ReadCookie("groupId"),
            };
            $.ajax({
                url: "../server/deleteServer",
                type: "post",
                dataType: "json",
                contentType: "application/json",
                data: JSON.stringify(sendData),
                success: function (json) {
                    if (json.result == "success") {
                    	information("1","");
                    }
                },
                error: function () {
                    alert("数据加载出错", 1);
                }
            });
        };
    })
}
//修改
function amend(){
    $(".table a.amend").unbind("click").on("click",function(){
        var id=$(this).parent().parent().attr("id");
        $(".conNews").fadeIn();
        $(".bg").css("height",$(document).height()).fadeIn();
        $(".conNews ul li input").eq(0).val("");
        $(".conNews ul li input").eq(1).val("");
        $(".conNews ul li input").eq(2).val("");
        var sendData = {
            "serverId":id,
            "account": ReadCookie("account"),
            "code": ReadCookie("code"),
            "groupId":ReadCookie("groupId"),
        }
        $.ajax({
            url: "../server/getServer",
            type: "post",
            dataType: "json",
            contentType: "application/json",
            data: JSON.stringify(sendData),
            success:function(json){
                if(json.result == "success"){
                    $(".conNews ul li input").eq(0).val(json.serverName);
                    $(".conNews ul li input").eq(1).val(json.serverTell);
                    $(".conNews ul li input").eq(2).val(json.serverAddress);
                }
            }
        })

        //确定
        $(".btns3 a.sure3").unbind("click").on("click",function () {
            var server_name=$(".conNews ul li input").eq(0).val();
            var server_tell=$(".conNews ul li input").eq(1).val();
            var server_address=$(".conNews ul li input").eq(2).val();
            var sendData = {
                "serverName": server_name,
                "serverTell":server_tell,
                "serverAddress":server_address,
                "serverId":id,
                "account": ReadCookie("account"),
                "code": ReadCookie("code"),
                "groupId":ReadCookie("groupId"),

            }
            $.ajax({
                url: "../server/updateServer",
                type: "post",
                dataType: "json",
                contentType: "application/json",
                data: JSON.stringify(sendData),
                success:function(json){
                    if(json.result == "success"){
                        alert("修改成功");
                        $(".conNews").fadeOut();
                        $(".bg").fadeOut();
                        //调用初始化函数
                        information(1,"");
                        //初始化
                        $(".company_sign .head input").val("");
                    }
                }
            })
        });

        //取消
        $(".btns3 a.clooe3,.conNews .head i").unbind("click").on("click",function () {
            $(".conNews").fadeOut();
            $(".bg").fadeOut();
        });
    })
}
//搜索
function search() {
    //搜索
    $(".company_sign .head .search-btn").unbind("click").on("click",function () {
        var text=$(".company_sign .head input").val();
        information(1,text)
    });
    //回车查询
    $(".company_sign .head input").unbind("keypress").on("keypress",function (e) {
        var ev = document.all ? window.event : e;//兼容IE
        if (ev.keyCode == 13) {
            $(".company_sign .head .search-btn").trigger("click");
        }
    });
}
//添加
function addServer(){
    $(".addnews").unbind("click").on("click",function(){
        $(".conNews").fadeIn();
        $(".bg").css("height",$(document).height()).fadeIn();
        
        //清空前面操作留下的数据
        $(".conNews ul li input").eq(0).val("");
        $(".conNews ul li input").eq(1).val("");
        $(".conNews ul li input").eq(2).val("");

        //确定
        $(".btns3 a.sure3").unbind("click").on("click",function () {
            var server_name=$(".conNews ul li input").eq(0).val();
            var server_tell=$(".conNews ul li input").eq(1).val();
            var server_address=$(".conNews ul li input").eq(2).val();
            var sendData = {
                "serverName": server_name,
                "serverTell":server_tell,
                "serverAddress":server_address,
                "account": ReadCookie("account"),
                "code": ReadCookie("code"),
                "groupId":ReadCookie("groupId"),

            }
            $.ajax({
                url: "../server/addServer",
                type: "post",
                dataType: "json",
                contentType: "application/json",
                data: JSON.stringify(sendData),
                success:function(json){
                    if(json.result == "success"){
                        alert("添加成功");
                        $(".conNews").fadeOut();
                        $(".bg").fadeOut();
                        //调用初始化函数
                        information(1,"");
                        //初始化
                        $(".company_sign .head input").val("");
                    }
                }
            })
        });

        //取消
        $(".btns3 a.clooe3,.conNews .head i").unbind("click").on("click",function () {
            $(".conNews").fadeOut();
            $(".bg").fadeOut();
        });
    })
}

//取account code
function ReadCookie(cookieName) {
    var theCookie = "" + document.cookie;
    var ind = theCookie.indexOf(cookieName);
    if(ind==-1 || cookieName=="")  return "";
    var ind1 = theCookie.indexOf(';',ind);
    if(ind1==-1) ind1  =  theCookie.length;
    /*读取Cookie值*/
    return unescape(theCookie.substring(ind+cookieName.length+1,ind1));
}