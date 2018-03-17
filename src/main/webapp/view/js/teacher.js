/**
 * Created by 平凡的世界 on 2017/3/3.
 */
$(function () {
    //获取所有学院
    academy();


});
//获取所有学院
function academy() {
    $(".academy .content ul").children().remove();
    var sendData = {
        "account": ReadCookie("account"),
        "code": ReadCookie("code"),
    };
    $.ajax({
        url: "../client/selectInstitute",
        type: "post",
        dataType: "json",
        data: JSON.stringify(sendData),
        contentType: "application/json",
        success: function (json) {
            if (json.result == "success") {

                for(var i=0;i<json.array.length;i++){
                    var li=$("<li id='"+json.array[i].instituteId+"'>"+
                        "<p><i class='icon-wenjian'></i><span>"+json.array[i].instituteName+"</span></p>"+
                        "</li>");
                    $(".academy .content ul").append(li);
                }

                //点击
                academycCick(1,"","");


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
function academycCick(index,text,val) {
    $(".academy .content ul li p").unbind("click").on("click",function () {
        $(".academyCon .head h1").text($(this).find("span").text());
        $(this).parent().addClass("on");
        $(this).parent().siblings().removeClass("on");
        var id=$(this).parent().attr("id");
        $(".picContent").children().remove();
        var sendData = {
            "account": ReadCookie("account"),
            "code": ReadCookie("code"),
            "instituteId":id,
            "tDegree":val,
            "keyword":text,
            "pageSize":20,//每页显示12条
            "pageIndex":index,//第几页
        };
        $.ajax({
            url: "../client/selectTeacher",
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
                    for(var i=0;i<json.array.length;i++){
                        var power=new Array();
                        for (var j=0;j<json.array[i].TDegree.length ;j++ ) {
                            if (json.array[i].TDegree[j] == "1") {
                                power.push("教授");
                            } else if (json.array[i].TDegree[j] == "2") {
                                power.push("副教授");
                            } else if (json.array[i].TDegree[j] == "3") {
                                power.push("博士");
                            } else if (json.array[i].TDegree[j] == "4") {
                                power.push("硕士");
                            } else if (json.array[i].TDegree[j] == "5") {
                                power.push("研究生");
                            } else if (json.array[i].TDegree[j] == "6") {
                                power.push("学士");
                            }
                        }

                        var li=$("<li id='"+json.array[i].id+"'>"+
                            "<img src='"+json.array[i].teacherPicture+"'>"+
                            "<h1>"+json.array[i].teacherName+"</h1>"+
                            "<p>"+power+"</p>"+
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
                            academycCickPage(index.getCurrent(),text,val)
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
    });
    $(".academy .content ul li p").eq(0).trigger("click");
}
//翻页
function academycCickPage(index,text,val) {
    $(".picContent").children().remove();
    var sendData = {
        "account": ReadCookie("account"),
        "code": ReadCookie("code"),
        "instituteId":$(".academy .content ul li.on").attr("id"),
        "tDegree":val,
        "keyword":text,
        "pageSize":20,//每页显示12条
        "pageIndex":index,//第几页
    };
    $.ajax({
        url: "../client/selectTeacher",
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
                for(var i=0;i<json.array.length;i++){
                    var power=new Array();
                    for (var j=0;j<json.array[i].TDegree.length ;j++ ) {
                        if (json.array[i].TDegree[j] == "1") {
                            power.push("教授");
                        } else if (json.array[i].TDegree[j] == "2") {
                            power.push("副教授");
                        } else if (json.array[i].TDegree[j] == "3") {
                            power.push("博士");
                        } else if (json.array[i].TDegree[j] == "4") {
                            power.push("硕士");
                        } else if (json.array[i].TDegree[j] == "5") {
                            power.push("研究生");
                        } else if (json.array[i].TDegree[j] == "6") {
                            power.push("学士");
                        }
                    }

                    var li=$("<li id='"+json.array[i].id+"'>"+
                        "<img src='"+json.array[i].teacherPicture+"'>"+
                        "<h1>"+json.array[i].teacherName+"</h1>"+
                        "<p>"+power+"</p>"+
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
        $(".conNews .head h1").text("教师详情");
        var sendData = {
            "id": id,
            "account": ReadCookie("account"),
            "code": ReadCookie("code"),
        }
        $.ajax({
            url: "../client/getTeacher",
            type: "post",
            dataType: "json",
            contentType: "application/json",
            data: JSON.stringify(sendData),
            success: function (json) {
                if (json.result == "success") {
                    $("#imghead").attr("src",json.teacher.teacherPicture);
                    $(".conNews ul li").eq(1).find("i").text(json.teacher.teacherName);
                    $(".conNews ul li").eq(2).find("i").text(json.teacher.teacherNo);
                    $(".conNews ul li").eq(3).find("i").text(json.teacher.teacherTell);
                    $(".conNews ul li").eq(4).find("i").text(json.teacher.teacherMail);
                    $(".conNews ul li").find("textarea").val(json.teacher.expression);
                    var power=[];
                    for(var i=0;i<json.teacher.TDegree.length;i++){
                        if(json.teacher.TDegree[i]=="1"){
                            power.push("教授");
                        }
                        if(json.teacher.TDegree[i]=="2"){
                            power.push("副教授");
                        }
                        if(json.teacher.TDegree[i]=="3"){
                            power.push("博士");
                        }
                        if(json.teacher.TDegree[i]=="4"){
                            power.push("硕士");
                        }
                        if(json.teacher.TDegree[i]=="5"){
                            power.push("研究生");
                        }
                        if(json.teacher.TDegree[i]=="6"){
                            power.push("学士");
                        }
                    }
                    $(".conNews ul li").eq(5).find("i").text(power);


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
    //状态
    $("#select").unbind("change").on("change",function () {
        var val=$("#select option:selected").val();
        var text=$(".head .search-text").val()
        academycCickPage(1,text,val);

    });
    //搜索
    $(".head .search-btn").unbind("click").on("click",function () {
        var val=$("#select option:selected").val();
        var text=$(".head .search-text").val();
        academycCickPage(1,text,val);

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
