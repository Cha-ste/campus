/**
 * Created by 平凡的世界 on 2017/3/7.
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
                academycCick();


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
function academycCick() {
    $(".academy .content ul li p").unbind("click").on("click",function () {
    	$(".academyCon .head h1").text($(this).find("span").text());
    	$(this).parent().addClass("on");
        $(this).parent().siblings().removeClass("on");
        var id=$(this).parent().attr("id");
        $("#adminPower").children().remove();
        var sendData = {
            "account": ReadCookie("account"),
            "code": ReadCookie("code"),
            "instituteCode":id,
            "groupId":ReadCookie("groupId"),
        };
        $.ajax({
            url: "/admin/selectAdmin",
            type: "post",
            dataType: "json",
            data: JSON.stringify(sendData),
            contentType: "application/json",
            success: function (json) {
                if (json.result == "success") {
                    if(json.array.length==0){
                        var tr=$("<tr>"+
                            "<td colspan='7'>无消息数据</td>"+
                            "</tr>");
                        $("#adminPower").append(tr);
                    }
                    for(var i=0;i<json.array.length;i++){
                        var strs= new Array(); //定义一数组
                        strs=json.array[i].groupId.split(","); //字符分割
                        var power=new Array();
                        for (var j=0;j<strs.length ;j++ ){
                             if(strs[j]=="1"){
                                 power.push("消息编辑");
                             }else if(strs[j]=="2"){
                                 power.push("师生信息编辑");
                             }else if(strs[j]=="3"){
                                 power.push("成绩录入");
                             }
                        }
                        var tr=$("<tr id='"+json.array[i].id+"'>" +
                        		"<td><input type='checkbox'></td>"+
                                "<td>"+json.array[i].name+"</td>"+
                                "<td>"+json.array[i].tell+"</td>"+
                                "<td>"+json.array[i].email+"</td>"+
                                "<td><input type='password' value='"+json.array[i].password+"'></td>"+
                                "<td>"+power+"</td>"+
                                "<td>"+
                                    "<a class='amend'>修改</a>"+
                                    "<a class='delete'>删除</a>"+
                                "</td></tr>");
                        $("#adminPower").append(tr);
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
    });
    $(".academy .content ul li p").eq(0).trigger("click");
}
//修改
function amend() {
    $("#adminPower a.amend").unbind("click").on("click",function(){
        var id=$(this).parent().parent().attr("id");

        var sendData = {
            "id": id,
            "account": ReadCookie("account"),
            "code": ReadCookie("code"),
            "groupId":ReadCookie("groupId"),
        }
        $.ajax({
            url: "/admin/getAdmin",
            type: "post",
            dataType: "json",
            contentType: "application/json",
            data: JSON.stringify(sendData),
            success:function(json){
                if(json.result == "success"){
                    $(".conNews").fadeIn();
                    $(".bg").css("height",$(document).height()).fadeIn();
                    $(".conNews .head h1").text("修改管理员");
                    $(".conNews ul li input[type='checkbox']").eq(0).removeAttr("checked");
                    $(".conNews ul li input[type='checkbox']").eq(1).removeAttr("checked");
                    $(".conNews ul li input[type='checkbox']").eq(2).removeAttr("checked");
                    $(".conNews ul li input").eq(0).val(json.name);
                    $(".conNews ul li input").eq(1).val(json.tell);
                    $(".conNews ul li input").eq(2).val(json.email);
                    $(".conNews ul li input").eq(3).val(json.password);
                    
                        for(var i=0;i<json.gId.length;i++){
                        	if(json.gId[i]=="1"){
                        		$(".conNews ul li input[type='checkbox']").eq(0).trigger("click");
                        	}
                        	if(json.gId[i]=="2"){
                        		$(".conNews ul li input[type='checkbox']").eq(1).trigger("click");
                        	}
                        	if(json.gId[i]=="3"){
                        		$(".conNews ul li input[type='checkbox']").eq(2).trigger("click");
                        	} 	
                        }
                      

                   

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
            var password=$(".conNews ul li input").eq(3).val();
            var str=[];
            $(".conNews ul li input[type='checkbox']").each(function () {
                if($(this).attr("checked")){
                    str.push($(this).val());
                }
            })
            console.info(str)
            if(name.length==0){
                alert("请填写用户名");
            }else if(phone.length==0){
                alert("请填写手机号码");
            }else if(emil.length==0){
                alert("请填写邮箱");
            }else if(password.length==0){
                alert("请填写密码");
            }else{
                var sendData = {
                    "name": name,
                    "tell":phone,
                    "email":emil,
                    "password":password,
                    "account": ReadCookie("account"),
                    "code": ReadCookie("code"),
                    "groupId":ReadCookie("groupId"),
                    "gId":str,
                    "instituteId":$(".academy .content ul li.on").attr("id"),
                    "id":id,

                }
                $.ajax({
                    url: "/admin/updateAdmin",
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
        if(confirm("确定要删除吗？")) {
            var sendData = {
                "id": $(this).parents().parents().attr("id"),
                "account": ReadCookie("account"),
                "code": ReadCookie("code"),
                "groupId":ReadCookie("groupId"),
            };
            $.ajax({
                url: "/admin/deleteAdmin",
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
        $(".conNews .head h1").text("添加管理员");
        $(".conNews ul li input").eq(0).val("");
        $(".conNews ul li input").eq(1).val("");
        $(".conNews ul li input").eq(2).val("");

        //确定
        $(".btns3 a.sure3").unbind("click").on("click",function () {
            var name=$(".conNews ul li input").eq(0).val();
            var phone=$(".conNews ul li input").eq(1).val();
            var emil=$(".conNews ul li input").eq(2).val();
            var password=$(".conNews ul li input").eq(3).val();
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
            }else if(password.length==0){
                alert("请填写密码");
            }else{
                var sendData = {
                    "name": name,
                    "tell":phone,
                    "email":emil,
                    "password":password,
                    "account": ReadCookie("account"),
                    "code": ReadCookie("code"),
                    "groupId":ReadCookie("groupId"),
                    "gId":str,
                    "instituteId":$(".academy .content ul li.on").attr("id"),

                }
                $.ajax({
                    url: "/admin/addAdmin",
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
                    url: "/admin/deleteAdminBatch",
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
    //状态
    $("#select").unbind("change").on("change",function () {
        var val=$("#select option:selected").val();
        $("#adminPower").children().remove();
        var sendData = {
            "account": ReadCookie("account"),
            "code": ReadCookie("code"),
            "gId":val,
            "groupId":ReadCookie("groupId"),
            "instituteCode":$(".academy .content ul li.on").attr("id"),
        };
        $.ajax({
            url: "/admin/selectAdminG",
            type: "post",
            dataType: "json",
            data: JSON.stringify(sendData),
            contentType: "application/json",
            success: function (json) {
                if (json.result == "success") {
                    if(json.array.length==0){
                        var tr=$("<tr>"+
                            "<td colspan='7'>无消息数据</td>"+
                            "</tr>");
                        $("#adminPower").append(tr);
                    }
                    for(var i=0;i<json.array.length;i++){
                        var strs= new Array(); //定义一数组
                        strs=json.array[i].groupId.split(","); //字符分割
                        var power=new Array();
                        for (var j=0;j<strs.length ;j++ ){
                            if(strs[j]=="1"){
                                power.push("消息编辑");
                            }else if(strs[j]=="2"){
                                power.push("师生信息编辑");
                            }else if(strs[j]=="3"){
                                power.push("成绩录入");
                            }
                        }
                        var tr=$("<tr id='"+json.array[i].id+"'>" +
                            "<td><input type='checkbox'></td>"+
                            "<td>"+json.array[i].name+"</td>"+
                            "<td>"+json.array[i].tell+"</td>"+
                            "<td>"+json.array[i].email+"</td>"+
                            "<td><input type='password' value='"+json.array[i].password+"'></td>"+
                            "<td>"+power+"</td>"+
                            "<td>"+
                            "<a class='amend'>修改</a>"+
                            "<a class='delete'>删除</a>"+
                            "</td></tr>");
                        $("#adminPower").append(tr);
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