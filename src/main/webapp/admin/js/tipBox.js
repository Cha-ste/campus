/**
 * Created by H on 2016/11/11.
 */
var time;
function alert(str , type) {
    if(type == 0){
        $("#actionResult").html(str);
        $("#actionDiv").fadeIn();
        $("#actionDiv").css("background-color", "green");
        time = setTimeout(function () {
            $("#actionDiv").fadeOut();
        },1500);
    }
    else if(type == 1){
        $("#actionResult").html(str);
        $("#actionDiv").fadeIn();
        $("#actionDiv").css("background-color", "red");
        time = setTimeout(function () {
            $("#actionDiv").fadeOut();
        },1500);
    }
    else {
        $("#actionResult").html(str);
        $("#actionDiv").fadeIn();
        $("#actionDiv").css("background-color","orange");
        time = setTimeout(function () {
            $("#actionDiv").fadeOut();
        },1500);
    }
}

(function () {
  // $.MsgBox = {
    // Alert: function (title, msg) {
    //   GenerateHtml("alert", title, msg);
    //   btnOk(); //alert只是弹出消息，因此没必要用到回调函数callback
    //   btnNo();
    // },
    // Confirm: function (title, msg, callback) {
    Confirmnew=function (msg, callback) {
      // GenerateHtml("confirm", title, msg);
      GenerateHtml(msg);
      btnOk(callback);
      btnNo();
    }
  // }

  //生成Html
  // var GenerateHtml = function (type, title, msg) {
  var GenerateHtml = function (msg) {
    var _html = "";

    _html += '<div id="mb_box"></div><div id="mb_con"><span id="mb_tit">' +"温馨提醒"+ '</span>';
    _html += '<a id="mb_ico">×</a><div id="mb_msg">' + msg + '</div><div id="mb_btnbox">';

    // if (type == "alert") {
    //   _html += '<input id="mb_btn_ok" type="button" value="确定" />';
    // }
    // if (type == "confirm") {
      _html += '<input id="mb_btn_ok" type="button" class="btn btn-primary" value="确定" />';
      _html += '<input id="mb_btn_no" type="button" class="btn btn-default" value="取消" />';
    // }
    _html += '</div></div>';

    //必须先将_html添加到body，再设置Css样式
    $("body").append(_html); GenerateCss();
  }

  //生成Css
  var GenerateCss = function () {

    $("#mb_box").css({ width: '100%', height: '100%', zIndex: '99999', position: 'fixed',
      filter: 'Alpha(opacity=10)', backgroundColor: '#000', top: '0', left: '0', opacity: '0.5'
    });

    $("#mb_con").css({ zIndex: '999999', width: '400px', position: 'fixed',
      backgroundColor: '#fff', borderRadius: '6px', boxShadow: 'rgb(75, 75, 75) -1px 0px 2px'
    });

    $("#mb_tit").css({ display: 'block', fontSize: '14px', color: 'black',textAlign:"left",padding: '15px',
        borderBottom: '1px solid #e7e7eb',
    });

    $("#mb_msg").css({ padding: '20px', lineHeight: '20px',
      borderBottom: '1px solid #e7e7eb', fontSize: '13px',background: '#fff'
    });

    $("#mb_ico").css({ display: 'block', position: 'absolute', right: '10px', top: '15px',
      width: '22px', height: '22px', textAlign: 'center',color:"#565656",
      lineHeight: '15px', cursor: 'pointer',fontSize:'25px !important' ,opacity: '.2',backgroundColor:'#fff', fontFamily: '微软雅黑'
    });

    $("#mb_btnbox").css({ margin: '15px 0 10px 0', textAlign: 'right' ,background: '#fff'});
    // $("#mb_btn_ok,#mb_btn_no").css({ });
    // $("#mb_btn_ok").css({  });
    $("#mb_btn_no").css({  margin: '0px 20px' });


    //右上角关闭按钮hover样式
    $("#mb_ico").hover(function () {
      $(this).css({ backgroundColor: '#fff', color: 'black' });
    }, function () {
      $(this).css({ backgroundColor: '#fff', color: '#565656' });
    });

    var _widht = document.documentElement.clientWidth; //屏幕宽
    var _height = document.documentElement.clientHeight; //屏幕高

    var boxWidth = $("#mb_con").width();
    var boxHeight = $("#mb_con").height();

    //让提示框居中
    $("#mb_con").css({ top: (_height - boxHeight-300) / 2 + "px", left: (_widht - boxWidth) / 2 + "px" });
  }


  //确定按钮事件
  var btnOk = function (callback) {
    $("#mb_btn_ok").click(function () {
      $("#mb_box,#mb_con").remove();
      if (typeof (callback) == 'function') {
        callback();
      }
    });
  }

  //取消按钮事件
  var btnNo = function () {
    $("#mb_btn_no,#mb_ico").click(function () {
      $("#mb_box,#mb_con").remove();
    });
  }
})();