/**
 * Created by 平凡的世界 on 2017/3/30.
 */
/**
 * Created by 平凡的世界 on 2017/3/2.
 *
 */
$(function (){
    $(".selectAdmin").find("option").not($(".selectAdmin option:first-child")).each(function () {
        $(this).remove();
    })
    var sendData = {
        "account": ReadCookie("account"),
        "code": ReadCookie("code"),
        "groupId":ReadCookie("groupId"),

    };
    $.ajax({
        url: "../",
        type: "post",
        dataType: "json",
        data: JSON.stringify(sendData),
        contentType: "application/json",
        success: function (json) {
            if (json.result == "success") {

                for(var i=0;i<json.array.length;i++){
                    var option=$("<option id='"+json.array[i].newsId+"'>"+json.array[i].newsId +"</option>");
                    $(".selectAdmin").append(option);
                }
                information(1,'','',"");

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


});
//获取新闻
function information(index,val,state,text) { //index代表页码 val代表类型0 1 2 3 text代表搜索内容
    $("table tbody").children().remove();
    var sendData = {
        "account": ReadCookie("account"),
        "code": ReadCookie("code"),
        "groupId":ReadCookie("groupId"),
        "keyword":text,//搜索关键字
        "pageSize":20,//每页显示12条
        "pageIndex":index,//第几页
        "newsTypeId":val,//管理员
        "status":state//功能

    };
    $.ajax({
        url: "../",
        type: "post",
        dataType: "json",
        data: JSON.stringify(sendData),
        contentType: "application/json",
        success: function (json) {
            if (json.result == "success") {

                if(json.array.length==0){
                    var tr=$("<tr>"+
                        "<td colspan='5'>无消息数据</td>"+
                        "</tr>");
                    $("table tbody").append(tr);
                }
                for(var i=0;i<json.array.length;i++){
                    var tr=$("<tr id='"+json.array[i].newsId+"'>"+
                        "<td>"+json.array[i].oder+"</td>"+
                        "<td>"+json.array[i].adminName+"</td>"+
                        "<td>"+json.array[i].adminContent +"</td>"+
                        "<td>"+json.array[i].adminTime+"</td>"+
                        "</tr>");
                    $("table tbody").append(tr);
                }

                $("#Pagination").css("display","table");
                $('#Pagination').pagination({
                    coping:true,
                    homePage:'首页',
                    endPage:'末页',
                    jump:true,
                    pageCount:json.totalPage,
                    callback:function(index){
                        informationPage(index.getCurrent(),val,state,text)
                    }
                });
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
function informationPage(index,val,state,text) { //index代表页码 val代表类型0 1 2 3 text代表搜索内容
    $("table tbody").children().remove();
    var sendData = {
        "account": ReadCookie("account"),
        "code": ReadCookie("code"),
        "groupId":ReadCookie("groupId"),
        "newsTypeId":val,//类型 0 1 2 3
        "keyword":text,//搜索关键字
        "pageSize":20,//每页显示12条
        "pageIndex":index,//第几页
        "status":state//状态 0全部 1已发布 2未发布

    };
    $.ajax({
        url: "../news/selectNews",
        type: "post",
        dataType: "json",
        data: JSON.stringify(sendData),
        contentType: "application/json",
        success: function (json) {
            if (json.result == "success") {

                if(json.array.length==0){
                    var tr=$("<tr>"+
                        "<td colspan='5'>无消息数据</td>"+
                        "</tr>");
                    $("table tbody").append(tr);
                }
                for(var i=0;i<json.array.length;i++){
                    var tr=$("<tr id='"+json.array[i].newsId+"'>"+
                        "<td>"+json.array[i].oder+"</td>"+
                        "<td>"+json.array[i].adminName+"</td>"+
                        "<td>"+json.array[i].adminContent +"</td>"+
                        "<td>"+json.array[i].adminTime+"</td>"+
                        "</tr>");
                    $("table tbody").append(tr);
                }

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
//搜索
function search() {
    //状态
    $(".logCon .head select.selectAdmin").unbind("change").on("change",function () {
        var state=$(this).val();
        var val=$(".logCon .head select.selectFunction option:selected").val();
        var text=$(".logCon .head input").val();
        information(1,val,state,text)
    })
    //类型
    $(".logCon .head select.selectFunction").unbind("change").on("change",function () {
        var val=$(this).val();
        var state=$(".logCon .head select.selectAdmin option:selected").val();
        var text=$(".logCon .head input").val();
        information(1,val,state,text)
    })
    //搜索
    $(".logCon .head .search-btn").unbind("click").on("click",function () {
        var val=$(".logCon .head select.selectAdmin option:selected").val();
        var state=$(".logCon .head select.selectFunction option:selected").val();
        var text=$(".logCon .head input").val();
        information(1,val,state,text)
    });
    //回车查询
    $(".logCon .head input").unbind("keypress").on("keypress",function (e) {
        var ev = document.all ? window.event : e;//兼容IE
        if (ev.keyCode == 13) {
            $(".logCon .head .search-btn").trigger("click");
        }
    });
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