/**
 * Created by 平凡的世界 on 2017/3/2.
 * 主要功能：新闻类型，搜索，状态，已发布，未发布，添加，删除，查看，修改
 */
$(function () {
    information(1,'','',""); //默认传第一页，类型0全部，搜索空值


});
//获取新闻
function information(index,val,state,text) { //index代表页码 val代表类型0 1 2 3 text代表搜索内容
    $("#messageMy").children().remove();
    var sendData = {
        "account": ReadCookie("account"),
        "code": ReadCookie("code"),
        // "groupId":ReadCookie("groupId"),
        "newsTypeId":val,//类型 0 1 2 3
        "keyword":text,//搜索关键字
        "pageSize":20,//每页显示12条
        "pageIndex":index,//第几页

    };
    $.ajax({
        url: "../client/selectNews",
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
                    $("#messageMy").append(tr);
                }
                for(var i=0;i<json.array.length;i++){
                    if(json.array[i].newsTypeId==1){ //0已发布 1未发布
                        json.array[i].newsTypeId="新闻";
                    }else if(json.array[i].newsTypeId==2){
                        json.array[i].newsTypeId="招聘会";
                    }else if(json.array[i].newsTypeId==3){
                        json.array[i].newsTypeId="学术讲座";
                    }
                    var tr=$("<tr id='"+json.array[i].newsId+"'>"+
                        "<td><a href='./newsDetail.html?id="+json.array[i].newsId+"'>"+json.array[i].newsTitle+"</a></td>"+
                        "<td>"+json.array[i].newsAuthor+"</td>"+
                        "<td>"+json.array[i].newsDate +"</td>"+
                        "<td>"+json.array[i].newsTypeId+"</td>"+
                        "<td>"+json.array[i].newsAbstract+"</td>"+
                        "<td><a href='./newsDetail.html?id="+json.array[i].newsId+"'>详情</a></td>"+
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
    $("#messageMy").children().remove();
    var sendData = {
        "account": ReadCookie("account"),
        "code": ReadCookie("code"),
        // "groupId":ReadCookie("groupId"),
        "newsTypeId":val,//类型 0 1 2 3
        "keyword":text,//搜索关键字
        "pageSize":20,//每页显示12条
        "pageIndex":index,//第几页
        // "status":state//状态 0全部 1已发布 2未发布

    };
    $.ajax({
        url: "../client/selectNews",
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
                    $("#messageMy").append(tr);
                }
                for(var i=0;i<json.array.length;i++){
                    if(json.array[i].newsTypeId==1){ //0已发布 1未发布
                        json.array[i].newsTypeId="新闻";
                    }else if(json.array[i].newsTypeId==2){
                        json.array[i].newsTypeId="招聘会";
                    }else if(json.array[i].newsTypeId==3){
                        json.array[i].newsTypeId="学术讲座";
                    }
                    var tr=$("<tr id='"+json.array[i].newsId+"'>"+
                        "<td><a href='./newsDetail.html?id="+json.array[i].newsId+"'>"+json.array[i].newsTitle+"</a></td>"+
                        "<td>"+json.array[i].newsAuthor+"</td>"+
                        "<td>"+json.array[i].newsDate +"</td>"+
                        "<td>"+json.array[i].newsTypeId+"</td>"+
                        "<td>"+json.array[i].newsAbstract+"</td>"+
                        "<td><a href='./newsDetail.html?id="+json.array[i].newsId+"'>详情</a></td>"+
                        "</tr>");
                    $("#messageMy").append(tr);

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
    $(".company_sign .head select.newsState").unbind("change").on("change",function () {
        var state=$(this).val();
        var val=$(".company_sign .head select.newsType option:selected").val();
        var text=$(".company_sign .head input").val();
        information(1,val,state,text)
    })
    //类型
    $(".company_sign .head select.newsType").unbind("change").on("change",function () {
        var val=$(this).val();
        var state=$(".company_sign .head select.newsState option:selected").val();
        var text=$(".company_sign .head input").val();
        information(1,val,state,text)
    })
    //搜索
    $(".company_sign .head .search-btn").unbind("click").on("click",function () {
        var val=$(".company_sign .head select.newsType option:selected").val();
        var state=$(".company_sign .head select.newsState option:selected").val();
        var text=$(".company_sign .head input").val();
        information(1,val,state,text)
    });
    //回车查询
    $(".company_sign .head input").unbind("keypress").on("keypress",function (e) {
        var ev = document.all ? window.event : e;//兼容IE
        if (ev.keyCode == 13) {
            $(".company_sign .head .search-btn").trigger("click");
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