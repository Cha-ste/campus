/**
 * Created by Administrator on 2017/4/8.
 */
/**
 * Created by 平凡的世界 on 2017/3/3.
 */
$(function () {
    //获取所有学院
    academy();
    //添加课程
    addAdmin();
    //添加任课教师
    addTeacher();

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
        url: "/institute/selectInstitute",
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
function academycCick(index,text) {
    $(".academy .content ul li p").unbind("click").on("click",function () {
        $(".academyCon .head h1").text($(this).find("span").text());
        $(this).parent().addClass("on");
        $(this).parent().siblings().removeClass("on");
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
        };
        $.ajax({
            url: "/course/selectCourse",
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
                        $("#teacher").append(tr);
                    }
                    for(var i=0;i<json.array.length;i++){
                        var power=new Array();
                        var powerID=new Array();
                        for (var j=0;j<json.array[i].teachers.length ;j++ ) {
                            power.push(json.array[i].teachers[j].teacherName);
                            powerID.push(json.array[i].teachers[j].id);
                        }

                        var tr=$("<tr id='"+json.array[i].courseNo+"'>" +
                            "<td><input type='checkbox'></td>"+
                            "<td>"+json.array[i].order+"</td>"+
                            "<td>"+json.array[i].courseName+"</td>"+
                            "<td>"+power+"</td>"+
                            "<td>"+
                            "<a class='amend'>修改</a>"+
                            "<a class='delete'>删除</a>"+
                            "</td></tr>");
                        $("#teacher").append(tr);

                        $("#teacher tr").eq(i).data("teacherId", powerID);
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

                    //删除
                    deleted();
                    //修改
                    amend();
                    //批量删除
                    deleteBatch();
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
        "instituteId":$(".academy .content ul li.on").attr("id"),
        "groupId":ReadCookie("groupId"),
        "keyword":text,
        "pageSize":20,//每页显示12条
        "pageIndex":index,//第几页
    };
    $.ajax({
        url: "/course/selectCourse",
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
                    $("#teacher").append(tr);
                }
                for(var i=0;i<json.array.length;i++){
                    var power=new Array();
                    var powerID=new Array();
                    for (var j=0;j<json.array[i].teachers.length ;j++ ) {
                        power.push(json.array[i].teachers[j].teacherName);
                        powerID.push(json.array[i].teachers[j].id);
                    }

                    var tr=$("<tr id='"+json.array[i].courseNo+"'>" +
                        "<td><input type='checkbox'></td>"+
                        "<td>"+json.array[i].order+"</td>"+
                        "<td>"+json.array[i].courseName+"</td>"+
                        "<td>"+power+"</td>"+
                        "<td>"+
                        "<a class='amend'>修改</a>"+
                        "<a class='delete'>删除</a>"+
                        "</td></tr>");
                    $("#teacher").append(tr);

                    $("#teacher tr").eq(i).data("teacherId", powerID);
                }


                //删除
                deleted();
                //修改
                amend();
                //批量删除
                deleteBatch();
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
//修改
function amend() {
    $("#teacher a.amend").unbind("click").on("click",function(){
        var id = $(this).parent().parent().attr("id");
        var name=$(this).parent().parent().children().eq(2).text();
        var teacherIdTr=$(this).parent().parent();
        $(".conNewsAmend").fadeIn();
        $(".bg").css("height", $(document).height()).fadeIn();
        $("#courseName").val(name);
        $("#teacherCourseAmend").children().remove();
        //获取教师
        var sendData = {
            "instituteId": $(".academy>.content>ul>li.on").attr("id"),
            "account": ReadCookie("account"),
            "code": ReadCookie("code"),
            "groupId":ReadCookie("groupId"),
        }
        $.ajax({
            url: "/teacher/getTeacherByInstituteId",
            type: "post",
            dataType: "json",
            contentType: "application/json",
            data: JSON.stringify(sendData),
            success:function(json){
                if(json.result == "success"){

                    if(json.array.length==0){
                        var tr=$("<tr>"+
                            "<td colspan='3'>无消息数据</td>"+
                            "</tr>");
                        $("#teacherCourseAmend").append(tr);
                    }
                    for(var i=0;i<json.array.length;i++){

                        var tr=$("<tr id='"+json.array[i].id+"'>" +
                            "<td><input type='checkbox'></td>"+
                            "<td>"+json.array[i].teacherNo+"</td>"+
                            "<td>"+json.array[i].teacherName+"</td>"+
                            "</tr>");
                        $("#teacherCourseAmend").append(tr);
                    }

                    $(".teacherCou table input[type='checkbox']").unbind("click").on("click",function () {
                        if($(this).attr("checked")){
                            $(this).removeAttr("checked");
                            $(this).parent().parent().css("background","#fff");
                        }else{
                            $(this).attr("checked",true);
                            $(this).parent().parent().css("background","#efefef");
                        }
                    });
                    var teacherId=[];
                    teacherId=teacherIdTr.data("teacherId");

                    $("#teacherCourseAmend tr").each(function () {
                        var id=$(this).attr("id");
                        for(var i=0;i<teacherId.length;i++){
                            if(id==teacherId[i]){
                                $(this).children().eq(0).find("input").trigger("click");
                            }
                        }
                    })

                }else if(json.result == "noPower"){
                    alert("你没有权限");
                }else if(json.result == "timeOver"){
                    alert("登录过期");
                    window.location.href="loginAdmin.html";
                }
            }
        });

        //确定
        $(".conNewsAmend a.sure3").unbind("click").on("click",function () {
            var name=$("#courseName").val();
            var str=[];
            $(".teacherCou table input[type='checkbox']").each(function () {
                if($(this).attr("checked")){
                    str.push($(this).parents().parents().attr("id"));
                }
            });

            if(str.length==0) {
                alert("请选择教师");
            }else{
                var sendData = {
                    "courseId": id,
                    "courseName": name,
                    "teacherIds": str,
                    "account": ReadCookie("account"),
                    "code": ReadCookie("code"),
                    "groupId":ReadCookie("groupId"),
                }
                $.ajax({
                    url: "/course/updateCourse",
                    type: "post",
                    dataType: "json",
                    contentType: "application/json",
                    data: JSON.stringify(sendData),
                    success:function(json){
                        if(json.result == "success"){
                            alert("修改成功");
                            $(".conNewsAmend").fadeOut();
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
        $(".btns3 a.clooe3,.conNewsAmend .head i").unbind("click").on("click",function () {
            $(".conNewsAmend").fadeOut();
            $(".bg").fadeOut();
        });


    })
}
//删除
function deleted() {
    $("#teacher a.delete").unbind("click").on("click",function(){
        var str=[];
        str.push($(this).parents().parents().attr("id"));
        if(confirm("确定要删除吗？")) {
            var sendData = {
                "ids":str,
                "account": ReadCookie("account"),
                "code": ReadCookie("code"),
                "groupId":ReadCookie("groupId"),
            };
            $.ajax({
                url: "/course/deleteCourse",
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
//添加课程
function addAdmin() {

    $(".addAdmin").unbind("click").on("click",function(){
        $(".addconNews").fadeIn();
        $(".bg").css("height",$(document).height()).fadeIn();
        $(".addconNews .head h1").text("添加课程");
        $(".addconNews ul li span").text("课程名称：")
        $(".addconNews ul li input").eq(0).val("");
        //确定
        $(".addconNews a.sureAdd").unbind("click").on("click",function () {
            var name=$(".addconNews ul li input").eq(0).val();

            if(name.length==0){
                alert("请填写名称");
            }else{
                var sendData = {
                    "courseName": name,
                    "instituteId":$(".academy .content ul li.on").attr("id"),
                    "account": ReadCookie("account"),
                    "code": ReadCookie("code"),
                    "groupId":ReadCookie("groupId"),
                }
                $.ajax({
                    url: "/course/addCourse",
                    type: "post",
                    dataType: "json",
                    contentType: "application/json",
                    data: JSON.stringify(sendData),
                    success:function(json){
                        if(json.result == "success"){
                            alert("添加成功");
                            $(".addconNews").fadeOut();
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
        $(".btns3 a.clooe3,.addconNews .head i").unbind("click").on("click",function () {
            $(".addconNews").fadeOut();
            $(".bg").fadeOut();
        });
    })
}
//添加任课教师
function addTeacher() {

    $(".addTeacher").unbind("click").on("click",function(){
        $(".conNews").fadeIn();
        $(".bg").css("height",$(document).height()).fadeIn();
        couserTeacher();


        //确定
        $(".conNews a.sure3").unbind("click").on("click",function () {
            var name=$("#selectCourse option:selected").attr("id");
            var str=[];
            $(".teacherCou table input[type='checkbox']").each(function () {
                if($(this).attr("checked")){
                    str.push($(this).parents().parents().attr("id"));
                }
            });

            if(str.length==0) {
                alert("请选择教师");
            }else{
                var sendData = {
                    "courseId": name,
                    "teacherIds": str,
                    "account": ReadCookie("account"),
                    "code": ReadCookie("code"),
                    "groupId":ReadCookie("groupId"),
                }
                $.ajax({
                    url: "/course/addTeacherForCourse",
                    type: "post",
                    dataType: "json",
                    contentType: "application/json",
                    data: JSON.stringify(sendData),
                    success:function(json){
                        if(json.result == "success"){
                            alert("添加成功");
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
function couserTeacher() {
    $("#selectCourse").children().remove();
    //获取课程
    var sendData = {
        "instituteId": $(".academy>.content>ul>li.on").attr("id"),
        "account": ReadCookie("account"),
        "code": ReadCookie("code"),
        "groupId":ReadCookie("groupId"),
    }
    $.ajax({
        url: "/course/getCourseByInstituteId",
        type: "post",
        dataType: "json",
        contentType: "application/json",
        data: JSON.stringify(sendData),
        success:function(json){
            if(json.result == "success"){

                for(var i=0;i<json.array.length;i++){
                    var option=$("<option id='"+json.array[i].courseNo+"'>"+json.array[i].courseName+"</option>");
                    $("#selectCourse").append(option);
                }




            }else if(json.result == "noPower"){
                alert("你没有权限");
            }else if(json.result == "timeOver"){
                alert("登录过期");
                window.location.href="loginAdmin.html";
            }
        }
    });

    $("#teacherCourse").children().remove();
    //获取教师
    var sendData = {
        "instituteId": $(".academy>.content>ul>li.on").attr("id"),
        "account": ReadCookie("account"),
        "code": ReadCookie("code"),
        "groupId":ReadCookie("groupId"),
    }
    $.ajax({
        url: "/teacher/getTeacherByInstituteId",
        type: "post",
        dataType: "json",
        contentType: "application/json",
        data: JSON.stringify(sendData),
        success:function(json){
            if(json.result == "success"){

                if(json.array.length==0){
                    var tr=$("<tr>"+
                        "<td colspan='3'>无消息数据</td>"+
                        "</tr>");
                    $("#teacherCourse").append(tr);
                }
                for(var i=0;i<json.array.length;i++){

                    var tr=$("<tr id='"+json.array[i].id+"'>" +
                        "<td><input type='checkbox'></td>"+
                        "<td>"+json.array[i].teacherNo+"</td>"+
                        "<td>"+json.array[i].teacherName+"</td>"+
                        "</tr>");
                    $("#teacherCourse").append(tr);
                }

                $(".teacherCou table input[type='checkbox']").unbind("click").on("click",function () {
                    if($(this).attr("checked")){
                        $(this).removeAttr("checked");
                        $(this).parent().parent().css("background","#fff");
                    }else{
                        $(this).attr("checked",true);
                        $(this).parent().parent().css("background","#efefef");
                    }
                });

            }else if(json.result == "noPower"){
                alert("你没有权限");
            }else if(json.result == "timeOver"){
                alert("登录过期");
                window.location.href="loginAdmin.html";
            }
        }
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
                    url: "/course/deleteCourse",
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
        var text=$(".head .search-text").val();
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
