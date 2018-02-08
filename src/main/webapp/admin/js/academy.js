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
            $(this).children().eq(2).addClass("on");
            e.preventDefault();
        }
    }).mouseout(function (e) {
        if(!$(this).hasClass("on")){
            $(this).children().eq(2).removeClass("on");
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


    $(".academy .content ul li i.icon-sanjiao").unbind("click").on("click",function () {
        var _this=$(this).next().next().next().next();
        if(_this.hasClass("profession")){
            if(_this.hasClass("in")){
                _this.removeClass("in");
            }else{
                _this.addClass("in");
                $(".academy .content ul li .profession i.icon-sanjiao").unbind("click").on("click",function () {
                    var _this=$(this).next().next().next().next();
                    if(_this.hasClass("getClass")){
                        if(_this.hasClass("in")){
                            _this.removeClass("in");
                        }else{
                            _this.addClass("in");
                        }
                    }
                })
            }

        }
        if(_this.hasClass("getClass")){
            if(_this.hasClass("in")){
                _this.removeClass("in");
            }else{
                _this.addClass("in");
            }
        }
    });


    //点击班级
    $(".academy>.content>ul>li>.profession>li>.getClass>li>p").unbind("click").on("click",function () {
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

        //去掉专业
        $(this).parent().parent().parent().removeClass("hover").removeClass("on");
        $(this).parent().parent().parent().siblings().removeClass("hover").removeClass("on")

        var classNo=$(this).parent().attr("id");
        var pId=$(this).parent().parent().parent().attr("id");
        var id=$(this).parent().parent().parent().parent().parent().attr("id");
        academycCick(1,id,pId,classNo,"");
    });
    //点击专业
    $(".academy>.content>ul>li>.profession>li>p").unbind("click").on("click",function () {
        $(".academyCon .head h1").text($(this).find("span").text());
        $(this).parent().siblings().removeClass("on").removeClass("hover");
        $(this).parent().addClass("on");
        $(".academy .content ul li .icon-caozuo").each(function () {
            $(this).removeClass("on");
        });
        $(".academy .content ul li .dowload").each(function () {
            $(this).removeClass("open");
        });

        //去掉下面班级
        $(this).next().next().next().find("li").each(function () {
            $(this).removeClass("hover").removeClass("on");
        });
        $(this).parent().siblings().find("li").each(function () {
            $(this).removeClass("hover").removeClass("on");
        });


        $(this).next().addClass("on");

        var pId=$(this).parent().attr("id");
        var id=$(this).parent().parent().parent().attr("id");
        academycCick(1,id,pId,"","");
    });
    //点击学院
    $(".academy>.content>ul>li>p").unbind("click").on("click",function () {
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

        $(this).parent().find("li").each(function () {
            $(this).removeClass("on").removeClass("hover");
        })

        var id=$(this).parent().attr("id");
        academycCick(1,id,"","","");
    });





    addOrginazer();
    deleteOrginazer();
    // searchOrginazer();

}

//获取所有学院s
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
                        "<i class='icon-sanjiao'></i>"+
                        "<p>" +
                        "<i class='icon-wenjian'></i>" +
                        "<span>"+json.array[i].instituteName+"</span>" +
                        "</p>"+
                        "<i class='icon-caozuo'></i>"+
                        "<div class='dowload'>"+
                        "<span>添加专业</span>"+
                        "<span>修改学院名称</span>"+
                        "<span>删除学院</span>"+
                        "</div>"+
                        "<ol class='profession'></ol>"+
                        "</li>");
                    $(".academy .content ul").append(li);
                    //获取专业
                    profession(json.array[i].instituteId,i);
                }
                //点击导航
                clickNav();


                $(".academy .content ul li i.icon-sanjiao").eq(0).trigger("click")



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
//获取专业
function profession(val,num){
    var sendData = {
        "account": ReadCookie("account"),
        "code": ReadCookie("code"),
        "groupId":ReadCookie("groupId"),
        "instituteId":val
    };
    $.ajax({
        url: "/profession/getProfession",
        type: "post",
        dataType: "json",
        data: JSON.stringify(sendData),
        contentType: "application/json",
        success: function (json) {
            if (json.result == "success") {

                for(var i=0;i<json.array.length;i++){
                    var li=$("<li id='"+json.array[i].pId+"'>"+
                        "<i class='icon-sanjiao'></i>"+
                        "<p>" +
                        "<i class='icon-wenjian'></i>" +
                        "<span>"+json.array[i].pName+"</span>" +
                        "</p>"+
                        "<i class='icon-caozuo'></i>"+
                        "<div class='dowload'>"+
                            "<span>添加班级</span>"+
                            "<span>修改专业名称</span>"+
                            "<span>删除专业</span>"+
                        "</div>"+
                        "<ul class='getClass'></ul>"+
                        "</li>");
                    $(".academy .content ul .profession").eq(num).append(li);
                    //获取专业
                    className(json.array[i].pId,i,num);
                }
                //点击导航
                clickNav();




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
//获取班级
function className(val,classno,num){
    var sendData = {
        "account": ReadCookie("account"),
        "code": ReadCookie("code"),
        "groupId":ReadCookie("groupId"),
        "pId":val
    };
    $.ajax({
        url: "/class/getClassBypId",
        type: "post",
        dataType: "json",
        data: JSON.stringify(sendData),
        contentType: "application/json",
        success: function (json) {
            if (json.result == "success") {

                for(var i=0;i<json.array.length;i++){
                    var li=$("<li id='"+json.array[i].classNo+"'>"+
                        "<i></i>"+
                        "<p>" +
                        "<i class='icon-wenjian'></i>" +
                        "<span>"+json.array[i].className+"</span>" +
                        "</p>"+
                        "<i class='icon-caozuo'></i>"+
                        "<div class='dowload'>"+
                        "<span>修改班级名称</span>"+
                        "<span>删除班级</span>"+
                        "</div>"+
                        "</li>");
                    $(".academy .content ul .profession").eq(num).children("li").eq(classno).children("ul").append(li);
                }
                //点击导航
                clickNav();



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
function academycCick(index,id,pId,classNo,text) {
    $("#adminPower").children().remove();
    var sendData = {
            "account": ReadCookie("account"),
            "code": ReadCookie("code"),
            "instituteId":id,
            "groupId":ReadCookie("groupId"),
            "pageIndex":index,
            "pageSize":10,
            "pId":pId,
            "classNo":classNo,
            "keyword":text
        };
    $.ajax({
            url: "/student/getStudentByInstituteId",
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
                        $("#adminPower").append(tr);
                    }
                    for(var i=0;i<json.array.length;i++){
                        var tr=$("<tr id='"+json.array[i].id+"'>" +
                            "<td><input type='checkbox'></td>"+
                            "<td>"+json.array[i].order+"</td>"+
                            "<td>"+json.array[i].pName+"</td>"+
                            "<td>"+json.array[i].className+"</td>"+
                            "<td>"+json.array[i].studentName+"</td>"+
                            "<td>"+json.array[i].studentNo+"</td>"+
                            "<td>"+json.array[i].studentTell+"</td>"+
                            "<td>"+json.array[i].studentMail+"</td>"+
                            "<td>"+
                            "<a class='deatial'>查看</a>"+
                            "<a class='amend'>修改</a>"+
                            "<a class='delete'>删除</a>"+
                            "</td></tr>");
                        $("#adminPower").append(tr);
                        if(json.array[i].status==0){
                            $("#adminPower tr").eq(i).css("background","#eee")
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
                            academycCickPage(index.getCurrent(),id,pId,classNo,text)
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
}
function academycCickPage(index,id,pId,classNo,text){
    $("#adminPower").children().remove();
    var sendData = {
        "account": ReadCookie("account"),
        "code": ReadCookie("code"),
        "instituteId":id,
        "groupId":ReadCookie("groupId"),
        "pageIndex":index,
        "pageSize":10,
        "pId":pId,
        "classNo":classNo,
        "keyword":text
    };
    $.ajax({
        url: "/student/getStudentByInstituteId",
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
                    $("#adminPower").append(tr);
                }
                for(var i=0;i<json.array.length;i++){
                    var tr=$("<tr id='"+json.array[i].id+"'>" +
                        "<td><input type='checkbox'></td>"+
                        "<td>"+json.array[i].order+"</td>"+
                        "<td>"+json.array[i].pName+"</td>"+
                        "<td>"+json.array[i].className+"</td>"+
                        "<td>"+json.array[i].studentName+"</td>"+
                        "<td>"+json.array[i].studentNo+"</td>"+
                        "<td>"+json.array[i].studentTell+"</td>"+
                        "<td>"+json.array[i].studentMail+"</td>"+
                        "<td>"+
                        "<a class='deatial'>查看</a>"+
                        "<a class='amend'>修改</a>"+
                        "<a class='delete'>删除</a>"+
                        "</td></tr>");
                    $("#adminPower").append(tr);
                    if(json.array[i].status==0){
                        $("#adminPower tr").eq(i).css("background","#eee")
                    }
                }
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
}
//查看
function details() {
    $(".table a.deatial").unbind("click").on("click",function() {
        var id = $(this).parent().parent().attr("id");
        $(".conNewsDetail").fadeIn();
        $(".bg").css("height", $(document).height()).fadeIn();
        $(".btns3 a.clooe3").fadeOut();
      
        $(".conNewsDetail .head h1").text("学生详情");
        var sendData = {
            "id": id,
            "account": ReadCookie("account"),
            "code": ReadCookie("code"),
            "groupId":ReadCookie("groupId"),
        }
        $.ajax({
            url: "/student/getStudent",
            type: "post",
            dataType: "json",
            contentType: "application/json",
            data: JSON.stringify(sendData),
            success: function (json) {
                if (json.result == "success") {
                
                    $(".conNewsDetail ul").children().remove();
                    $(".conNewsDetail ul").append("<li><div id='preview' class='UpImg'><img id='imghead' src='"+json.student.studentPicture+"'></div></li>") ;             
                    $(".conNewsDetail ul").append("<li>姓名："+json.student.studentName+"</li>");
                    $(".conNewsDetail ul").append("<li>学号："+json.student.studentNo+"</li>");
                    $(".conNewsDetail ul").append("<li>性别："+json.student.studentSex+"</li>");
                    $(".conNewsDetail ul").append("<li>手机号码："+json.student.studentTell+"</li>");
                    $(".conNewsDetail ul").append("<li>邮箱："+json.student.studentMail+"</li>");
                    $(".conNewsDetail ul").append("<li>专业："+json.student.pName+"</li>");
                    $(".conNewsDetail ul").append("<li>班级："+json.student.className+"</li>");
          
                }
            }
        })
    });
    //取消
    $(".btns3 a.sure3,.conNewsDetail .head i").unbind("click").on("click",function () {
        $(".conNewsDetail").fadeOut();
        $(".bg").fadeOut();
    });
}
//修改
function amend() {
    $("#adminPower a.amend").unbind("click").on("click",function(){
        var id=$(this).parent().parent().attr("id");
        
        $("#profession").unbind("change").on("change",function () {
            var id=$("#profession option:selected").attr("id");
            getClass(id);
        });

        $(".conNews ul li input[type='radio']").on("click",function () {

            $(this).siblings().attr("value","0");
            $(this).attr("value","1");

        })
        $("#profession").children().remove();
        var sendData = {
            "instituteId": $(".academy>.content>ul>li.on").attr("id"),
            "account": ReadCookie("account"),
            "code": ReadCookie("code"),
            "groupId":ReadCookie("groupId"),
        }
        $.ajax({
            url: "/profession/getProfession",
            type: "post",
            dataType: "json",
            contentType: "application/json",
            data: JSON.stringify(sendData),
            success:function(json){
                if(json.result == "success"){

                    for(var i=0;i<json.array.length;i++){
                        var option=$("<option id='"+json.array[i].pId+"'>"+json.array[i].pName+"</option>");
                        $("#profession").append(option);
                    }
                    getClass(json.array[0].pId)



                }else if(json.result == "noPower"){
                    alert("你没有权限");
                }else if(json.result == "timeOver"){
                    alert("登录过期");
                    window.location.href="loginAdmin.html";
                }
            }
        })
        var sendData = {
            "id": id,
            "account": ReadCookie("account"),
            "code": ReadCookie("code"),
            "groupId":ReadCookie("groupId"),
        }
        $.ajax({
            url: "/student/getStudent",
            type: "post",
            dataType: "json",
            contentType: "application/json",
            data: JSON.stringify(sendData),
            success:function(json){
                if(json.result == "success"){
                    $(".conNews").fadeIn();
                    $(".bg").css("height",$(document).height()).fadeIn();
                    $(".conNews .head h1").text("修改學生信息");
                    $("#imghead").attr("src",json.student.studentPicture);
                    $(".conNews ul li input").eq(5).val(json.student.studentName);
                    $(".conNews ul li input").eq(6).val(json.student.studentNo);
                    $(".conNews ul li input").eq(9).val(json.student.studentTell);
                    $(".conNews ul li input").eq(10).val(json.student.studentMail);
                
                    if(json.student.studentSex=="男"){
                    	$(".conNews ul li input[type='radio']").eq(0).trigger("click");
                    }
                    if(json.student.studentSex=="女"){
                    	$(".conNews ul li input[type='radio']").eq(1).trigger("click");
                    }

                    $("#profession option:selected").val(json.student.pName);
                    $("#classNo option:selected").val(json.student.className)

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
//                        alert("上传成功");
                        $("#imghead").attr("src",json.studentPic);
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
            var studentNo=$(".conNews ul li input").eq(6).val();
            var phone=$(".conNews ul li input").eq(9).val();
            var email=$(".conNews>ul>li input").eq(10).val();
            var profession=$("#profession option:selected").attr("id");
            var classNo=$("#classNo option:selected").attr("id");
            var str;
            $(".conNews ul li input[type='radio']").each(function () {
                if($(this).attr("value")=="1"){
                    str=$(this).next().text();
                }
            })
            if(name.length==0){
                alert("请填写姓名");
            }else if(phone.length==0){
                alert("请填写手机号码");
            }else if(email.length==0){
                alert("请填写邮箱");
            }else if(studentNo.length==0){
                alert("请填写学号");
            }else if(profession.length==0){
                alert("请选择专业");
            }else if(classNo.length==0){
                alert("请选择班级");
            }else if(str==""){
                alert("请选择性别");
            }else{
                var sendData = {
                    "studentPicture": teacherPictuer,
                    "studentName": name,
                    "studentNo":studentNo,
                    "studentTell":phone,
                    "studentMail":email,
                    "account": ReadCookie("account"),
                    "code": ReadCookie("code"),
                    "groupId":ReadCookie("groupId"),
                    "studentSex":str,
                    "instituteId":$(".academy .content ul li.on").attr("id"),
                    "classNo":classNo,
                    "pId":profession,
                    "id":id
                }
                $.ajax({
                    url: "/student/updateStudent",
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
    $("#adminPower a.delete").unbind("click").on("click",function(){
        var id=$(this).parents().parents().attr("id");
        var str=[];
        str.push(id);
        if(confirm("确定要删除吗？")) {
            var sendData = {
                "ids": str,
                "account": ReadCookie("account"),
                "code": ReadCookie("code"),
                "groupId":ReadCookie("groupId"),
            };
            $.ajax({
                url: "/student/deleteStudent",
                type: "post",
                dataType: "json",
                contentType: "application/json",
                data: JSON.stringify(sendData),
                success: function (json) {
                    if (json.result == "success") {
//                        alert("删除成功");
                        $(".academy>.content>ul>li.on>p").trigger("click");
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
        $(".conNews .head h1").text("添加学生");
        $(".conNews ul li input").eq(0).val("");
        $(".conNews ul li input").eq(2).val("");
        $(".conNews ul li input").eq(3).val("");
        $(".conNews ul li input").eq(4).val("");
        $(".conNews ul li input").eq(5).val("");
        $(".conNews ul li input").eq(6).val("");
        $(".conNews ul li input").eq(7).val("");
        $(".conNews ul li input").eq(8).val("");
        $(".conNews ul li input").eq(9).val("");
        $(".conNews ul li input").eq(10).val("");
        $(".conNews ul li input[type='radio']").each(function () {
            $(this).attr("value","0");
            $(this).removeAttr("checked");
        })
        $(".conNews ul li input[type='checkbox']").eq(0).removeAttr("checked");
        $(".conNews ul li input[type='checkbox']").eq(1).removeAttr("checked");
        $(".conNews ul li input[type='checkbox']").eq(2).removeAttr("checked");
        $(".conNews ul li input[type='checkbox']").eq(3).removeAttr("checked");
        $(".conNews ul li input[type='checkbox']").eq(4).removeAttr("checked");
        $(".conNews ul li input[type='checkbox']").eq(5).removeAttr("checked");

        $("#profession").children().remove();
        var sendData = {
            "instituteId": $(".academy>.content>ul>li.on").attr("id"),
            "account": ReadCookie("account"),
            "code": ReadCookie("code"),
            "groupId":ReadCookie("groupId"),
        }
        $.ajax({
            url: "/profession/getProfession",
            type: "post",
            dataType: "json",
            contentType: "application/json",
            data: JSON.stringify(sendData),
            success:function(json){
                if(json.result == "success"){

                    for(var i=0;i<json.array.length;i++){
                        var option=$("<option id='"+json.array[i].pId+"'>"+json.array[i].pName+"</option>");
                        $("#profession").append(option);
                    }
                    getClass(json.array[0].pId)



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
//                        alert("上传成功");
                        $("#imghead").attr("src",json.studentPic);
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

        $("#profession").unbind("change").on("change",function () {
            var id=$("#profession option:selected").attr("id");
            getClass(id);
        });

        $(".conNews ul li input[type='radio']").on("click",function () {

            $(this).siblings().attr("value","0");
            $(this).attr("value","1");

        })

        //确定
        $(".btns3 a.sure3").unbind("click").on("click",function () {
            var teacherPictuer=$("#imghead").attr("src");
            var name=$(".conNews ul li input").eq(5).val();
            var studentNo=$(".conNews ul li input").eq(6).val();
            var phone=$(".conNews ul li input").eq(9).val();
            var email=$(".conNews>ul>li input").eq(10).val();
            var profession=$("#profession option:selected").attr("id");
            var classNo=$("#classNo option:selected").attr("id");
            var str;
            $(".conNews ul li input[type='radio']").each(function () {
                if($(this).attr("value")=="1"){
                    str=$(this).next().text();
                }
            })
            if(name.length==0){
                alert("请填写姓名");
            }else if(phone.length==0){
                alert("请填写手机号码");
            }else if(email.length==0){
                alert("请填写邮箱");
            }else if(studentNo.length==0){
                alert("请填写学号");
            }else if(profession.length==0){
                alert("请选择专业");
            }else if(classNo.length==0){
                alert("请选择班级");
            }else if(str==""){
                alert("请选择性别");
            }else{
                var sendData = {
                    "studentPicture": teacherPictuer,
                    "studentName": name,
                    "studentNo":studentNo,
                    "studentTell":phone,
                    "studentMail":email,
                    "account": ReadCookie("account"),
                    "code": ReadCookie("code"),
                    "groupId":ReadCookie("groupId"),
                    "studentSex":str,
                    "instituteId":$(".academy .content ul li.on").attr("id"),
                    "classNo":classNo,
                    "pId":profession
                }
                $.ajax({
                    url: "/student/addStudent",
                    type: "post",
                    dataType: "json",
                    contentType: "application/json",
                    data: JSON.stringify(sendData),
                    success:function(json){
                        if(json.result == "success"){
//                            alert("保存成功");
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
//获取班级
function getClass(val) {
    $("#classNo").children().remove();
    var sendData = {
        "pId": val,
        "account": ReadCookie("account"),
        "code": ReadCookie("code"),
        "groupId":ReadCookie("groupId"),
    }
    $.ajax({
        url: "/class/getClassBypId",
        type: "post",
        dataType: "json",
        contentType: "application/json",
        data: JSON.stringify(sendData),
        success:function(json){
            if(json.result == "success"){

                for(var i=0;i<json.array.length;i++){
                    var option=$("<option id='"+json.array[i].classNo+"'>"+json.array[i].className+"</option>");
                    $("#classNo").append(option);
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
                    "ids":str ,
                    "account": ReadCookie("account"),
                    "code": ReadCookie("code"),
                    "groupId":ReadCookie("groupId"),
                };
                $.ajax({
                    url: "/student/freezeStudent",
                    type: "post",
                    dataType: "json",
                    contentType: "application/json",
                    data: JSON.stringify(sendData),
                    success: function (json) {
                        if (json.result == "success") {
//                            alert("禁用成功");
                            $(".academy>.content>ul>li.on>p").trigger("click");
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
                    "ids":str ,
                    "account": ReadCookie("account"),
                    "code": ReadCookie("code"),
                    "groupId":ReadCookie("groupId"),
                };
                $.ajax({
                    url: "/student/unFreezeStudent",
                    type: "post",
                    dataType: "json",
                    contentType: "application/json",
                    data: JSON.stringify(sendData),
                    success: function (json) {
                        if (json.result == "success") {
//                            alert("解禁成功");
                            $(".academy>.content>ul>li.on>p").trigger("click");
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
        var id=$(".academy>.content>ul>li.on").attr("id");
        var pId=$(".academy>.content>ul>li>.profession>li.on").attr("id");
        var classNo=$(".academy>.content>ul>li>.profession>li>.getClass>li.on").attr("id");

        if(pId==undefined){
            pId="";
        }

        if(classNo==undefined){
            classNo="";
        }

        academycCickPage(1,id,pId,classNo,text);
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
            var id=$(".academy>.content>ul>li>.profession>li>.getClass>li.on").parent().parent().parent().parent().attr("id");
            var pId=$(".academy>.content>ul>li>.profession>li>.getClass>li.on").parent().parent().attr("id");
            var classNo=$(".academy>.content>ul>li>.profession>li>.getClass>li.on").attr("id");

            $(this).prev().val(id);
            $(this).next().val(ReadCookie("account"));
            $(this).next().next().val(ReadCookie("code"));
            $(this).next().next().next().val(ReadCookie("groupId"));
            $(this).next().next().next().next().val(pId);
            $(this).next().next().next().next().next().val(classNo);
            $("#leadEx").unbind("submit").on("submit", function () {
                $("#leadEx").ajaxSubmit(options);
                return false; // 必须返回false，否则表单会自己再做一次提交操作，并且页面跳转
            });
            var options = {
                success: function (json) { //提交后的回调函数
                    if(json.result=="success"){
//                        alert("导入成功");
                        $(".leadEx").fadeOut();
                        $(".bg").fadeOut();
                        $(".academy>.content>ul>li.on>p").trigger("click");
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
        var text=$(".head .search-text").val();
        var id=$(".academy>.content>ul>li.on").attr("id");
        var pId=$(".academy>.content>ul>li>.profession>li.on").attr("id");
        var classNo=$(".academy>.content>ul>li>.profession>li>.getClass>li.on").attr("id");

        if(pId==undefined){
            pId="";
        }

        if(classNo==undefined){
            classNo="";
        }

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
                "instituteNo":id,
                "pId":pId,
                "classNo":classNo,
                "pageSize":20,//每页显示12条
                "pageIndex":page,//第几页
            };
            $.ajax({
                url: "/student/exportExcel",
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
                    url: "/student/deleteStudent",
                    type: "post",
                    dataType: "json",
                    contentType: "application/json",
                    data: JSON.stringify(sendData),
                    success: function (json) {
                        if (json.result == "success") {
//                            alert("删除成功");
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
//添加学院
function addOrginazer(){
    $(".middle .dowload>span").unbind("click").on("click",function(){
        $(".middle .dowload.open").removeClass("open");
        $(".middle>span").removeClass("on").removeClass("hover");
        $(".middle i").removeClass("on");
        $(".addconNews").fadeIn();
        $(".bg").css("height",$(document).height()).fadeIn();
        $(".addconNews .head h1").text("添加学院");
        $(".addconNews ul li span").text("学院名称：")
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
                    url: "/institute/addInstitute",
                    type: "post",
                    dataType: "json",
                    contentType: "application/json",
                    data: JSON.stringify(sendData),
                    success:function(json){
                        if(json.result == "success"){
//                            alert("添加成功");
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
//删除学院 //修改学院名称  //添加专业
function deleteOrginazer(){
    $(".academy .content ul li  .dowload>span").unbind("click").on("click",function(){
        if($(this).text()=="删除学院"){
            var id=$(this).parents().parents().attr("id");
            $(this).parents().removeClass("open");
            if(confirm("学院下面的专业一并删除，确定要删除吗？")) {
                var sendData = {
                    "id": id,
                    "account": ReadCookie("account"),
                    "code": ReadCookie("code"),
                    "groupId":ReadCookie("groupId"),
                };
                $.ajax({
                    url: "/institute/deleteInstitute",
                    type: "post",
                    dataType: "json",
                    contentType: "application/json",
                    data: JSON.stringify(sendData),
                    success: function (json) {
                        if (json.result == "success") {
//                            alert("删除成功");
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
        }else if($(this).text()=="修改学院名称"){
            var id=$(this).parents().parents().attr("id");
            $(this).parents().removeClass("open");
            $(".addconNews").fadeIn();
            $(".bg").css("height",$(document).height()).fadeIn();
            $(".addconNews .head h1").text("修改学院名称");
            $(".addconNews ul li span").text("学院名称：")
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
                        url: "/institute/updateInstitute",
                        type: "post",
                        dataType: "json",
                        contentType: "application/json",
                        data: JSON.stringify(sendData),
                        success:function(json){
                            if(json.result == "success"){
//                                alert("修改成功");
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
        }else if($(this).text()=="添加专业"){
            var id=$(this).parents().parents().attr("id");
            $(this).parents().removeClass("open");
            $(".addconNews").fadeIn();
            $(".bg").css("height",$(document).height()).fadeIn();
            $(".addconNews .head h1").text("添加专业");
            $(".addconNews ul li span").text("专业名称：");
            $(".addconNews ul li input").eq(0).val("");
            //确定
            $(".addconNews a.sureAdd").unbind("click").on("click",function () {
                var name=$(".addconNews ul li input").eq(0).val();

                if(name.length==0){
                    alert("请填写名称");
                }else{
                    var sendData = {
                        "pName": name,
                        "account": ReadCookie("account"),
                        "code": ReadCookie("code"),
                        "groupId":ReadCookie("groupId"),
                        "instituteId":id
                    }
                    $.ajax({
                        url: "/profession/addProfession",
                        type: "post",
                        dataType: "json",
                        contentType: "application/json",
                        data: JSON.stringify(sendData),
                        success:function(json){
                            if(json.result == "success"){
//                                alert("添加成功");
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
        }else if($(this).text()=="删除专业"){
            var id=$(this).parents().parents().attr("id");
            $(this).parents().removeClass("open");
            if(confirm("专业下面的班级一并删除，确定要删除吗？")) {
                var sendData = {
                    "pId": id,
                    "account": ReadCookie("account"),
                    "code": ReadCookie("code"),
                    "groupId":ReadCookie("groupId"),
                };
                $.ajax({
                    url: "/profession/deleteProfession",
                    type: "post",
                    dataType: "json",
                    contentType: "application/json",
                    data: JSON.stringify(sendData),
                    success: function (json) {
                        if (json.result == "success") {
//                            alert("删除成功");
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
        }else if($(this).text()=="修改专业名称"){
            var id=$(this).parents().parents().attr("id");
            $(this).parents().removeClass("open");
            $(".addconNews").fadeIn();
            $(".bg").css("height",$(document).height()).fadeIn();
            $(".addconNews .head h1").text("修改专业名称");
            $(".addconNews ul li span").text("专业名称：")
            $(".addconNews ul li input").eq(0).val("");
            //确定
            $(".addconNews a.sureAdd").unbind("click").on("click",function () {
                var name=$(".addconNews ul li input").eq(0).val();

                if(name.length==0){
                    alert("请填写名称");
                }else{
                    var sendData = {
                        "pName": name,
                        "account": ReadCookie("account"),
                        "code": ReadCookie("code"),
                        "groupId":ReadCookie("groupId"),
                        "pId":id
                    }
                    $.ajax({
                        url: "/profession/updateProfession",
                        type: "post",
                        dataType: "json",
                        contentType: "application/json",
                        data: JSON.stringify(sendData),
                        success:function(json){
                            if(json.result == "success"){
//                                alert("修改成功");
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
        }else if($(this).text()=="添加班级"){
            var id=$(this).parents().parents().attr("id");
            var instituteNo=$(this).parents().parents().parents().parents().attr("id")
            $(this).parents().removeClass("open");
            $(".addconNews").fadeIn();
            $(".bg").css("height",$(document).height()).fadeIn();
            $(".addconNews .head h1").text("添加班级");
            $(".addconNews ul li span").text("班级名称：");
            $(".addconNews ul li input").eq(0).val("");
            //确定
            $(".addconNews a.sureAdd").unbind("click").on("click",function () {
                var name=$(".addconNews ul li input").eq(0).val();

                if(name.length==0){
                    alert("请填写名称");
                }else{
                    var sendData = {
                        "className": name,
                        "account": ReadCookie("account"),
                        "code": ReadCookie("code"),
                        "groupId":ReadCookie("groupId"),
                        "pNo":id,
                        "instituteNo":instituteNo,

                    }
                    $.ajax({
                        url: "/class/addClass",
                        type: "post",
                        dataType: "json",
                        contentType: "application/json",
                        data: JSON.stringify(sendData),
                        success:function(json){
                            if(json.result == "success"){
//                                alert("添加成功");
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
        }else if($(this).text()=="删除班级"){
            var id=$(this).parents().parents().attr("id");
            $(this).parents().removeClass("open");
            if(confirm("班级下面的人员一并删除，确定要删除吗？")) {
                var sendData = {
                    "classNo": id,
                    "account": ReadCookie("account"),
                    "code": ReadCookie("code"),
                    "groupId":ReadCookie("groupId"),
                };
                $.ajax({
                    url: "/class/deleteClass",
                    type: "post",
                    dataType: "json",
                    contentType: "application/json",
                    data: JSON.stringify(sendData),
                    success: function (json) {
                        if (json.result == "success") {
//                            alert("删除成功");
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
        }else if($(this).text()=="修改班级名称"){
            var id=$(this).parents().parents().attr("id");
            $(this).parents().removeClass("open");
            $(".addconNews").fadeIn();
            $(".bg").css("height",$(document).height()).fadeIn();
            $(".addconNews .head h1").text("修改班级名称");
            $(".addconNews ul li span").text("班级名称：")
            $(".addconNews ul li input").eq(0).val("");
            //确定
            $(".addconNews a.sureAdd").unbind("click").on("click",function () {
                var name=$(".addconNews ul li input").eq(0).val();

                if(name.length==0){
                    alert("请填写名称");
                }else{
                    var sendData = {
                        "className": name,
                        "account": ReadCookie("account"),
                        "code": ReadCookie("code"),
                        "groupId":ReadCookie("groupId"),
                        "classNo":id
                    }
                    $.ajax({
                        url: "/class/updateClass",
                        type: "post",
                        dataType: "json",
                        contentType: "application/json",
                        data: JSON.stringify(sendData),
                        success:function(json){
                            if(json.result == "success"){
//                                alert("修改成功");
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
// function searchOrginazer() {
//     //搜索
//     $(".academy .head i").unbind("click").on("click",function () {
//         var text=$(".academy .head input").val();
//         $(".academy .content ul").children().remove();
//         var sendData = {
//             "account": ReadCookie("account"),
//             "code": ReadCookie("code"),
//             "groupId":ReadCookie("groupId"),
//             "name":text,
//         };
//         $.ajax({
//             url: "/organization/selectOrganizationByName",
//             type: "post",
//             dataType: "json",
//             data: JSON.stringify(sendData),
//             contentType: "application/json",
//             success: function (json) {
//                 if (json.result == "success") {
//
//                     for(var i=0;i<json.array.length;i++){
//                         var li=$("<li id='"+json.array[i].id+"'>"+
//                             "<p>" +
//                             "<i class='icon-wenjian'></i>" +
//                             "<span>"+json.array[i].name+"</span>" +
//                             "</p>"+
//                             "<i class='icon-caozuo'></i>"+
//                             "<div class='dowload'>"+
//                             "<span>修改名称</span>"+
//                             "<span>删除</span>"+
//                             "</div>"+
//                             "</li>");
//                         $(".academy .content ul").append(li);
//                     }
//
//                     clickNav();
//                     //点击
//                     academycCick(1,"","");
//
//
//                 }else if(json.result == "noPower"){
//                     alert("你没有权限");
//                 }else if(json.result == "timeOver"){
//                     alert("登录过期");
//                     window.location.href="loginAdmin.html";
//                 }
//             },
//             error: function () {
//                 alert("获取信息失败", 1);
//             }
//         });
//     });
//     //回车查询
//     $(".academy .head input").unbind("keypress").on("keypress",function (e) {
//         var ev = document.all ? window.event : e;//兼容IE
//         if (ev.keyCode == 13) {
//             $(".academy .head i").trigger("click");
//         }
//     });
// }
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