/**
 * Created by Administrator on 2017/4/8.
 */
/**
 * Created by 平凡的世界 on 2017/3/3.
 */
$(function () {
    //获取所有学院
    academy();


});
function clickNav() {
    //鼠标滑过
    $(".academy>.content>ul>li").mouseenter(function (e) {
        if(!$(this).hasClass("on")){
            $(this).addClass("hover");
            e.preventDefault();
        }
    }).mouseleave(function (e) {
        if(!$(this).hasClass("on")){
            $(this).removeClass("hover");
            e.preventDefault();
        }
    });
    // $(".academy>.content>ul>li>.profession>li").mouseenter(function (e) {
    //     if(!$(this).hasClass("on")){
    //         $(this).addClass("hover");
    //         e.preventDefault();
    //     }
    // }).mouseleave(function (e) {
    //     if(!$(this).hasClass("on")){
    //         $(this).removeClass("hover");
    //         e.preventDefault();
    //     }
    // });
    // $(".academy>.content>ul>li>.profession>li>.getClass>li").mouseenter(function (e) {
    //     if(!$(this).hasClass("on")){
    //         $(this).addClass("hover");
    //         e.preventDefault();
    //     }
    // }).mouseleave(function (e) {
    //     if(!$(this).hasClass("on")){
    //         $(this).removeClass("hover");
    //         e.preventDefault();
    //     }
    // });

    // //点击
    // $(".academy>.content>ul>li>i.icon-sanjiao").unbind("click").on("click",function () {
    //
    //     if($(this).next().next().hasClass("in")){
    //         $(this).next().next().removeClass("in");
    //     }else{
    //         $(".academy .content ul li ol.profession.in").each(function () {
    //             $(this).removeClass("in")
    //         })
    //         $(this).next().next().addClass("in");
    //     }
    //     academycCick(1,"")
    // });
    //
    // $(".academy>.content>ul>li>.profession>li>i.icon-sanjiao").unbind("click").on("click",function () {
    //     if($(this).next().next().hasClass("in")){
    //         $(this).next().next().removeClass("in");
    //     }else{
    //         $(this).next().next().addClass("in");
    //     }
    //     academycCick(1,"")
    //
    // })

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
                        "<p>" +
                        "<i class='icon-wenjian'></i>" +
                        "<span>"+json.array[i].instituteName+"</span>" +
                        "</p>"+
                        "</li>");
                    $(".academy .content ul").append(li);
                    //获取专业

                }
                //点击导航
                clickNav();
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

