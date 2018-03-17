/**
 * Created by 平凡的世界 on 2017/3/3.
 */
$(function () {
    //获取所有学院
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
        $("#teacher").children().remove();
        var sendData = {
            "account": ReadCookie("account"),
            "code": ReadCookie("code"),
            "instituteNo":id,
            "groupId":ReadCookie("groupId"),
            "tDegree":val,
            "keyword":text,
            "pageSize":20,//每页显示12条
            "pageIndex":index,//第几页
        };
        $.ajax({
            url: "../teacher/selectTeacher",
            type: "post",
            dataType: "json",
            data: JSON.stringify(sendData),
            contentType: "application/json",
            success: function (json) {
                if (json.result == "success") {
                    if(json.array.length==0){
                        var tr=$("<tr>"+
                            "<td colspan='9'>无消息数据</td>"+
                            "</tr>");
                        $("#teacher").append(tr);
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

                        var tr=$("<tr id='"+json.array[i].id+"'>" +
                            "<td><input type='checkbox'></td>"+
                            "<td>"+json.array[i].order+"</td>"+
                            "<td>"+json.array[i].teacherName+"</td>"+
                            "<td><img src='"+json.array[i].teacherPicture+"'/></td>"+
                            "<td>"+json.array[i].teacherNo+"</td>"+
                            "<td>"+json.array[i].teacherTell+"</td>"+
                            "<td>"+json.array[i].teacherMail+"</td>"+
                            "<td>"+power+"</td>"+
                            "<td>"+
                            "<a class='details'>查看</a>"+
                            "<a class='amend'>修改</a>"+
                            "<a class='delete'>删除</a>"+
                            "</td></tr>");
                        $("#teacher").append(tr);
                        if(json.array[i].status==0){
                            $("#teacher tr").eq(i).css("background","#eee")
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
                            academycCickPage(index.getCurrent(),text,val)
                        }
                    });

                    //查看
                    details();
                    //删除
                    deleted();
                    //修改
                    amend();
                    //批量删除
                    deleteBatch();
                    //搜索
                    search();
                    //禁用
                    freeze();
                    //解禁
                    unfreeze();
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
        "instituteNo":$(".academy .content ul li.on").attr("id"),
        "groupId":ReadCookie("groupId"),
        "tDegree":val,
        "keyword":text,
        "pageSize":20,//每页显示12条
        "pageIndex":index,//第几页
    };
    $.ajax({
        url: "../teacher/selectTeacher",
        type: "post",
        dataType: "json",
        data: JSON.stringify(sendData),
        contentType: "application/json",
        success: function (json) {
            if (json.result == "success") {
                if(json.array.length==0){
                    var tr=$("<tr>"+
                        "<td colspan='9'>无消息数据</td>"+
                        "</tr>");
                    $("#teacher").append(tr);
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

                    var tr=$("<tr id='"+json.array[i].id+"'>" +
                        "<td><input type='checkbox'></td>"+
                        "<td>"+json.array[i].order+"</td>"+
                        "<td>"+json.array[i].teacherName+"</td>"+
                        "<td><img src='"+json.array[i].teacherPicture+"'></td>"+
                        "<td>"+json.array[i].teacherNo+"</td>"+
                        "<td>"+json.array[i].teacherTell+"</td>"+
                        "<td>"+json.array[i].teacherMail+"</td>"+
                        "<td>"+power+"</td>"+
                        "<td>"+
                        "<a class='details'>查看</a>"+
                        "<a class='amend'>修改</a>"+
                        "<a class='delete'>删除</a>"+
                        "</td></tr>");
                    $("#teacher").append(tr);
                    if(json.array[i].status==0){
                        $("#teacher tr").eq(i).css("background","#eee")
                    }
                }


                //删除
                deleted();
                //修改
                amend();
                //批量删除
                deleteBatch();
                //搜索
                search();
                //禁用
                freeze();
                //解禁
                unfreeze();
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

//查看
function details() {
    $(".table a.details").unbind("click").on("click",function() {
        var id = $(this).parent().parent().attr("id");
        $(".conNews").fadeIn();
        $(".bg").css("height", $(document).height()).fadeIn();
        $(".btns3 a.clooe3").fadeOut();
        $("#upload-img").fadeOut();
        $(".uploadimage").fadeOut();
        $(".conNews .head h1").text("教师详情");
        $(".conNews ul li input,.conNews ul li select,.conNews ul li textarea").removeAttr("readonly");
        $(".conNews ul li input,.conNews ul li select,.conNews ul li textarea").removeAttr("disabled");
        $(".conNews ul li input[type='checkbox']").eq(0).removeAttr("checked");
        $(".conNews ul li input[type='checkbox']").eq(1).removeAttr("checked");
        $(".conNews ul li input[type='checkbox']").eq(2).removeAttr("checked");
        $(".conNews ul li input[type='checkbox']").eq(3).removeAttr("checked");
        $(".conNews ul li input[type='checkbox']").eq(4).removeAttr("checked");
        $(".conNews ul li input[type='checkbox']").eq(5).removeAttr("checked");
        var sendData = {
            "id": id,
            "account": ReadCookie("account"),
            "code": ReadCookie("code"),
            "groupId":ReadCookie("groupId"),
        }
        $.ajax({
            url: "../teacher/getTeacher",
            type: "post",
            dataType: "json",
            contentType: "application/json",
            data: JSON.stringify(sendData),
            success: function (json) {
                if (json.result == "success") {
                    $("#imghead").attr("src",json.teacher.teacherPicture);
                    $(".conNews ul li input").eq(5).val(json.teacher.teacherName);
                    $(".conNews ul li input").eq(6).val(json.teacher.teacherNo);
                    $(".conNews ul li input").eq(7).val(json.teacher.teacherTell);
                    $(".conNews ul li input").eq(8).val(json.teacher.teacherMail);
                    $(".conNews ul li textarea").val(json.teacher.expression);
                    for(var i=0;i<json.teacher.TDegree.length;i++){
                        if(json.teacher.TDegree[i]=="1"){
                            $(".conNews ul li input[type='checkbox']").eq(0).trigger("click");
                        }
                        if(json.teacher.TDegree[i]=="2"){
                            $(".conNews ul li input[type='checkbox']").eq(1).trigger("click");
                        }
                        if(json.teacher.TDegree[i]=="3"){
                            $(".conNews ul li input[type='checkbox']").eq(2).trigger("click");
                        }
                        if(json.teacher.TDegree[i]=="4"){
                            $(".conNews ul li input[type='checkbox']").eq(3).trigger("click");
                        }
                        if(json.teacher.TDegree[i]=="5"){
                            $(".conNews ul li input[type='checkbox']").eq(4).trigger("click");
                        }
                        if(json.teacher.TDegree[i]=="6"){
                            $(".conNews ul li input[type='checkbox']").eq(5).trigger("click");
                        }
                    }

                    $(".conNews ul li input,.conNews ul li select,.conNews ul li textarea").attr("readonly","readonly");
                    $(".conNews ul li input[type='checkbox']").attr("disabled","disabled")
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
//修改
function amend() {
    $("#teacher a.amend").unbind("click").on("click",function(){
        var id = $(this).parent().parent().attr("id");
        $(".conNews").fadeIn();
        $(".bg").css("height", $(document).height()).fadeIn();
        $(".conNews .head h1").text("修改教师");
        $("#upload-img").fadeIn();
        $(".conNews ul li input,.conNews ul li select,.conNews ul li textarea").removeAttr("readonly");
        $(".conNews ul li input,.conNews ul li select,.conNews ul li textarea").removeAttr("disabled");
        $(".conNews ul li input[type='checkbox']").eq(0).removeAttr("checked");
        $(".conNews ul li input[type='checkbox']").eq(1).removeAttr("checked");
        $(".conNews ul li input[type='checkbox']").eq(2).removeAttr("checked");
        $(".conNews ul li input[type='checkbox']").eq(3).removeAttr("checked");
        $(".conNews ul li input[type='checkbox']").eq(4).removeAttr("checked");
        $(".conNews ul li input[type='checkbox']").eq(5).removeAttr("checked");

        var sendData = {
            "id": id,
            "account": ReadCookie("account"),
            "code": ReadCookie("code"),
            "groupId":ReadCookie("groupId"),
        }
        $.ajax({
            url: "../teacher/getTeacher",
            type: "post",
            dataType: "json",
            contentType: "application/json",
            data: JSON.stringify(sendData),
            success:function(json){
                if(json.result == "success"){

                    $("#imghead").attr("src",json.teacher.teacherPicture);
                    $(".conNews ul li input").eq(5).val(json.teacher.teacherName);
                    $(".conNews ul li input").eq(6).val(json.teacher.teacherNo);
                    $(".conNews ul li input").eq(7).val(json.teacher.teacherTell);
                    $(".conNews ul li input").eq(8).val(json.teacher.teacherMail);
                    $(".conNews ul li textarea").val(json.teacher.expression);
                    for(var i=0;i<json.teacher.TDegree.length;i++){
                        if(json.teacher.TDegree[i]=="1"){
                            $(".conNews ul li input[type='checkbox']").eq(0).trigger("click");
                        }
                        if(json.teacher.TDegree[i]=="2"){
                            $(".conNews ul li input[type='checkbox']").eq(1).trigger("click");
                        }
                        if(json.teacher.TDegree[i]=="3"){
                            $(".conNews ul li input[type='checkbox']").eq(2).trigger("click");
                        }
                        if(json.teacher.TDegree[i]=="4"){
                            $(".conNews ul li input[type='checkbox']").eq(3).trigger("click");
                        }
                        if(json.teacher.TDegree[i]=="5"){
                            $(".conNews ul li input[type='checkbox']").eq(4).trigger("click");
                        }
                        if(json.teacher.TDegree[i]=="6"){
                            $(".conNews ul li input[type='checkbox']").eq(5).trigger("click");
                        }
                    }
                    $(".conNews ul li input,.conNews ul li select,.conNews ul li textarea").removeAttr("readonly");
                    $(".conNews ul li input,.conNews ul li select,.conNews ul li textarea").removeAttr("disabled");



                }else if(json.result == "noPower"){
                    alert("你没有权限");
                }else if(json.result == "timeOver"){
                    alert("登录过期");
                    window.location.href="loginAdmin.html";
                }
            }
        })
        //上传图片
        $("#upload-img").unbind("click").on("click",function () {
            $(this).prev().trigger("click");
        });
        // 上传图片
        $(".uploadimage").unbind("click").on("click", function () {
            $(this).next().val(ReadCookie("account"));
            $(this).next().next().val(ReadCookie("code"));
            $(this).next().next().next().val(ReadCookie("groupId"));
            $("#upForm").unbind("submit").on("submit", function () {
                $("#upForm").ajaxSubmit(options);
                return false; // 必须返回false，否则表单会自己再做一次提交操作，并且页面跳转
            });
            var options = {
                success: function (json) { //提交后的回调函数
                    if(json.result=="success"){
                        $("#imghead").attr("src",json.teacherPic);
                        $(".uploadimage").fadeOut();
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

        //确定
        $(".btns3 a.sure3").unbind("click").on("click",function () {
            var teacherPictuer=$("#imghead").attr("src");
            var name=$(".conNews ul li input").eq(5).val();
            var teacherNo=$(".conNews ul li input").eq(6).val();
            var phone=$(".conNews ul li input").eq(7).val();
            var emil=$(".conNews ul li input").eq(8).val();
            var expression=$(".conNews ul li textarea").val();
            var str=[];
            $(".conNews ul li input[type='checkbox']").each(function () {
                if($(this).attr("checked")){
                    str.push($(this).val());
                }
            })
            if(name.length==0){
                alert("请填写用户名");
            }else if(phone.length==0){
                alert("请填写手机号码");
            }else if(emil.length==0){
                alert("请填写邮箱");
            }else if(teacherNo.length==0){
                alert("请填写教工号");
            }else{
                var sendData = {
                    "teacherPicture": teacherPictuer,
                    "teacherName": name,
                    "teacherNo":teacherNo,
                    "teacherTell":phone,
                    "teacherMail":emil,
                    "expression":expression,
                    "account": ReadCookie("account"),
                    "code": ReadCookie("code"),
                    "groupId":ReadCookie("groupId"),
                    "teacherDegree":str,
                    "instituteNo":$(".academy .content ul li.on").attr("id"),
                    "id":id,
                }
                $.ajax({
                    url: "../teacher/updateTeacher",
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
                url: "../teacher/deleteTeacher",
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
        $(".conNews .head h1").text("添加教师");
        $(".conNews ul li input").eq(0).val("");
        $(".conNews ul li input").eq(2).val("");
        $(".conNews ul li input").eq(3).val("");
        $(".conNews ul li input").eq(4).val("");
        $(".conNews ul li input").eq(5).val("");
        $(".conNews ul li input").eq(6).val("");
        $(".conNews ul li input").eq(7).val("");
        $(".conNews ul li input").eq(8).val("");
        $(".conNews ul li textarea").val("");
        $(".conNews ul li input[type='checkbox']").eq(0).removeAttr("checked");
        $(".conNews ul li input[type='checkbox']").eq(1).removeAttr("checked");
        $(".conNews ul li input[type='checkbox']").eq(2).removeAttr("checked");
        $(".conNews ul li input[type='checkbox']").eq(3).removeAttr("checked");
        $(".conNews ul li input[type='checkbox']").eq(4).removeAttr("checked");
        $(".conNews ul li input[type='checkbox']").eq(5).removeAttr("checked");

        //上传图片
        $("#upload-img").unbind("click").on("click",function () {
            $(this).prev().trigger("click");
        });
        // 上传图片
        $(".uploadimage").unbind("click").on("click", function () {
            $(this).next().val(ReadCookie("account"));
            $(this).next().next().val(ReadCookie("code"));
            $(this).next().next().next().val(ReadCookie("groupId"));
            $("#upForm").unbind("submit").on("submit", function () {
                $("#upForm").ajaxSubmit(options);
                return false; // 必须返回false，否则表单会自己再做一次提交操作，并且页面跳转
            });
            var options = {
                success: function (json) { //提交后的回调函数
                    if(json.result=="success"){
                        alert("上传成功");
                        $("#imghead").attr("src",json.teacherPic);
                        $(".uploadimage").fadeOut();
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

        //确定
        $(".btns3 a.sure3").unbind("click").on("click",function () {
            var teacherPictuer=$("#imghead").attr("src");
            var name=$(".conNews ul li input").eq(5).val();
            var teacherNo=$(".conNews ul li input").eq(6).val();
            var phone=$(".conNews ul li input").eq(7).val();
            var emil=$(".conNews ul li input").eq(8).val();
            var expression=$(".conNews ul li textarea").val();
            var str=[];
            $(".conNews ul li input[type='checkbox']").each(function () {
                if($(this).attr("checked")){
                    str.push($(this).val());
                }
            })
            if(name.length==0){
                alert("请填写用户名");
            }else if(phone.length==0){
                alert("请填写手机号码");
            }else if(emil.length==0){
                alert("请填写邮箱");
            }else if(teacherNo.length==0){
                alert("请填写教工号");
            }else{
                var sendData = {
                    "teacherPicture": teacherPictuer,
                    "teacherName": name,
                    "teacherNo":teacherNo,
                    "teacherTell":phone,
                    "teacherMail":emil,
                    "expression":expression,
                    "account": ReadCookie("account"),
                    "code": ReadCookie("code"),
                    "groupId":ReadCookie("groupId"),
                    "teacherDegree":str,
                    "instituteNo":$(".academy .content ul li.on").attr("id"),
                }
                $.ajax({
                    url: "../teacher/addTeacher",
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
                    "teacherIds":str ,
                    "account": ReadCookie("account"),
                    "code": ReadCookie("code"),
                    "groupId":ReadCookie("groupId"),
                };
                $.ajax({
                    url: "../teacher/deleteTeacherBatch",
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
//禁用
function freeze() {
    $(".freeze").unbind("click").on("click",function(){
        var str=[];
        $(".academyCon table input[type='checkbox']").each(function () {
            if($(this).attr("checked")){
                str.push($(this).parents().parents().attr("id"));
            }
        });
        if(str.length!=0) {
            if(confirm("确定要禁用吗？")) {
                var sendData = {
                    "teacherIds":str ,
                    "account": ReadCookie("account"),
                    "code": ReadCookie("code"),
                    "groupId":ReadCookie("groupId"),
                };
                $.ajax({
                    url: "../teacher/freeze",
                    type: "post",
                    dataType: "json",
                    contentType: "application/json",
                    data: JSON.stringify(sendData),
                    success: function (json) {
                        if (json.result == "success") {
                            alert("禁用成功");
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
//解禁
function unfreeze() {
    $(".unfreeze").unbind("click").on("click",function(){
        var str=[];
        $(".academyCon table input[type='checkbox']").each(function () {
            if($(this).attr("checked")){
                str.push($(this).parents().parents().attr("id"));
            }
        });
        if(str.length!=0) {
            if(confirm("确定要解禁吗？")) {
                var sendData = {
                    "teacherIds":str ,
                    "account": ReadCookie("account"),
                    "code": ReadCookie("code"),
                    "groupId":ReadCookie("groupId"),
                };
                $.ajax({
                    url: "../teacher/unFreeze",
                    type: "post",
                    dataType: "json",
                    contentType: "application/json",
                    data: JSON.stringify(sendData),
                    success: function (json) {
                        if (json.result == "success") {
                            alert("解禁成功");
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
    //状态
    $("#select").unbind("change").on("change",function () {
        var val=$("#select option:selected").val();
        $("#adminPower").children().remove();
        $("#teacher").children().remove();
        var sendData = {
            "account": ReadCookie("account"),
            "code": ReadCookie("code"),
            "tDegree":val,
            "keyword":"",
            "groupId":ReadCookie("groupId"),
            "instituteNo":$(".academy .content ul li.on").attr("id"),
            "pageSize":20,//每页显示12条
            "pageIndex":1,//第几页
        };
        $.ajax({
            url: "../teacher/selectTeacher",
            type: "post",
            dataType: "json",
            data: JSON.stringify(sendData),
            contentType: "application/json",
            success: function (json) {
                if (json.result == "success") {
                    if(json.array.length==0){
                        var tr=$("<tr>"+
                            "<td colspan='9'>无消息数据</td>"+
                            "</tr>");
                        $("#teacher").append(tr);
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

                        var tr=$("<tr id='"+json.array[i].id+"'>" +
                            "<td><input type='checkbox'></td>"+
                            "<td>"+json.array[i].order+"</td>"+
                            "<td>"+json.array[i].teacherName+"</td>"+
                            "<td><img src='"+json.array[i].teacherPicture+"'></td>"+
                            "<td>"+json.array[i].teacherNo+"</td>"+
                            "<td>"+json.array[i].teacherTell+"</td>"+
                            "<td>"+json.array[i].teacherMail+"</td>"+
                            "<td>"+power+"</td>"+
                            "<td>"+
                            "<a class='details'>查看</a>"+
                            "<a class='amend'>修改</a>"+
                            "<a class='delete'>删除</a>"+
                            "</td></tr>");
                        $("#teacher").append(tr);
                        if(json.array[i].status==0){
                            $("#teacher tr").eq(i).css("background","#eee")
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
                            academycCickPage(index.getCurrent(),text,val)
                        }
                    });

                    //查看
                    details();
                    //删除
                    deleted();
                    //修改
                    amend();
                    //批量删除
                    deleteBatch();
                    //搜索
                    search();
                    //禁用
                    freeze();
                    //解禁
                    unfreeze();
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
    //搜索
    $(".head .search-btn").unbind("click").on("click",function () {
        var val=$("#select option:selected").val();
        var text=$(".head .search-text").val();
        $("#teacher").children().remove();
        var sendData = {
            "account": ReadCookie("account"),
            "code": ReadCookie("code"),
            "tDegree":val,
            "keyword":text,
            "groupId":ReadCookie("groupId"),
            "instituteNo":$(".academy .content ul li.on").attr("id"),
            "pageSize":20,//每页显示12条
            "pageIndex":1,//第几页
        };
        $.ajax({
            url: "../teacher/selectTeacher",
            type: "post",
            dataType: "json",
            data: JSON.stringify(sendData),
            contentType: "application/json",
            success: function (json) {
                if (json.result == "success") {
                    if(json.array.length==0){
                        var tr=$("<tr>"+
                            "<td colspan='9'>无消息数据</td>"+
                            "</tr>");
                        $("#teacher").append(tr);
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

                        var tr=$("<tr id='"+json.array[i].id+"'>" +
                            "<td><input type='checkbox'></td>"+
                            "<td>"+json.array[i].order+"</td>"+
                            "<td>"+json.array[i].teacherName+"</td>"+
                            "<td><img src='"+json.array[i].teacherPicture+"'></td>"+
                            "<td>"+json.array[i].teacherNo+"</td>"+
                            "<td>"+json.array[i].teacherTell+"</td>"+
                            "<td>"+json.array[i].teacherMail+"</td>"+
                            "<td>"+power+"</td>"+
                            "<td>"+
                            "<a class='details'>查看</a>"+
                            "<a class='amend'>修改</a>"+
                            "<a class='delete'>删除</a>"+
                            "</td></tr>");
                        $("#teacher").append(tr);
                        if(json.array[i].status==0){
                            $("#teacher tr").eq(i).css("background","#eee")
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
                            academycCickPage(index.getCurrent(),text,val)
                        }
                    });

                    //查看
                    details();
                    //删除
                    deleted();
                    //修改
                    amend();
                    //批量删除
                    deleteBatch();
                    //搜索
                    search();
                    //禁用
                    freeze();
                    //解禁
                    unfreeze();
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
                "instituteNo":instituteNo,
                "tDegree":val,
                "pageSize":20,//每页显示12条
                "pageIndex":page,//第几页
            };
            $.ajax({
                url: "../teacher/exportExcel",
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
//图片预览
function previewImage(file) {
    var MAXWIDTH  = 260;
    var MAXHEIGHT = 180;
    var div = document.getElementById('preview');
    if (file.files && file.files[0])
    {
        //限制大小
        var size=file.files.item(0).size/1024;
        if(size>2000){
            alert("文件大于2000kb,请上传较小的图片",2);
            return false;
        }
        //限制格式
        //console.info(file.files.item(0).name);//获取文件名称
        //console.info(file.files.item(0).type);//获取文件类型
        var filePath=file.files.item(0).name;
        var type=filePath.substr(filePath.indexOf('.')+1).toLowerCase();//获取后缀
        console.info(type);
        if(type=="png"||type=="jpg"||type=="jpeg"){

        }else{
            alert("格式不正确，上传格式只能为png,jpg,jpeg格式,或者图片命名不能有点",2)
            return false;
        }


        //div.innerHTML ='<img id=log_show>';
        var img = document.getElementById('imghead');
//         img.onload = function(){
//             var rect = clacImgZoomParam(MAXWIDTH, MAXHEIGHT, img.offsetWidth, img.offsetHeight);
//             img.width  =  rect.width;
//             img.height =  rect.height;
// //                 img.style.marginLeft = rect.left+'px';
//             img.style.marginTop = rect.top+'px';
//             img.style.display ="block";
//             img.style.marginLeft ="auto";
//             img.style.marginRight ="auto";
//         }
        var reader = new FileReader();
        reader.onload = function(evt){img.src = evt.target.result;}
        reader.readAsDataURL(file.files[0]);

        $(".uploadimage").fadeIn();
    }
    else //兼容IE
    {
        var sFilter='filter:progid:DXImageTransform.Microsoft.AlphaImageLoader(sizingMethod=scale,src="';
        file.select();
        var src = document.selection.createRange().text;
        //div.innerHTML = '<img id=log_show>';
        var img = document.getElementById('imghead');
        img.filters.item('DXImageTransform.Microsoft.AlphaImageLoader').src = src;
        // var rect = clacImgZoomParam(MAXWIDTH, MAXHEIGHT, img.offsetWidth, img.offsetHeight);
        // status =('rect:'+rect.top+','+rect.left+','+rect.width+','+rect.height);
        // div.innerHTML = "<div id=divhead style='width:"+rect.width+"px;height:"+rect.height+"px;margin-top:"+rect.top/2+"px;"+sFilter+src+"\"'></div>";
        $(".uploadimage").fadeIn();
    }
    // file.stopPropagation();
}