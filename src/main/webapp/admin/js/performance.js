/**
 * Created by 平凡的世界 on 2017/3/10.
 */
$(function () {
    //获取所有机构
    academy();
    //添加
    addAdmin();
    $(".conNews ul li input[type='checkbox']").on("click",function () {
        if($(this).attr("checked")){
            $(this).removeAttr("checked");
        }else{
            $(this).attr("checked",true);
        }
    });


});
function clickNav() {
    //添加机构  鼠标滑过
    $(".middle>span").mouseover(function (e) {
        if(!$(this).hasClass("on")) {
            $(this).addClass("hover");
            $(this).next().addClass("on");
            e.preventDefault();
        }
    }).mouseout(function (e) {
        if(!$(this).hasClass("on")) {
            $(this).next().removeClass("on");
            $(this).removeClass("hover");
            e.preventDefault();
        }
    });
    //鼠标移到点上面
    $(".middle i,.academy .content ul li i.icon-caozuo").mouseover(function (e) {
        $(this).addClass("on");
        $(this).prev().addClass("hover");
        e.preventDefault();
    });
    //鼠标移到下拉框
    $(".middle .dowload").mouseover(function (e) {
        $(this).prev().addClass("on");
        e.preventDefault();
    });
    //点击点
    $(".middle i").unbind("click").on("click",function (){
        //移除打开的download
        $(".academy .content ul li .dowload.open").each(function () {
            $(this).removeClass("open");
            $(this).prev().removeClass("on");
            $(this).parents().removeClass("on").removeClass("hover");
        });
        if($(this).next().hasClass("open")){
            $(this).next().removeClass("open");
            $(this).prev().removeClass("on");
        }else {
            $(this).next().addClass("open");
            $(this).prev().addClass("on")
        }
        $(this).addClass("on");
    });
    $(".academy .content ul li i.icon-caozuo").unbind("click").on("click",function () {
        $(this).next().addClass("open");
        $(this).addClass("on");
    })
    //修改机构鼠标滑过
    $(".academy .content ul li").mouseover(function (e) {
        if(!$(this).hasClass("on")){
            $(this).addClass("hover");
            $(this).children().eq(1).addClass("on");
            e.preventDefault();
        }
    }).mouseout(function (e) {
        if(!$(this).hasClass("on")){
            $(this).children().eq(1).removeClass("on");
            $(this).removeClass("hover");
            e.preventDefault();
        }

    });
    //点击点
    $(".academy .content ul li i.icon-caozuo").unbind("click").on("click",function () {
        var _this=$(this);
        //移除打开的download
        $(".academy .content ul li.on").not(_this.parents()).each(function () {
            $(this).removeClass("on").removeClass("hover");
            $(this).children().eq(1).removeClass("on");
            $(this).children().eq(2).removeClass("open");
        });
        //移除顶部打开的download
        $(".middle span.on").each(function () {
            $(this).removeClass("on").removeClass("hover");
            $(this).next().removeClass("on");
            $(this).next().next().removeClass("open");
        });

        if($(this).next().hasClass("open")){
            $(this).next().removeClass("open");
            $(this).parents().removeClass("on");
        }else {
            $(this).next().addClass("open");
            $(this).parents().addClass("on");
        }
        $(this).addClass("on");
    });

    addOrginazer();
    deleteOrginazer();
    searchOrginazer();
}
//获取所有学院
function academy() {
    $(".academy .content ul").children().remove();
    var sendData = {
        "account": ReadCookie("account"),
        "code": ReadCookie("code"),
        "groupId":ReadCookie("groupId"),
    };
    $.ajax({
        url: "../institute/selectInstitute",
        type: "post",
        dataType: "json",
        data: JSON.stringify(sendData),
        contentType: "application/json",
        success: function (json) {
            if (json.result == "success") {

                for(var i=0;i<json.array.length;i++){
                    var li=$("<li id='"+json.array[i].instituteId+"'>"+
                            "<i class='icon-sanjiao'></i>"+
                            "<p>" +
                            "<i class='icon-wenjian'></i>" +
                            "<span>"+json.array[i].instituteName+"</span>" +
                            "</p>"+
                            "<i class='icon-caozuo'></i>"+
                            "<div class='dowload'>"+
                            "<span>添加课程</span>"+
                            "</div>"+
                            "</li>");
                    $(".academy .content ul").append(li);
                }

                clickNav();
                //点击
                academycCick(1,"","","");

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
//点击小三角获取课程
function course(){
    var sendData = {
        "account": ReadCookie("account"),
        "code": ReadCookie("code"),
        "groupId":ReadCookie("groupId"),
    };
    $.ajax({
        url: "../institute/selectInstitute",
        type: "post",
        dataType: "json",
        data: JSON.stringify(sendData),
        contentType: "application/json",
        success: function (json) {
            if (json.result == "success") {

                for(var i=0;i<json.array.length;i++){
                    var li=$("<ol>"+
                        "<li>"+
                        "<p><span></span></p>"+
                        "<i class='icon-caozuo'></i>"+
                        "<div class='dowload'>"+
                        "<span>修改名称</span>"+
                        "<span>删除</span>"+
                        "</div>"+
                        "</li>"+
                        "</ol>"+
                        "</li>");
                    $(".academy .content ul").append(li);
                }

                clickNav();
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
function academycCick(index,text,course,classNo) {
    $(".academy .content ul li p").unbind("click").on("click",function () {
        $(".academyCon .head h1").text($(this).find("span").text());
        $(this).parent().siblings().removeClass("on").removeClass("hover");
        $(this).parent().addClass("on");
        $(".academy .content ul li .icon-caozuo").each(function () {
            $(this).removeClass("on");
        });
        $(".academy .content ul li .dowload").each(function () {
            $(this).removeClass("open");
        });
        $(this).next().addClass("on");
        var id=$(this).parent().attr("id");
        $("#teacher").children().remove();
        var sendData = {
            "account": ReadCookie("account"),
            "code": ReadCookie("code"),
            "instituteId":id,
            "groupId":ReadCookie("groupId"),
            "keyword":text,
            "pageSize":20,//每页显示12条
            "pageIndex":index,//第几页
            "classNo":classNo,//班级
            "courseId":course  //课程
        };
        $.ajax({
            url: "../score/selectScore",
            type: "post",
            dataType: "json",
            data: JSON.stringify(sendData),
            contentType: "application/json",
            success: function (json) {
                if (json.result == "success") {
                    if(json.array.length==0){
                        var tr=$("<tr>"+
                            "<td colspan='10'>无消息数据</td>"+
                            "</tr>");
                        $("#teacher").append(tr);
                    }
                    for(var i=0;i<json.array.length;i++){

                        var tr=$("<tr id='"+json.array[i].id+"'>" +
                            "<td><input type='checkbox'></td>"+
                            "<td>"+json.array[i].order+"</td>"+
                            "<td>"+json.array[i].courseName+"</td>"+
                            "<td>"+json.array[i].className+"</td>"+
                            "<td>"+json.array[i].studentName+"</td>"+
                            "<td>"+json.array[i].studentNo+"</td>"+
                            "<td>"+json.array[i].examScore+"</td>"+
                            "<td>"+json.array[i].pScore+"</td>"+
                            "<td>"+json.array[i].totalScore+"</td>"+
                            "<td>"+
                            "<a class='amend'>修改</a>"+
                            "<a class='delete'>删除</a>"+
                            "</td></tr>");
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

                    //删除
                    deleted();
                    //修改
                    amend();
                    //批量删除
                    deleteBatch();
                    //搜索
                    search();
                    //导入
                    lead();
                    //导出
                    derive(json.totalPage);



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
    $("#teacher").children().remove();
    var sendData = {
        "account": ReadCookie("account"),
        "code": ReadCookie("code"),
        "organizationId":$(".academy .content ul li.on").attr("id"),
        "groupId":ReadCookie("groupId"),
        "keyword":text,
        "pageSize":20,//每页显示12条
        "pageIndex":index,//第几页
    };
    $.ajax({
        url: "../organizer/selectOrganizer",
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
                    $("#teacher").append(tr);
                }
                for(var i=0;i<json.array.length;i++){

                    var tr=$("<tr id='"+json.array[i].id+"'>" +
                        "<td><input type='checkbox'></td>"+
                        "<td>"+json.array[i].order+"</td>"+
                        "<td>"+json.array[i].name+"</td>"+
                        "<td>"+json.array[i].tell+"</td>"+
                        "<td>"+json.array[i].email+"</td>"+
                        "<td>"+
                        "<a class='amend'>修改</a>"+
                        "<a class='delete'>删除</a>"+
                        "</td></tr>");
                    $("#teacher").append(tr);
                }


                //删除
                deleted();
                //修改
                amend();
                //批量删除
                deleteBatch();
                //搜索
                search();

                //导入
                lead();
                //导出
                derive(json.totalPage);


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

//修改
function amend() {
    $("#teacher a.amend").unbind("click").on("click",function(){
        var id = $(this).parent().parent().attr("id");
        $(".conNews").fadeIn();
        $(".bg").css("height", $(document).height()).fadeIn();
        $(".conNews .head h1").text("修改人员");
        $("#upload-img").fadeIn();

        var sendData = {
            "id": id,
            "account": ReadCookie("account"),
            "code": ReadCookie("code"),
            "groupId":ReadCookie("groupId"),
        }
        $.ajax({
            url: "../organizer/getOrganizer",
            type: "post",
            dataType: "json",
            contentType: "application/json",
            data: JSON.stringify(sendData),
            success:function(json){
                if(json.result == "success"){
                    $(".conNews ul li input").eq(0).val(json.organizer.name);
                    $(".conNews ul li input").eq(1).val(json.organizer.tell);
                    $(".conNews ul li input").eq(2).val(json.organizer.email);

                }else if(json.result == "noPower"){
                    alert("你没有权限");
                }else if(json.result == "timeOver"){
                    alert("登录过期");
                    window.location.href="loginAdmin.html";
                }
            }
        })


        //确定
        $(".btns3 a.sure3").unbind("click").on("click",function () {
            var name=$(".conNews ul li input").eq(0).val();
            var phone=$(".conNews ul li input").eq(1).val();
            var emil=$(".conNews ul li input").eq(2).val();
            if(name.length==0){
                alert("请填写用户名");
            }else if(phone.length==0){
                alert("请填写手机号码");
            }else if(emil.length==0){
                alert("请填写邮箱");
            }else{
                var sendData = {
                    "name": name,
                    "tell":phone,
                    "email":emil,
                    "account": ReadCookie("account"),
                    "code": ReadCookie("code"),
                    "groupId":ReadCookie("groupId"),
                    "organizationId":$(".academy .content ul li.on").attr("id"),
                    "id":id,
                }
                $.ajax({
                    url: "../organizer/updateOrganizer",
                    type: "post",
                    dataType: "json",
                    contentType: "application/json",
                    data: JSON.stringify(sendData),
                    success:function(json){
                        if(json.result == "success"){
                            alert("修改成功");
                            $(".conNews").fadeOut();
                            $(".bg").fadeOut();
                            $(".academy .content ul li.on p").trigger("click");

                        }else if(json.result == "noPower"){
                            alert("你没有权限");
                        }else if(json.result == "timeOver"){
                            alert("登录过期");
                            window.location.href="loginAdmin.html";
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
//删除
function deleted() {
    $("#teacher a.delete").unbind("click").on("click",function(){
        if(confirm("确定要删除吗？")) {
            var sendData = {
                "id": $(this).parents().parents().attr("id"),
                "account": ReadCookie("account"),
                "code": ReadCookie("code"),
                "groupId":ReadCookie("groupId"),
            };
            $.ajax({
                url: "../organizer/deleteOrganizer",
                type: "post",
                dataType: "json",
                contentType: "application/json",
                data: JSON.stringify(sendData),
                success: function (json) {
                    if (json.result == "success") {
                        alert("删除成功");
                        $(".academy .content ul li.on p").trigger("click");
                    }else if(json.result == "noPower"){
                        alert("你没有权限");
                    }else if(json.result == "timeOver"){
                        alert("登录过期");
                        window.location.href="loginAdmin.html";
                    }
                },
                error: function () {
                    alert("数据加载出错", 1);
                }
            });
        };
    })
}
//添加
function addAdmin() {

    $(".addAdmin").unbind("click").on("click",function(){
        $(".conNews").fadeIn();
        $(".bg").css("height",$(document).height()).fadeIn();
        $(".conNews .head h1").text("添加人员");
        $(".conNews ul li input").eq(0).val("");
        $(".conNews ul li input").eq(1).val("");
        $(".conNews ul li input").eq(2).val("");


        //确定
        $(".btns3 a.sure3").unbind("click").on("click",function () {
            var name=$(".conNews ul li input").eq(0).val();
            var phone=$(".conNews ul li input").eq(1).val();
            var emil=$(".conNews ul li input").eq(2).val();
            if(name.length==0){
                alert("请填写用户名");
            }else if(phone.length==0){
                alert("请填写手机号码");
            }else if(emil.length==0){
                alert("请填写邮箱");
            }else{
                var sendData = {
                    "name": name,
                    "tell":phone,
                    "email":emil,
                    "account": ReadCookie("account"),
                    "code": ReadCookie("code"),
                    "groupId":ReadCookie("groupId"),
                    "organizationId":$(".academy .content ul li.on").attr("id"),
                }
                $.ajax({
                    url: "../organizer/addOrganizer",
                    type: "post",
                    dataType: "json",
                    contentType: "application/json",
                    data: JSON.stringify(sendData),
                    success:function(json){
                        if(json.result == "success"){
                            alert("保存成功");
                            $(".conNews").fadeOut();
                            $(".bg").fadeOut();
                            $(".academy .content ul li.on p").trigger("click");

                        }else if(json.result == "noPower"){
                            alert("你没有权限");
                        }else if(json.result == "timeOver"){
                            alert("登录过期");
                            window.location.href="loginAdmin.html";
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
//批量删除
function deleteBatch(){
    $(".academyCon table input[type='checkbox']").on("click",function () {
        if($(this).attr("checked")){
            $(this).removeAttr("checked");
        }else{
            $(this).attr("checked",true);
        }
    });
    $(".deleteAdmin").unbind("click").on("click",function(){
        var str=[];
        $(".academyCon table input[type='checkbox']").each(function () {
            if($(this).attr("checked")){
                str.push($(this).parents().parents().attr("id"));
            }
        });
        if(str.length!=0) {
            if(confirm("确定要删除吗？")) {
                var sendData = {
                    "ids":str ,
                    "account": ReadCookie("account"),
                    "code": ReadCookie("code"),
                    "groupId":ReadCookie("groupId"),
                };
                $.ajax({
                    url: "../organizer/deleteOrganizerBatch",
                    type: "post",
                    dataType: "json",
                    contentType: "application/json",
                    data: JSON.stringify(sendData),
                    success: function (json) {
                        if (json.result == "success") {
                            alert("删除成功");
                            $(".academy .content ul li.on p").trigger("click");
                        }else if(json.result == "noPower"){
                            alert("你没有权限");
                        }else if(json.result == "timeOver"){
                            alert("登录过期");
                            window.location.href="loginAdmin.html";
                        }
                    },
                    error: function () {
                        alert("数据加载出错", 1);
                    }
                });
            };
        }
    });
}
//搜索
function search() {

    //搜索
    $(".head .search-btn").unbind("click").on("click",function () {
        var val=$("#select option:selected").val();
        var text=$(".head .search-text").val();
        $("#teacher").children().remove();
        var sendData = {
            "account": ReadCookie("account"),
            "code": ReadCookie("code"),
            "keyword":text,
            "groupId":ReadCookie("groupId"),
            "organizationId":$(".academy .content ul li.on").attr("id"),
            "pageSize":20,//每页显示12条
            "pageIndex":1,//第几页
        };
        $.ajax({
            url: "../organizer/selectOrganizer",
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
                        $("#teacher").append(tr);
                    }
                    for(var i=0;i<json.array.length;i++){

                        var tr=$("<tr id='"+json.array[i].id+"'>" +
                            "<td><input type='checkbox'></td>"+
                            "<td>"+json.array[i].order+"</td>"+
                            "<td>"+json.array[i].name+"</td>"+
                            "<td>"+json.array[i].tell+"</td>"+
                            "<td>"+json.array[i].email+"</td>"+
                            "<td>"+
                            "<a class='amend'>修改</a>"+
                            "<a class='delete'>删除</a>"+
                            "</td></tr>");
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

                    //删除
                    deleted();
                    //修改
                    amend();
                    //批量删除
                    deleteBatch();
                    //搜索
                    search();
                    //导入
                    lead();
                    //导出
                    derive(json.totalPage);


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
    //回车查询
    $(".head .search-text").unbind("keypress").on("keypress",function (e) {
        var ev = document.all ? window.event : e;//兼容IE
        if (ev.keyCode == 13) {
            $(".head .search-btn").trigger("click");
        }
    });
}
//导入
function lead() {
    $(".lead").unbind("click").on("click",function(){
        $(".leadEx").fadeIn();
        $(".bg").css("height",$(document).height()).fadeIn();
        $(".leadEx .head h1").text("导入数据");

        // 确定导入
        $(".sureImport").unbind("click").on("click", function () {
            $(this).prev().val($(".academy .content ul li.on").attr("id"));
            $(this).next().val(ReadCookie("account"));
            $(this).next().next().val(ReadCookie("code"));
            $(this).next().next().next().val(ReadCookie("groupId"));
            $("#leadEx").unbind("submit").on("submit", function () {
                $("#leadEx").ajaxSubmit(options);
                return false; // 必须返回false，否则表单会自己再做一次提交操作，并且页面跳转
            });
            var options = {
                success: function (json) { //提交后的回调函数
                    if(json.result=="success"){
                        alert("导入成功");
                        $(".leadEx").fadeOut();
                        $(".bg").fadeOut();
                        $(".academy .content ul li.on p").trigger("click");
                    }else if(json.result=="fail"){
                        alert("服务器错误");
                    }else if(json.result=="empty file"){
                        alert("空文件");
                    }else if(json.result=="noPower"){
                        alert("没有权限");
                    }else if(json.result=="timeOver"){
                        alert("登陆过期");
                    }
                }
            }
        });


        //取消
        $(".btns3 a.clooe3,.leadEx .head i").unbind("click").on("click",function () {
            $(".leadEx").fadeOut();
            $(".bg").fadeOut();
        });
    });
}
//导出
function derive(page) {
    $(".derive").unbind("click").on("click",function(){
        var val=$("#select option:selected").val();
        var text=$(".head .search-text").val();
        var instituteNo=$(".academy .content ul li.on").attr("id");
        $(".deriveEx").fadeIn();
        $(".bg").css("height",$(document).height()).fadeIn();
        $(".deriveEx .head h1").text("导出数据");
        $(".deriveEx .cont").children().remove();
        $(".deriveEx .cont").append("<input type='radio' name='derive'><span>全部</span>");
        for (var i=0;i<page;i++){
            var input=$("<input type='radio' name='derive'>" +
                "<span>第"+(i+1)+"页</span>");
            $(".deriveEx .cont span:last-child").after(input);
        }
        $(".deriveEx .cont input").unbind("click").on("click",function () {
            $(this).attr("value","1");
            $(this).siblings().attr("value","0");
        })

        // 确定导出
        $(".sure4").unbind("click").on("click", function () {
            var page;
            $(".deriveEx .cont input").each(function () {
                if($(this).attr("value")=="1"){
                    page=$(this).next().text();
                }
            });
            if(page=="全部"){
                page="";
            }
            var sendData = {
                "account": ReadCookie("account"),
                "code": ReadCookie("code"),
                "keyword":text,
                "groupId":ReadCookie("groupId"),
                "organizationId":instituteNo,
                "pageSize":20,//每页显示12条
                "pageIndex":page,//第几页
            };
            $.ajax({
                url: "../organizer/exportExcel",
                type: "post",
                dataType: "json",
                data: JSON.stringify(sendData),
                contentType: "application/json",
                success: function (json) {
                    if (json.result == "success") {
                        alert("导出成功，文件在D://excel/下面");
                        $(".deriveEx").fadeOut();
                        $(".bg").fadeOut();
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


        //取消
        $(".btns3 a.clooe3,.deriveEx .head i").unbind("click").on("click",function () {
            $(".deriveEx").fadeOut();
            $(".bg").fadeOut();
        });
    });
}
//添加机构
function addOrginazer(){
    $(".middle .dowload>span").unbind("click").on("click",function(){
        $(".middle .dowload.open").removeClass("open");
        $(".middle>span").removeClass("on").removeClass("hover");
        $(".middle i").removeClass("on");
        $(".addconNews").fadeIn();
        $(".bg").css("height",$(document).height()).fadeIn();
        $(".addconNews .head h1").text("添加子机构");
        $(".addconNews ul li input").eq(0).val("");
        //确定
        $(".addconNews a.sureAdd").unbind("click").on("click",function () {
            var name=$(".addconNews ul li input").eq(0).val();

            if(name.length==0){
                alert("请填写名称");
            }else{
                var sendData = {
                    "name": name,
                    "account": ReadCookie("account"),
                    "code": ReadCookie("code"),
                    "groupId":ReadCookie("groupId"),
                }
                $.ajax({
                    url: "../organization/addOrganization",
                    type: "post",
                    dataType: "json",
                    contentType: "application/json",
                    data: JSON.stringify(sendData),
                    success:function(json){
                        if(json.result == "success"){
                            alert("添加成功");
                            $(".addconNews").fadeOut();
                            $(".bg").fadeOut();
                            academy();


                        }else if(json.result == "noPower"){
                            alert("你没有权限");
                        }else if(json.result == "timeOver"){
                            alert("登录过期");
                            window.location.href="loginAdmin.html";
                        }
                    }
                })

            }
        });

        //取消
        $(".btns3 a.clooe3,.addconNews .head i").unbind("click").on("click",function () {
            $(".addconNews").fadeOut();
            $(".bg").fadeOut();
        });
    });
}
//删除机构 //修改机构名称
function deleteOrginazer(){
    $(".academy .content ul li  .dowload>span").unbind("click").on("click",function(){
        if($(this).text()=="删除"){
            var id=$(this).parents().parents().attr("id");
            $(this).parents().removeClass("open");
            if(confirm("机构下面的人员一并删除，确定要删除吗？")) {
                var sendData = {
                    "id": id,
                    "account": ReadCookie("account"),
                    "code": ReadCookie("code"),
                    "groupId":ReadCookie("groupId"),
                };
                $.ajax({
                    url: "../organization/deleteOrganization",
                    type: "post",
                    dataType: "json",
                    contentType: "application/json",
                    data: JSON.stringify(sendData),
                    success: function (json) {
                        if (json.result == "success") {
                            alert("删除成功");
                            academy();
                        }else if(json.result == "noPower"){
                            alert("你没有权限");
                        }else if(json.result == "timeOver"){
                            alert("登录过期");
                            window.location.href="loginAdmin.html";
                        }
                    },
                    error: function () {
                        alert("数据加载出错", 1);
                    }
                });
            };
        }else if($(this).text()=="修改名称"){
            var id=$(this).parents().parents().attr("id");
            $(this).parents().removeClass("open");
            $(".addconNews").fadeIn();
            $(".bg").css("height",$(document).height()).fadeIn();
            $(".addconNews .head h1").text("修改机构名称");
            $(".addconNews ul li input").eq(0).val("");
            //确定
            $(".addconNews a.sureAdd").unbind("click").on("click",function () {
                var name=$(".addconNews ul li input").eq(0).val();

                if(name.length==0){
                    alert("请填写名称");
                }else{
                    var sendData = {
                        "name": name,
                        "account": ReadCookie("account"),
                        "code": ReadCookie("code"),
                        "groupId":ReadCookie("groupId"),
                        "id":id
                    }
                    $.ajax({
                        url: "../organization/updateOrganization",
                        type: "post",
                        dataType: "json",
                        contentType: "application/json",
                        data: JSON.stringify(sendData),
                        success:function(json){
                            if(json.result == "success"){
                                alert("修改成功");
                                $(".addconNews").fadeOut();
                                $(".bg").fadeOut();
                                academy();


                            }else if(json.result == "noPower"){
                                alert("你没有权限");
                            }else if(json.result == "timeOver"){
                                alert("登录过期");
                                window.location.href="loginAdmin.html";
                            }
                        }
                    })

                }
            });

            //取消
            $(".btns3 a.clooe3,.addconNews .head i").unbind("click").on("click",function () {
                $(".addconNews").fadeOut();
                $(".bg").fadeOut();
            });
        }
    });
}
//搜索机构
function searchOrginazer() {
    //搜索
    $(".academy .head i").unbind("click").on("click",function () {
        var text=$(".academy .head input").val();
        $(".academy .content ul").children().remove();
        var sendData = {
            "account": ReadCookie("account"),
            "code": ReadCookie("code"),
            "groupId":ReadCookie("groupId"),
            "name":text,
        };
        $.ajax({
            url: "../organization/selectOrganizationByName",
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
                            "<i class='icon-caozuo'></i>"+
                            "<div class='dowload'>"+
                            "<span>修改名称</span>"+
                            "<span>删除</span>"+
                            "</div>"+
                            "</li>");
                        $(".academy .content ul").append(li);
                    }

                    clickNav();
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
    });
    //回车查询
    $(".academy .head input").unbind("keypress").on("keypress",function (e) {
        var ev = document.all ? window.event : e;//兼容IE
        if (ev.keyCode == 13) {
            $(".academy .head i").trigger("click");
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