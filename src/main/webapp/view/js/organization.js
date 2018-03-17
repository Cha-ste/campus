/**
 * Created by 平凡的世界 on 2017/3/3.
 */
$(function () {
    //获取所有机构
    academy();
});
//获取所有机构
function academy() {
    $(".academy .content ul").children().remove();
    var sendData = {
        "account": ReadCookie("account"),
        "code": ReadCookie("code"),
        "groupId":ReadCookie("groupId"),
    };
    $.ajax({
        url: "../organization/selectOrganization",
        type: "post",
        dataType: "json",
        data: JSON.stringify(sendData),
        contentType: "application/json",
        success: function (json) {
            if (json.result == "success") {

                for(var i=0;i<json.array.length;i++){
                    var li=$("<li id='"+json.array[i].id+"'>"+
                        "<p>" +
                        "<i class='icon-wenjian'></i>" +
                        "<span>"+json.array[i].name+"</span>" +
                        "</p>"+
                        "</li>");
                    $(".academy .content ul").append(li);
                }

                //点击
                academycCick(1,"","");
                searchOrginazer()


            }else if(json.result == "noPower"){
                alert("你没有权限");
            }else if(json.result == "timeOver"){
                alert("登录过期");
                window.location.href="loginAdmin.html";
            }
        },
        error: function () {
            alert("获取信息失败", 1);
        }
    });
}
//点击
function academycCick(index,text) {
    $(".academy .content ul li p").unbind("click").on("click",function () {
        $(".academyCon .head h1").text($(this).find("span").text());
        $(this).parent().siblings().removeClass("on").removeClass("hover");
        $(this).parent().addClass("on");
        var id=$(this).parent().attr("id");
        $("#teacher").children().remove();
        var sendData = {
            "account": ReadCookie("account"),
            "code": ReadCookie("code"),
            "organizationId":id,
            "keyword":text,
            "pageSize":20,//每页显示12条
            "pageIndex":index,//第几页
        };
        $.ajax({
            url: "../client/selectOrganizer",
            type: "post",
            dataType: "json",
            data: JSON.stringify(sendData),
            contentType: "application/json",
            success: function (json) {
                if (json.result == "success") {
                    if(json.array.length==0){
                        var tr=$("<tr>"+
                            "<td colspan='4' style='text-align: center'>没有找到匹配的记录</td>"+
                            "</tr>");
                        $("#teacher").append(tr);
                    }
                    for(var i=0;i<json.array.length;i++){

                        var tr=$("<tr id='"+json.array[i].id+"'>" +
                            "<td>"+json.array[i].order+"</td>"+
                            "<td>"+json.array[i].name+"</td>"+
                            "<td>"+json.array[i].tell+"</td>"+
                            "<td>"+json.array[i].email+"</td>"+
                            "</tr>");
                        $("#teacher").append(tr);
                    }

                    $("#Pagination").css("display","table");
                    $('#Pagination').pagination({
                        coping:true,
                        homePage:'首页',
                        endPage:'末页',
                        jump:true,
                        pageCount:json.totalPage,
                        callback:function(index){
                            academycCickPage(index.getCurrent(),text,val)
                        }
                    });

                    //搜索
                    search();



                }else if(json.result == "noPower"){
                    alert("你没有权限");
                }else if(json.result == "timeOver"){
                    alert("登录过期");
                    window.location.href="loginAdmin.html";
                }
            },
            error: function () {
                alert("获取信息失败", 1);
            }
        });
    });
    $(".academy .content ul li p").eq(0).trigger("click");
}
//翻页
function academycCickPage(index,text) {
    $("#teacher").children().remove();
    var sendData = {
        "account": ReadCookie("account"),
        "code": ReadCookie("code"),
        "organizationId":$(".academy .content ul li.on").attr("id"),
        "keyword":text,
        "pageSize":20,//每页显示12条
        "pageIndex":index,//第几页
    };
    $.ajax({
        url: "../client/selectOrganizer",
        type: "post",
        dataType: "json",
        data: JSON.stringify(sendData),
        contentType: "application/json",
        success: function (json) {
            if (json.result == "success") {
                if(json.array.length==0){
                    var tr=$("<tr>"+
                        "<td colspan='4' style='text-align: center'>没有找到匹配的记录</td>"+
                        "</tr>");
                    $("#teacher").append(tr);
                }
                for(var i=0;i<json.array.length;i++){

                    var tr=$("<tr id='"+json.array[i].id+"'>" +
                        "<td>"+json.array[i].order+"</td>"+
                        "<td>"+json.array[i].name+"</td>"+
                        "<td>"+json.array[i].tell+"</td>"+
                        "<td>"+json.array[i].email+"</td>"+
                        "</tr>");
                    $("#teacher").append(tr);
                }


                //搜索
                search();



            }else if(json.result == "noPower"){
                alert("你没有权限");
            }else if(json.result == "timeOver"){
                alert("登录过期");
                window.location.href="loginAdmin.html";
            }
        },
        error: function () {
            alert("获取信息失败", 1);
        }
    });
}
//搜索
function search() {

    //搜索
    $(".head .search-btn").unbind("click").on("click",function () {
        var text=$(".head .search-text").val();
        $("#teacher").children().remove();
        academycCickPage(1,text)
    });
    //回车查询
    $(".head .search-text").unbind("keypress").on("keypress",function (e) {
        var ev = document.all ? window.event : e;//兼容IE
        if (ev.keyCode == 13) {
            $(".head .search-btn").trigger("click");
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
