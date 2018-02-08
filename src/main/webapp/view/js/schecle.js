/**
 * Created by Administrator on 2017/4/15.
 */
$(function () {
    var year=$("#year option:selected").text();
    var term=$("#term option:selected").text();
    schecle(year,term);

    $("#year").unbind("change").on("change",function () {
        var year=$("#year option:selected").text();
        var term=$("#term option:selected").text();
        $("#teacher").find("td").not($("#teacher>tr>td:first-child")).each(function () {
            $(this).html("");
        })
        schecle(year,term);
    });

    $("#term").unbind("change").on("change",function () {
        var year=$("#year option:selected").text();
        var term=$("#term option:selected").text();
        $("#teacher").find("td").not($("#teacher>tr>td:first-child")).each(function () {
            $(this).html("");
        })
        schecle(year,term);
    })

});

function schecle(year,term) {
    if(ReadCookie("role")=="teacher"){
        var sendData = {
            "account": ReadCookie("account"),
            "code": ReadCookie("code"),
            "year": year,
            "term": term,
        };
        $.ajax({
            url: "/client/getScheduleByTeacherId",
            type: "post",
            dataType: "json",
            data: JSON.stringify(sendData),
            contentType: "application/json",
            success: function (json) {
                if (json.result == "success") {

                    $(".academyCon .head h1").text(json.array[0].teacherName);
                    for(var i=0;i<json.array.length;i++){
                        if(json.array[i].week=="星期一"){
                            if(json.array[i].time=="1-2节"){
                                $("#td-1-1").html(json.array[i].year+"<br>"+json.array[i].term+"<br>"+json.array[i].className+"<br>"+json.array[i].courseName);
                            }else if(json.array[i].time=="3-4节"){
                                $("#td-1-2").html(json.array[i].year+"<br>"+json.array[i].term+"<br>"+json.array[i].className+"<br>"+json.array[i].courseName);
                            }else if(json.array[i].time=="5-6节"){
                                $("#td-1-3").html(json.array[i].year+"<br>"+json.array[i].term+"<br>"+json.array[i].className+"<br>"+json.array[i].courseName);
                            }else if(json.array[i].time=="7-8节"){
                                $("#td-1-4").html(json.array[i].year+"<br>"+json.array[i].term+"<br>"+json.array[i].className+"<br>"+json.array[i].courseName);
                            }
                        }else if(json.array[i].week=="星期二"){
                            if(json.array[i].time=="1-2节"){
                                $("#td-2-1").html(json.array[i].year+"<br>"+json.array[i].term+"<br>"+json.array[i].className+"<br>"+json.array[i].courseName);
                            }else if(json.array[i].time=="3-4节"){
                                $("#td-2-2").html(json.array[i].year+"<br>"+json.array[i].term+"<br>"+json.array[i].className+"<br>"+json.array[i].courseName);
                            }else if(json.array[i].time=="5-6节"){
                                $("#td-2-3").html(json.array[i].year+"<br>"+json.array[i].term+"<br>"+json.array[i].className+"<br>"+json.array[i].courseName);
                            }else if(json.array[i].time=="7-8节"){
                                $("#td-2-4").html(json.array[i].year+"<br>"+json.array[i].term+"<br>"+json.array[i].className+"<br>"+json.array[i].courseName);
                            }
                        }else if(json.array[i].week=="星期三"){
                            if(json.array[i].time=="1-2节"){
                                $("#td-3-1").html(json.array[i].year+"<br>"+json.array[i].term+"<br>"+json.array[i].className+"<br>"+json.array[i].courseName);
                            }else if(json.array[i].time=="3-4节"){
                                $("#td-3-2").html(json.array[i].year+"<br>"+json.array[i].term+"<br>"+json.array[i].className+"<br>"+json.array[i].courseName);
                            }else if(json.array[i].time=="5-6节"){
                                $("#td-3-3").html(json.array[i].year+"<br>"+json.array[i].term+"<br>"+json.array[i].className+"<br>"+json.array[i].courseName);
                            }else if(json.array[i].time=="7-8节"){
                                $("#td-3-4").html(json.array[i].year+"<br>"+json.array[i].term+"<br>"+json.array[i].className+"<br>"+json.array[i].courseName);
                            }
                        }else if(json.array[i].week=="星期四"){
                            if(json.array[i].time=="1-2节"){
                                $("#td-4-1").html(json.array[i].year+"<br>"+json.array[i].term+"<br>"+json.array[i].className+"<br>"+json.array[i].courseName);
                            }else if(json.array[i].time=="3-4节"){
                                $("#td-4-2").html(json.array[i].year+"<br>"+json.array[i].term+"<br>"+json.array[i].className+"<br>"+json.array[i].courseName);
                            }else if(json.array[i].time=="5-6节"){
                                $("#td-4-3").html(json.array[i].year+"<br>"+json.array[i].term+"<br>"+json.array[i].className+"<br>"+json.array[i].courseName);
                            }else if(json.array[i].time=="7-8节"){
                                $("#td-4-4").html(json.array[i].year+"<br>"+json.array[i].term+"<br>"+json.array[i].className+"<br>"+json.array[i].courseName);
                            }
                        }else if(json.array[i].week=="星期五"){
                            if(json.array[i].time=="1-2节"){
                                $("#td-5-1").html(json.array[i].year+"<br>"+json.array[i].term+"<br>"+json.array[i].className+"<br>"+json.array[i].courseName);
                            }else if(json.array[i].time=="3-4节"){
                                $("#td-5-2").html(json.array[i].year+"<br>"+json.array[i].term+"<br>"+json.array[i].className+"<br>"+json.array[i].courseName);
                            }else if(json.array[i].time=="5-6节"){
                                $("#td-5-3").html(json.array[i].year+"<br>"+json.array[i].term+"<br>"+json.array[i].className+"<br>"+json.array[i].courseName);
                            }else if(json.array[i].time=="7-8节"){
                                $("#td-5-4").html(json.array[i].year+"<br>"+json.array[i].term+"<br>"+json.array[i].className+"<br>"+json.array[i].courseName);
                            }
                        }else if(json.array[i].week=="星期六"){
                            if(json.array[i].time=="1-2节"){
                                $("#td-6-1").html(json.array[i].year+"<br>"+json.array[i].term+"<br>"+json.array[i].className+"<br>"+json.array[i].courseName);
                            }else if(json.array[i].time=="3-4节"){
                                $("#td-6-2").html(json.array[i].year+"<br>"+json.array[i].term+"<br>"+json.array[i].className+"<br>"+json.array[i].courseName);
                            }else if(json.array[i].time=="5-6节"){
                                $("#td-6-3").html(json.array[i].year+"<br>"+json.array[i].term+"<br>"+json.array[i].className+"<br>"+json.array[i].courseName);
                            }else if(json.array[i].time=="7-8节"){
                                $("#td-6-4").html(json.array[i].year+"<br>"+json.array[i].term+"<br>"+json.array[i].className+"<br>"+json.array[i].courseName);
                            }
                        }else if(json.array[i].week=="星期日"){
                            if(json.array[i].time=="1-2节"){
                                $("#td-7-1").html(json.array[i].year+"<br>"+json.array[i].term+"<br>"+json.array[i].className+"<br>"+json.array[i].courseName);
                            }else if(json.array[i].time=="3-4节"){
                                $("#td-7-2").html(json.array[i].year+"<br>"+json.array[i].term+"<br>"+json.array[i].className+"<br>"+json.array[i].courseName);
                            }else if(json.array[i].time=="5-6节"){
                                $("#td-7-3").html(json.array[i].year+"<br>"+json.array[i].term+"<br>"+json.array[i].className+"<br>"+json.array[i].courseName);
                            }else if(json.array[i].time=="7-8节"){
                                $("#td-7-4").html(json.array[i].year+"<br>"+json.array[i].term+"<br>"+json.array[i].className+"<br>"+json.array[i].courseName);
                            }
                        }

                    }

                }else if(json.result == "noPower"){
                    alert("你没有权限");
                }else if(json.result == "timeOver"){
                    alert("登录过期");
                    window.location.href="loginAdmin.html";
                }
            },
            error: function () {

            }
        });
    }else if(ReadCookie("role")=="student"){
        var sendData = {
            "account": ReadCookie("account"),
            "code": ReadCookie("code"),
            "year": year,
            "term": term,
        };
        $.ajax({
            url: "/client/getScheduleByClass",
            type: "post",
            dataType: "json",
            data: JSON.stringify(sendData),
            contentType: "application/json",
            success: function (json) {
                if (json.result == "success") {
                    $(".academyCon .head h1").text(json.array[0].className);
                    for(var i=0;i<json.array.length;i++){
                        if(json.array[i].week=="星期一"){
                            if(json.array[i].time=="1-2节"){
                                $("#td-1-1").html(json.array[i].year+"<br>"+json.array[i].term+"<br>"+json.array[i].teacherName+"<br>"+json.array[i].courseName);
                            }else if(json.array[i].time=="3-4节"){
                                $("#td-1-2").html(json.array[i].year+"<br>"+json.array[i].term+"<br>"+json.array[i].teacherName+"<br>"+json.array[i].courseName);
                            }else if(json.array[i].time=="5-6节"){
                                $("#td-1-3").html(json.array[i].year+"<br>"+json.array[i].term+"<br>"+json.array[i].teacherName+"<br>"+json.array[i].courseName);
                            }else if(json.array[i].time=="7-8节"){
                                $("#td-1-4").html(json.array[i].year+"<br>"+json.array[i].term+"<br>"+json.array[i].teacherName+"<br>"+json.array[i].courseName);
                            }
                        }else if(json.array[i].week=="星期二"){
                            if(json.array[i].time=="1-2节"){
                                $("#td-2-1").html(json.array[i].year+"<br>"+json.array[i].term+"<br>"+json.array[i].teacherName+"<br>"+json.array[i].courseName);
                            }else if(json.array[i].time=="3-4节"){
                                $("#td-2-2").html(json.array[i].year+"<br>"+json.array[i].term+"<br>"+json.array[i].teacherName+"<br>"+json.array[i].courseName);
                            }else if(json.array[i].time=="5-6节"){
                                $("#td-2-3").html(json.array[i].year+"<br>"+json.array[i].term+"<br>"+json.array[i].teacherName+"<br>"+json.array[i].courseName);
                            }else if(json.array[i].time=="7-8节"){
                                $("#td-2-4").html(json.array[i].year+"<br>"+json.array[i].term+"<br>"+json.array[i].teacherName+"<br>"+json.array[i].courseName);
                            }
                        } else if(json.array[i].week=="星期三"){
                            if(json.array[i].time=="1-2节"){
                                $("#td-3-1").html(json.array[i].year+"<br>"+json.array[i].term+"<br>"+json.array[i].teacherName+"<br>"+json.array[i].courseName);
                            }else if(json.array[i].time=="3-4节"){
                                $("#td-3-2").html(json.array[i].year+"<br>"+json.array[i].term+"<br>"+json.array[i].teacherName+"<br>"+json.array[i].courseName);
                            }else if(json.array[i].time=="5-6节"){
                                $("#td-3-3").html(json.array[i].year+"<br>"+json.array[i].term+"<br>"+json.array[i].teacherName+"<br>"+json.array[i].courseName);
                            }else if(json.array[i].time=="7-8节"){
                                $("#td-3-4").html(json.array[i].year+"<br>"+json.array[i].term+"<br>"+json.array[i].teacherName+"<br>"+json.array[i].courseName);
                            }
                        }else if(json.array[i].week=="星期四"){
                            if(json.array[i].time=="1-2节"){
                                $("#td-4-1").html(json.array[i].year+"<br>"+json.array[i].term+"<br>"+json.array[i].teacherName+"<br>"+json.array[i].courseName);
                            }else if(json.array[i].time=="3-4节"){
                                $("#td-4-2").html(json.array[i].year+"<br>"+json.array[i].term+"<br>"+json.array[i].teacherName+"<br>"+json.array[i].courseName);
                            }else if(json.array[i].time=="5-6节"){
                                $("#td-4-3").html(json.array[i].year+"<br>"+json.array[i].term+"<br>"+json.array[i].teacherName+"<br>"+json.array[i].courseName);
                            }else if(json.array[i].time=="7-8节"){
                                $("#td-4-4").html(json.array[i].year+"<br>"+json.array[i].term+"<br>"+json.array[i].teacherName+"<br>"+json.array[i].courseName);
                            }
                        }else if(json.array[i].week=="星期五"){
                            if(json.array[i].time=="1-2节"){
                                $("#td-5-1").html(json.array[i].year+"<br>"+json.array[i].term+"<br>"+json.array[i].teacherName+"<br>"+json.array[i].courseName);
                            }else if(json.array[i].time=="3-4节"){
                                $("#td-5-2").html(json.array[i].year+"<br>"+json.array[i].term+"<br>"+json.array[i].teacherName+"<br>"+json.array[i].courseName);
                            }else if(json.array[i].time=="5-6节"){
                                $("#td-5-3").html(json.array[i].year+"<br>"+json.array[i].term+"<br>"+json.array[i].teacherName+"<br>"+json.array[i].courseName);
                            }else if(json.array[i].time=="7-8节"){
                                $("#td-5-4").html(json.array[i].year+"<br>"+json.array[i].term+"<br>"+json.array[i].teacherName+"<br>"+json.array[i].courseName);
                            }
                        }else if(json.array[i].week=="星期六"){
                            if(json.array[i].time=="1-2节"){
                                $("#td-6-1").html(json.array[i].year+"<br>"+json.array[i].term+"<br>"+json.array[i].teacherName+"<br>"+json.array[i].courseName);
                            }else if(json.array[i].time=="3-4节"){
                                $("#td-6-2").html(json.array[i].year+"<br>"+json.array[i].term+"<br>"+json.array[i].teacherName+"<br>"+json.array[i].courseName);
                            }else if(json.array[i].time=="5-6节"){
                                $("#td-6-3").html(json.array[i].year+"<br>"+json.array[i].term+"<br>"+json.array[i].teacherName+"<br>"+json.array[i].courseName);
                            }else if(json.array[i].time=="7-8节"){
                                $("#td-6-4").html(json.array[i].year+"<br>"+json.array[i].term+"<br>"+json.array[i].teacherName+"<br>"+json.array[i].courseName);
                            }
                        }else if(json.array[i].week=="星期日"){
                            if(json.array[i].time=="1-2节"){
                                $("#td-7-1").html(json.array[i].year+"<br>"+json.array[i].term+"<br>"+json.array[i].teacherName+"<br>"+json.array[i].courseName);
                            }else if(json.array[i].time=="3-4节"){
                                $("#td-7-2").html(json.array[i].year+"<br>"+json.array[i].term+"<br>"+json.array[i].teacherName+"<br>"+json.array[i].courseName);
                            }else if(json.array[i].time=="5-6节"){
                                $("#td-7-3").html(json.array[i].year+"<br>"+json.array[i].term+"<br>"+json.array[i].teacherName+"<br>"+json.array[i].courseName);
                            }else if(json.array[i].time=="7-8节"){
                                $("#td-7-4").html(json.array[i].year+"<br>"+json.array[i].term+"<br>"+json.array[i].teacherName+"<br>"+json.array[i].courseName);
                            }
                        }

                    }


                }else if(json.result == "noPower"){
                    alert("你没有权限");
                }else if(json.result == "timeOver"){
                    alert("登录过期");
                    window.location.href="loginAdmin.html";
                }
            },
            error: function () {

            }
        });
    }
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