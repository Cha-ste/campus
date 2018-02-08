/**
 * Created by 平凡的世界 on 2017/3/2.
 * 主要功能：新闻类型，搜索，状态，已发布，未发布，添加，删除，查看，修改
 */
$(function () {
    information(1,'','',""); //默认传第一页，类型0全部，搜索空值
    //添加
    addNews();

});
//获取新闻
function information(index,val,state,text) { //index代表页码 val代表类型0 1 2 3 text代表搜索内容
    $("#messageMy").children().remove();
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
        url: "/news/selectNews",
        type: "post",
        dataType: "json",
        data: JSON.stringify(sendData),
        contentType: "application/json",
        success: function (json) {
            if (json.result == "success") {

                if(json.array.length==0){
                    var tr=$("<tr>"+
                        "<td colspan='6'>无消息数据</td>"+
                        "</tr>");
                    $("#messageMy").append(tr);
                }
                for(var i=0;i<json.array.length;i++){
                    if(json.array[i].newsStatus==0){ //0已发布 1未发布
                        json.array[i].newsStatus="已发布";
                    }else{
                        json.array[i].newsStatus="未发布";
                    }
                    var tr=$("<tr id='"+json.array[i].newsId+"'>"+
                        "<td>"+json.array[i].newsTitle+"</td>"+
                        "<td>"+json.array[i].newsAuthor+"</td>"+
                        "<td>"+json.array[i].newsDate +"</td>"+
                        "<td>"+json.array[i].newsAbstract+"</td>"+
                        "<td>"+json.array[i].newsStatus+"</td>"+
                        "<td><a class='details'>查看</a>" +
                        "<a class='amend'>修改</a>" +
                        "<a class='delete'>删除</a>" +
                        "<a class='public'>发布</a>"+
                        "<a class='unpublic'>取消发布</a>"+
                        "</td>"+
                        "</tr>");
                    $("#messageMy").append(tr);
                    if(json.array[i].newsStatus=="已发布"){ //0已发布 1未发布
                        $("#messageMy tr").eq(i).find("a").eq(4).css("display","block");
                        $("#messageMy tr").eq(i).find("a").eq(3).css("display","none");
                    }else if(json.array[i].newsStatus=="未发布"){
                        $("#messageMy tr").eq(i).find("a").eq(3).css("display","block");
                        $("#messageMy tr").eq(i).find("a").eq(4).css("display","none");
                    }

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
                //查看
                examine();
                //删除
                expurgate();
                //修改
                amend();
                //发布
                publicNews();
                //取消发布
                unpublic();
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
        "groupId":ReadCookie("groupId"),
        "newsTypeId":val,//类型 0 1 2 3
        "keyword":text,//搜索关键字
        "pageSize":20,//每页显示12条
        "pageIndex":index,//第几页
        "status":state//状态 0全部 1已发布 2未发布

    };
    $.ajax({
        url: "/news/selectNews",
        type: "post",
        dataType: "json",
        data: JSON.stringify(sendData),
        contentType: "application/json",
        success: function (json) {
            if (json.result == "success") {

            	if(json.array.length==0){
                    var tr=$("<tr>"+
                        "<td colspan='6'>无消息数据</td>"+
                        "</tr>");
                    $("#messageMy").append(tr);
                }
                for(var i=0;i<json.array.length;i++){
                    if(json.array[i].newsStatus==0){ //0未发布 1已发布
                        json.array[i].newsStatus="已发布";
                    }else{
                        json.array[i].newsStatus="未发布";
                    }
                    var tr=$("<tr id='"+json.array[i].newsId+"'>"+
                        "<td>"+json.array[i].newsTitle+"</td>"+
                        "<td>"+json.array[i].newsAuthor+"</td>"+
                        "<td>"+json.array[i].newsDate +"</td>"+
                        "<td>"+json.array[i].newsAbstract+"</td>"+
                        "<td>"+json.array[i].newsStatus+"</td>"+
                        "<td><a class='details'>查看</a>" +
                        "<a class='amend'>修改</a>" +
                        "<a class='delete'>删除</a>" +
                        "<a class='public'>发布</a>"+
                        "<a class='unpublic'>取消发布</a>"+
                        "</td>"+
                        "</tr>");
                    $("#messageMy").append(tr);
                    if(json.array[i].newsStatus=="已发布"){ //0发布 1已发布
                        $("#messageMy tr").eq(i).find("a").eq(4).css("display","block");
                        $("#messageMy tr").eq(i).find("a").eq(3).css("display","none");
                    }else if(json.array[i].newsStatus=="未发布"){
                        $("#messageMy tr").eq(i).find("a").eq(3).css("display","block");
                        $("#messageMy tr").eq(i).find("a").eq(4).css("display","none");
                    }

                }

                //查看
                examine();
                //删除
                expurgate();
                //修改
                amend();
                //发布
                publicNews();
                //取消发布
                unpublic();
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
//查看
function examine() {
    $(".table a.details").unbind("click").on("click",function() {
        var id = $(this).parent().parent().attr("id");
        $(".conNews").fadeIn();
        $(".bg").css("height", $(document).height()).fadeIn();
        $(".btns3 a.clooe3").fadeOut();
        $(".conNews .head h1").text("消息详情");
        var sendData = {
            "newsId": id,
            "account": ReadCookie("account"),
            "code": ReadCookie("code"),
            "groupId":ReadCookie("groupId"),
        }
        $.ajax({
            url: "/news/getNews",
            type: "post",
            dataType: "json",
            contentType: "application/json",
            data: JSON.stringify(sendData),
            success: function (json) {
                if (json.result == "success") {
                    $(".conNews ul li input").eq(0).val(json.newsTitle);
                    $(".conNews ul li input").eq(1).val(json.newsAuthor);
                    $(".conNews ul li input").eq(2).val(json.newsAbstract);
                    $(".conNews ul li select").val(json.newsTypeId);
                    $(".conNews ul li textarea").val(json.newsContent);

                    $(".conNews ul li input,.conNews ul li select,.conNews ul li textarea").attr("disabled","disabled");
                }
            }
        })
    });
  //取消
    $(".btns3 a.sure3,.conNews .head i").unbind("click").on("click",function () {
        $(".conNews").fadeOut();
        $(".bg").fadeOut();
    });


}
//删除
function expurgate() {
    $("#messageMy a.delete").unbind("click").on("click",function(){
        if(confirm("确定要删除吗？")) {
            var sendData = {
                "newsId": $(this).parents().parents().attr("id"),
                "account": ReadCookie("account"),
                "code": ReadCookie("code"),
                "groupId":ReadCookie("groupId"),
            };
            $.ajax({
                url: "/news/deleteNews",
                type: "post",
                dataType: "json",
                contentType: "application/json",
                data: JSON.stringify(sendData),
                success: function (json) {
                    if (json.result == "success") {
                    	informationPage($("#Pagination span").text(),'','',"");
              
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
        $(".conNews .head h1").text("修改消息");
        $(".conNews ul li input").eq(0).val("");
        $(".conNews ul li input").eq(1).val("");
        $(".conNews ul li input").eq(2).val("");
        $(".conNews ul li select").val("1");
        $(".conNews ul li textarea").val("");
        $(".conNews ul li input,.conNews ul li select,.conNews ul li textarea").removeAttr("disabled");
        var sendData = {
            "newsId":id,
            "account": ReadCookie("account"),
            "code": ReadCookie("code"),
            "groupId":ReadCookie("groupId"),
        }
        $.ajax({
            url: "/news/getNews",
            type: "post",
            dataType: "json",
            contentType: "application/json",
            data: JSON.stringify(sendData),
            success:function(json){
                if(json.result == "success"){
                    $(".conNews ul li input").eq(0).val(json.newsTitle);
                    $(".conNews ul li input").eq(1).val(json.newsAuthor);
                    $(".conNews ul li input").eq(2).val(json.newsAbstract);
                    $(".conNews ul li select").val(json.newsTypeId);
                    $(".conNews ul li textarea").val(json.newsContent);
                }
            }
        })

        //确定
        $(".btns3 a.sure3").unbind("click").on("click",function () {
            var newsTitle=$(".conNews ul li input").eq(0).val();
            var newsAuthor=$(".conNews ul li input").eq(1).val();
            var newsDigest=$(".conNews ul li input").eq(2).val();
            var newsTypeId=$(".conNews ul li select option:selected").val();
            var newsContent=$(".conNews ul li textarea").val();
            var sendData = {
                "newsTitle": newsTitle,
                "newsAuthor":newsAuthor,
                "newsContent":newsContent,
                "newsAbstract":newsDigest,
                "newsTypeId":newsTypeId,
                "newsId":id,
                "account": ReadCookie("account"),
                "code": ReadCookie("code"),
                "groupId":ReadCookie("groupId"),

            }
            $.ajax({
                url: "/news/updateNews",
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
                        informationPage($("#Pagination span").text(),'','',"");
                        //初始化
                        $(".company_sign .head input").val("");
                        $(".company_sign .head select.newsType").val("");
                        $(".company_sign .head select.newsState").val("");
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
//发布
function publicNews(){
    $("#messageMy a.public").unbind("click").on("click",function(){
    	var _this=$(this);
        if(confirm("确定要发布吗？")) {
            var sendData = {
                "newsId": $(this).parents().parents().attr("id"),
                "account": ReadCookie("account"),
                "code": ReadCookie("code"),
                "groupId":ReadCookie("groupId"),
            };
            $.ajax({
                url: "/news/publicNews",
                type: "post",
                dataType: "json",
                contentType: "application/json",
                data: JSON.stringify(sendData),
                success: function (json) {
                    if (json.result == "success") {
                    	_this.css("display","none");
                    	_this.next().css("display","block");
                    	_this.parent().prev().text("已发布");
                    }
                },
                error: function () {
                    alert("数据加载出错", 1);
                }
            });
        };
    })
}
//取消发布
function unpublic(){
    $("#messageMy a.unpublic").unbind("click").on("click",function(){
    	var _this=$(this);
        if(confirm("确定要取消发布吗？")) {
            var sendData = {
                "newsId": $(this).parents().parents().attr("id"),
                "account": ReadCookie("account"),
                "code": ReadCookie("code"),
                "groupId":ReadCookie("groupId"),
            };
            $.ajax({
                url: "/news/unPublicNews",
                type: "post",
                dataType: "json",
                contentType: "application/json",
                data: JSON.stringify(sendData),
                success: function (json) {
                    if (json.result == "success") {
                    	_this.css("display","none");
                    	_this.prev().css("display","block");
                    	_this.parent().prev().text("未发布");
                    }
                },
                error: function () {
                    alert("数据加载出错", 1);
                }
            });
        };
    })
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
//添加
function addNews(){
    $(".addnews").unbind("click").on("click",function(){
        $(".conNews").fadeIn();
        $(".bg").css("height",$(document).height()).fadeIn();
        $(".conNews .head h1").text("添加消息");
        $(".conNews ul li input").eq(0).val("");
        $(".conNews ul li input").eq(1).val("");
        $(".conNews ul li input").eq(2).val("");
        $(".conNews ul li select").val("1");
        $(".conNews ul li textarea").val("");
        $(".conNews ul li input,.conNews ul li select,.conNews ul li textarea").removeAttr("disabled");
        //确定
        $(".btns3 a.sure3").unbind("click").on("click",function () {
            var newsTitle=$(".conNews ul li input").eq(0).val();
            var newsAuthor=$(".conNews ul li input").eq(1).val();
            var newsAbstract=$(".conNews ul li input").eq(2).val();
            var newsTypeId=$(".conNews ul li select option:selected").val();
            var newsContent=$(".conNews ul li textarea").val();
            if(newsAuthor.length>10){
            	alert("作者字数10字以内");
            }else{
            	var sendData = {
                        "newsTitle": newsTitle,
                        "newsAuthor":newsAuthor,
                        "newsContent":newsContent,
                        "newsAbstract":newsAbstract,
                        "newsTypeId":newsTypeId,
                        "account": ReadCookie("account"),
                        "code": ReadCookie("code"),
                        "groupId":ReadCookie("groupId"),

                    }
                    $.ajax({
                        url: "/news/saveNews",
                        type: "post",
                        dataType: "json",
                        contentType: "application/json",
                        data: JSON.stringify(sendData),
                        success:function(json){
                            if(json.result == "success"){
                                alert("保存成功");
                                $(".conNews").fadeOut();
                                $(".bg").fadeOut();
                                //调用初始化函数
                                information(1,"","","");
                                //初始化
                                $(".company_sign .head input").val("");
                                $(".company_sign .head select.newsType").val("");
                                $(".company_sign .head select.newsState").val("");
                            }
                        }
                    })
               
            }
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