//点击
function academycCick(index,text,cou,clas) {
    //点击学院
    $(".academy>.content>ul>li>p").unbind("click").on("click",function () {
        $(".academyCon .head h1").text($(this).find("span").text());
        $(this).parent().addClass("on");
        $(this).parent().siblings().removeClass("on").removeClass("hover");
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
            "courseId":cou,
            "classNo":clas
        };
        $.ajax({
            url: "../schedule/getScheduleInInstitute",
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
                            "<td id='"+json.array[i].classNo+"'>"+json.array[i].className+"</td>"+
                            "<td id='"+json.array[i].courseNo+"'>"+json.array[i].courseName+"</td>"+
                            "<td id='"+json.array[i].teacherNo+"'>"+json.array[i].teacherName+"</td>"+
                            "<td>"+json.array[i].year+"</td>"+
                            "<td>"+json.array[i].term+"</td>"+
                            "<td>"+json.array[i].week+"</td>"+
                            "<td>"+json.array[i].time+"</td>"+
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
                            academycCickPage(index.getCurrent(),text,cou,clas)
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
    $(".academy>.content>ul>li:first-child>p").trigger("click");
    //添加课程
    addTeacher($(".academy>.content>ul>li.on").attr("id"));
    allCourse($(".academy>.content>ul>li.on").attr("id"));
    allClass($(".academy>.content>ul>li.on").attr("id"));




}
function allCourse(val) {
    $(".newsState").children().not($(".newsState option:first-child")).remove();
    //获取课程
    var sendData = {
        "instituteId": val,
        "account": ReadCookie("account"),
        "code": ReadCookie("code"),
        "groupId":ReadCookie("groupId"),
    }
    $.ajax({
        url: "../course/getCourseByInstituteId",
        type: "post",
        dataType: "json",
        contentType: "application/json",
        data: JSON.stringify(sendData),
        success:function(json){
            if(json.result == "success"){

                for(var i=0;i<json.array.length;i++){
                    var option=$("<option id='"+json.array[i].courseNo+"'>"+json.array[i].courseName+"</option>");
                    $(".newsState").append(option);
                }


            }else if(json.result == "noPower"){
                alert("你没有权限");
            }else if(json.result == "timeOver"){
                alert("登录过期");
                window.location.href="loginAdmin.html";
            }
        }
    });
}
function allClass(val) {
    $(".newsType").children().not($(".newsType option:first-child")).remove()
    //获取班级
    var sendData = {
        "instituteId": val,
        "keyword":"",
        "account": ReadCookie("account"),
        "code": ReadCookie("code"),
        "groupId":ReadCookie("groupId"),
    }
    $.ajax({
        url: "../class/selectClass",
        type: "post",
        dataType: "json",
        contentType: "application/json",
        data: JSON.stringify(sendData),
        success:function(json){
            if(json.result == "success"){

                for(var i=0;i<json.array.length;i++){
                    var option=$("<option id='"+json.array[i].classNo+"'>"+json.array[i].className+"</option>");
                    $(".newsType").append(option);
                }


            }else if(json.result == "noPower"){
                alert("你没有权限");
            }else if(json.result == "timeOver"){
                alert("登录过期");
                window.location.href="loginAdmin.html";
            }
        }
    });
}
//翻页
function academycCickPage(index,text,cou,clas) {
    $("#teacher").children().remove();
    var sendData = {
        "instituteId":$(".academy .content ul li.on").attr("id"),
        "account": ReadCookie("account"),
        "code": ReadCookie("code"),
        "groupId":ReadCookie("groupId"),
        "keyword":text,
        "pageSize":20,//每页显示12条
        "pageIndex":index,//第几页
        "courseId":cou,
        "classNo":clas
    };
    $.ajax({
        url: "../schedule/getScheduleInInstitute",
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
                        "<td id='"+json.array[i].classNo+"'>"+json.array[i].className+"</td>"+
                        "<td id='"+json.array[i].courseNo+"'>"+json.array[i].courseName+"</td>"+
                        "<td id='"+json.array[i].teacherNo+"'>"+json.array[i].teacherName+"</td>"+
                        "<td>"+json.array[i].year+"</td>"+
                        "<td>"+json.array[i].term+"</td>"+
                        "<td>"+json.array[i].week+"</td>"+
                        "<td>"+json.array[i].time+"</td>"+
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
        var className=$(this).parent().parent().find("td").eq(2).text();
        var classNo=$(this).parent().parent().find("td").eq(2).attr("id");
        var courseName=$(this).parent().parent().find("td").eq(3).text();
        var courseNo=$(this).parent().parent().find("td").eq(3).attr("id");
        var teacherName=$(this).parent().parent().find("td").eq(4).text();
        var teacherNo=$(this).parent().parent().find("td").eq(4).attr("id");
        var term=$(this).parent().parent().find("td").eq(6).text();
        var time=$(this).parent().parent().find("td").eq(8).text();
        var week=$(this).parent().parent().find("td").eq(7).text();
        var year=$(this).parent().parent().find("td").eq(5).text();
        var id = $(this).parent().parent().attr("id");
        $(".conNews").fadeIn();
        $(".bg").css("height",$(document).height()).fadeIn();

        $("#selectClass").children().remove();
        $("#selectClass").append("<option id='"+classNo+"'>"+className+"</option>")

        couserTeacher($(".academy>.content>ul>li.on").attr("id"));


        $("#year").val(year);
        $("#term").val(term);
        $("#time").val(time);
        $("#week").val(week);

        //确定
        $(".conNews a.sure3").unbind("click").on("click",function () {
            var nameClass=$("#selectClass option:selected").attr("id");
            var nameCouser=$("#selectCourse option:selected").attr("id");
            var nameTeacher=$("#teacherCourse option:selected").attr("id");
            var nameYear=$("#year option:selected").val();
            var nameTerm=$("#term option:selected").val();
            var nameWeek=$("#week option:selected").val();
            var nameTime=$("#time option:selected").val();
            var className=$("#selectClass option:selected").val();
            var teacherName=$("#teacherCourse option:selected").val();
            var couserName=$("#selectCourse option:selected").val();



            if(nameCouser.length==0) {
                alert("请选择课程");
            }else if(nameTeacher.length==0) {
                alert("请选择老师");
            }else if(nameYear.length==0) {
                alert("请选择年份");
            }else if(nameTerm.length==0) {
                alert("请选择学期");
            }else if(nameWeek.length==0) {
                alert("请选择星期");
            }else if(nameTime.length==0) {
                alert("请选择时间");
            }else{
                var sendData = {
                    "id":id,
                    "classNo":nameClass,
                    "courseId": nameCouser,
                    "teacherNo": nameTeacher,
                    "year": nameYear,
                    "term": nameTerm,
                    "week": nameWeek,
                    "time": nameTime,
                    "instituteId": $(".academy>.content>ul>li.on").attr("id"),
                    "courseName": couserName,
                    "teacherName": teacherName,
                    "className": className,
                    "account": ReadCookie("account"),
                    "code": ReadCookie("code"),
                    "groupId":ReadCookie("groupId"),
                }
                $.ajax({
                    url: "../schedule/updateCourseForClass",
                    type: "post",
                    dataType: "json",
                    contentType: "application/json",
                    data: JSON.stringify(sendData),
                    success:function(json){
                        if(json.result == "success"){
                            alert("修改成功");
                            $(".conNews").fadeOut();
                            $(".bg").fadeOut();
                            $(".academy>.content>ul>li.on>p").trigger("click");


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
//添加任课教师
function addTeacher(val) {
    $(".addTeacher").unbind("click").on("click",function(){
        $(".conNews").fadeIn();
        $(".bg").css("height",$(document).height()).fadeIn();


        couserTeacher($(".academy>.content>ul>li.on").attr("id"));
        insitituClass($(".academy>.content>ul>li.on").attr("id"));


        //确定
        $(".conNews a.sure3").unbind("click").on("click",function () {
            var nameClass=$("#selectClass option:selected").attr("id");
            var nameCouser=$("#selectCourse option:selected").attr("id");
            var nameTeacher=$("#teacherCourse option:selected").attr("id");
            var nameYear=$("#year option:selected").val();
            var nameTerm=$("#term option:selected").val();
            var nameWeek=$("#week option:selected").val();
            var nameTime=$("#time option:selected").val();
            var className=$("#selectClass option:selected").val();
            var teacherName=$("#teacherCourse option:selected").val();
            var couserName=$("#selectCourse option:selected").val();



            if(nameCouser.length==0) {
                alert("请选择课程");
            }else if(nameTeacher.length==0) {
                alert("请选择老师");
            }else if(nameYear.length==0) {
                alert("请选择年份");
            }else if(nameTerm.length==0) {
                alert("请选择学期");
            }else if(nameWeek.length==0) {
                alert("请选择星期");
            }else if(nameTime.length==0) {
                alert("请选择时间");
            }else{
                var sendData = {
                    "classNo":nameClass,
                    "courseId": nameCouser,
                    "teacherNo": nameTeacher,
                    "year": nameYear,
                    "term": nameTerm,
                    "week": nameWeek,
                    "time": nameTime,
                    "instituteId": $(".academy>.content>ul>li.on").attr("id"),
                    "courseName": couserName,
                    "teacherName": teacherName,
                    "className": className,
                    "account": ReadCookie("account"),
                    "code": ReadCookie("code"),
                    "groupId":ReadCookie("groupId"),
                }
                $.ajax({
                    url: "../schedule/addCourseForClass",
                    type: "post",
                    dataType: "json",
                    contentType: "application/json",
                    data: JSON.stringify(sendData),
                    success:function(json){
                        if(json.result == "success"){
                            alert("添加成功");
                            $(".conNews").fadeOut();
                            $(".bg").fadeOut();
                            $(".academy>.content>ul>li.on>p").trigger("click");


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
//根据学院查找所有班级
function insitituClass(val) {
    $("#selectClass").children().remove();
    //获取班级
    var sendData = {
        "instituteId": val,
        "keyword":"",
        "account": ReadCookie("account"),
        "code": ReadCookie("code"),
        "groupId":ReadCookie("groupId"),
    }
    $.ajax({
        url: "../class/selectClass",
        type: "post",
        dataType: "json",
        contentType: "application/json",
        data: JSON.stringify(sendData),
        success:function(json){
            if(json.result == "success"){

                for(var i=0;i<json.array.length;i++){
                    var option=$("<option id='"+json.array[i].classNo+"'>"+json.array[i].className+"</option>");
                    $("#selectClass").append(option);
                }


            }else if(json.result == "noPower"){
                alert("你没有权限");
            }else if(json.result == "timeOver"){
                alert("登录过期");
                window.location.href="loginAdmin.html";
            }
        }
    });
}
//根据学院获取课程
function couserTeacher(val) {
    $("#selectCourse").children().remove();
    //获取课程
    var sendData = {
        "instituteId": val,
        "account": ReadCookie("account"),
        "code": ReadCookie("code"),
        "groupId":ReadCookie("groupId"),
    }
    $.ajax({
        url: "../course/getCourseByInstituteId",
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


                //获取课程老师
                teacherCourse($("#selectCourse option:selected").attr("id"));

            }else if(json.result == "noPower"){
                alert("你没有权限");
            }else if(json.result == "timeOver"){
                alert("登录过期");
                window.location.href="loginAdmin.html";
            }
        }
    });
    $("#selectCourse").unbind("change").on("change",function () {
        teacherCourse($("#selectCourse option:selected").attr("id"));
    })
}
//根据课程获取老师
function teacherCourse(val) {
    $("#teacherCourse").children().remove();
    //获取课程教师
    var sendData = {
        "courseId":val ,
        "account": ReadCookie("account"),
        "code": ReadCookie("code"),
        "groupId":ReadCookie("groupId"),
    }
    $.ajax({
        url: "../teacher/getTeacherByCourseId",
        type: "post",
        dataType: "json",
        contentType: "application/json",
        data: JSON.stringify(sendData),
        success:function(json){
            if(json.result == "success"){

                for(var i=0;i<json.array.length;i++){
                    var option=$("<option id='"+json.array[i].teacherNo+"'>"+json.array[i].teacherName+"</option>");
                    $("#teacherCourse").append(option);
                }


            }else if(json.result == "noPower"){
                alert("你没有权限");
            }else if(json.result == "timeOver"){
                alert("登录过期");
                window.location.href="loginAdmin.html";
            }
        }
    })
}
//删除
function deleted() {
    $("#teacher a.delete").unbind("click").on("click",function(){
        var str=[];
        str.push($(this).parents().parents().attr("id"));
        if(confirm("确定要删除吗？")) {
            var sendData = {
                "ids":str ,
                "account": ReadCookie("account"),
                "code": ReadCookie("code"),
                "groupId":ReadCookie("groupId"),
            };
            $.ajax({
                url: "../schedule/deleteSchedule",
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
                    url: "../schedule/deleteSchedule",
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
    $(".newsType").unbind("change").on("change",function () {
        var clas;
        if($(".newsType option:selected").val()==""){
            clas="";
        }else{
            clas=$(".newsType option:selected").attr("id");
        }

        var cou;
        if($(".newsState option:selected").val()==""){
            cou="";
        }else{
            cou=$(".newsState option:selected").attr("id");
        }

        var text=$(".head .search-text").val();
        academycCickPage(1,text,cou,clas)
    })
    $(".newsState").unbind("change").on("change",function () {
        var clas;
        if($(".newsType option:selected").val()==""){
            clas="";
        }else{
            clas=$(".newsType option:selected").attr("id");
        }

        var cou;
        if($(".newsState option:selected").val()==""){
            cou="";
        }else{
            cou=$(".newsState option:selected").attr("id");
        }
        var text=$(".head .search-text").val();
        academycCickPage(1,text,cou,clas)
    })
    //搜索
    $(".head .search-btn").unbind("click").on("click",function () {
        var text=$(".head .search-text").val();
        var clas;
        if($(".newsType option:selected").val()==""){
            clas="";
        }else{
            clas=$(".newsType option:selected").attr("id");
        }

        var cou;
        if($(".newsState option:selected").val()==""){
            cou="";
        }else{
            cou=$(".newsState option:selected").attr("id");
        }
        academycCickPage(1,text,cou,clas)
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
