/**
 * Created by 平凡的世界 on 2017/3/3.
 */
$(function () {
    //获取所有学院
    academycCick(1,"");


});
//点击
function academycCick(index,text) {
    var sendData = {
        "account": ReadCookie("account"),
        "code": ReadCookie("code"),
        "keyword":text,
        "pageSize":20,//每页显示12条
        "pageIndex":index,//第几页
    };
    $.ajax({
        url: "../client/selectStudent",
        type: "post",
        dataType: "json",
        data: JSON.stringify(sendData),
        contentType: "application/json",
        success: function (json) {
            if (json.result == "success") {
                if(json.array.length==0){
                    var li=$("<li class='noData'>没有找到匹配的记录</li>");
                    $(".picContent").append(li);
                }
                $(".academyCon .head h1").text(json.array[0].className);
                for(var i=0;i<json.array.length;i++){
                    var li=$("<li id='"+json.array[i].id+"'>"+
                        "<img src='"+json.array[i].studentPicture+"'>"+
                        "<h1>"+json.array[i].studentName+"</h1>"+
                        "<p>"+json.array[i].studentNo+"</p>"+
                        "</li>")
                    $(".picContent").append(li);

                }

                $("#Pagination").css("display","table");
                $('#Pagination').pagination({
                    coping:true,
                    homePage:'首页',
                    endPage:'末页',
                    jump:true,
                    pageCount:json.totalPage,
                    callback:function(index){
                        academycCickPage(index.getCurrent(),text)
                    }
                });

                //查看
                details();
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
//翻页
function academycCickPage(index,text) {
    $(".picContent").children().remove();
    var sendData = {
        "account": ReadCookie("account"),
        "code": ReadCookie("code"),
        "keyword":text,
        "pageSize":20,//每页显示12条
        "pageIndex":index,//第几页
    };
    $.ajax({
        url: "../client/selectStudent",
        type: "post",
        dataType: "json",
        data: JSON.stringify(sendData),
        contentType: "application/json",
        success: function (json) {
            if (json.result == "success") {
                if(json.array.length==0){
                    var li=$("<li class='noData'>没有找到匹配的记录</li>");
                    $(".picContent").append(li);
                }
                $(".academyCon .head h1").text(json.array[0].className);
                for(var i=0;i<json.array.length;i++){
                    var li=$("<li id='"+json.array[i].id+"'>"+
                        "<img src='"+json.array[i].studentPicture+"'>"+
                        "<h1>"+json.array[i].studentName+"</h1>"+
                        "<p>"+json.array[i].studentNo+"</p>"+
                        "</li>")
                    $(".picContent").append(li);

                }

                //查看
                details();
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
//查看
function details() {
    $(".picContent li").unbind("click").on("click",function() {
        var id = $(this).attr("id");
        $(".conNews").fadeIn();
        $(".bg").css("height", $(document).height()).fadeIn();
        $(".conNews .head h1").text("学生详情");
        var sendData = {
            "id": id,
            "account": ReadCookie("account"),
            "code": ReadCookie("code"),
        }
        $.ajax({
            url: "../client/getStudent",
            type: "post",
            dataType: "json",
            contentType: "application/json",
            data: JSON.stringify(sendData),
            success: function (json) {
                if (json.result == "success") {
                    $("#imghead").attr("src",json.student.studentPicture);
                    $(".conNews ul li").eq(1).find("i").text(json.student.studentName);
                    $(".conNews ul li").eq(2).find("i").text(json.student.studentNo);
                    $(".conNews ul li").eq(3).find("i").text(json.student.studentTell);
                    $(".conNews ul li").eq(4).find("i").text(json.student.studentMail);
                    $(".conNews ul li").eq(5).find("i").text(json.student.studentSex);


                }
            }
        })
    });
    //取消
    $(".btns3 a.clooe3,.conNews .head i").unbind("click").on("click",function () {
        $(".conNews").fadeOut();
        $(".bg").fadeOut();
    });
}
//搜索
function search() {
    //搜索
    $(".head .search-btn").unbind("click").on("click",function () {
        var text=$(".head .search-text").val();
        academycCickPage(1,text);

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
