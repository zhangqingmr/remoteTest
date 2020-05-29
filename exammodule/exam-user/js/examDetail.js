var reqparams = new Object();
var url = location.search; //获取url中"?"符后的字串  
let timer = null  //定时器
let timerPost = null  //定时器

  var app = new Vue({
    el: '#app',
    data: {
        questionAll: [],
        exam: {
            'exid': '', "title": "", "examNumber": "", "examTime": "", "examRule": "", "passScord": "", "examScord": "", "userScord": "", "question": [], 'examRecordid': '', 'remainingTime': ""
        },
        viewM: true,


    },
    methods: {
        viewChange: function (m) {
            this.viewM = m

            var restTime = app.exam.remainingTime;
            var min = parseFloat(restTime / 60);
            var sec1 = parseInt(restTime % 60);
            $("#min").val(min);
            $("#min").val(sec1)

        },
        changeUi: function (option, question) {

            var b = option.checked
            var qtype = question.qtype;
            var qid = question.qid;
            console.log(qtype)
            if (b) {
                option.checked = false
            } else {
                //单选和判断时候，制空其他的
                if (qtype == 1 || qtype == 3) {

                    for (var i = 0; i < question.options.length; i++) {

                        question.options[i].checked = false
                    }
                } else {

                }
                option.checked = true
            }
            var num = 0;

            //给右侧数字赋ID，为qid，然后传入的问题的option中有选中，则Num+1
            for (var i = 0; i < question.options.length; i++) {
                if (question.options[i].checked == true) {
                    num = num + 1;
                }

            }
            //单选题，num为1时候有class，不是的时候去掉，
            if (qtype == 1 || qtype == 3) {
                if (num == 1) {
                    var m = $("#" + qid).hasClass('selected');
                    if (!m) {
                        
                        $("#" + qid).addClass('selected');

                    }
                } else {
                    $("#" + qid).removeClass('selected');

                }
            }
            //多选题，num为2时候有class， 不是的时候去掉，
            if (qtype == 2) {
                if (num >= 2) {
                    var m = $("#" + qid).hasClass('selected');
                    if (!m) {
                        $("#" + qid).addClass('selected');

                    }
                } else {
                    $("#" + qid).removeClass('selected');

                }
            }
            //不定项，num为1时候有class，  不是的时候去掉，
            if (qtype == 6) {
                if (num >= 1) {
                    var m = $("#" + qid).hasClass('selected');
                    if (!m) {
                        $("#" + qid).addClass('selected');

                    }
                } else {
                    $("#" + qid).removeClass('selected');

                }
            }
        },

        leaveOp: function (que, op) {
            var qid = que.qid;
            if (op != null) {
                var opiz = op.opid
            }

            var qtype = que.qtype
            if (qtype == 4 || qtype == '4') {
                var hasRight = 0;
                //输入
                for (var i = 0; i < que.options.length; i++) {
                    var opid = que.options[i].opid;
                    var m = que.options[i].answer;
                    if (m != null && m != undefined && m != '') {
                        hasRight++;

                    }
                }
                if (hasRight == que.options.length) {
                    var n = $('#' + qid).hasClass('selected');
                    if (n) {

                    } else {
                        $('#' + qid).addClass('selected');

                    }

                } else {
                    var n = $('#' + qid).hasClass('selected');

                    if (n) {
                        $('#' + qid).removeClass('selected');

                    } else {

                    }
                }

            }
            if (qtype == 5 || qtype == '5') {
                var m = que.userAnswer
                if (m != null && m != undefined && m != '') {
                    var n = $('#' + qid).hasClass('selected');
                    if (n) {

                    } else {
                        $('#' + qid).addClass('selected');

                    }
                } else {
                    var n = $('#' + qid).hasClass('selected');
                    if (n) {
                        $('#' + qid).removeClass('selected');
                    } else {


                    }
                }
            }
        },
        
    },
    computed: {
        allCount: function () {
            return this.questionAll.length;
        },
        rate: function () {

        },
        remainMin:function(){
            return parseInt(parseInt(this.exam.remainingTime)/60);
        },
        remainSec:function(){
            return parseInt(parseInt(this.exam.remainingTime)%60);
        },
    },
    mounted: function () {

    }
})


if (url.indexOf("?") != -1) {
    var str = url.substr(1);
    strs = str.split("&");
    for (var i = 0; i < strs.length; i++) {

        reqparams[strs[i].split("=")[0]] = unescape(strs[i].split("=")[1]);

    }

}
var exid = reqparams["exid"];  //修改 查看必须传id
if (exid != null && exid != "" & exid != undefined) {
    $.ajax({
        url: "/seeyon/userExamController.do?method=getUserExamPaper",
        type: "post",
        async: false,
        data: { "exid": exid },
        success: function (data) {

            var res = JSON.parse(data);

            var code = res.code;
            if (code == 0) {
                app.exam = res.data;
                app.questionAll = res.data.question;
            
                
            } else {
                app.exam = res.data;
               alert(res.mgs)
                if(res.code=='105'){
                   window.history.back()
                    //window.location.href = '' 
                   
                
                }
                if(res.mgs=='已超过答卷时间，不允许继续答题。'){
                    $.ajax({
                    url: "/seeyon/userExamController.do?method=submitExam",
                    type: "post",
                    data: { "examRecordid": app.exam.examRecordid },
                    success: function (data) {

                        var res = JSON.parse(data);
                        
                        var code = res.code;
                        if (code == 0) {
                            var m = res.data.grade;
                            console.log(m)
                            if(m){
                                window.location.href = '/seeyon/exammodule/exam-user/examFinish.html?examRecordid=' + app.exam.examRecordid
                            }else{
                                
                            }
                          


                        } else {
                            alert(res.mgs)
                        }


                    },
                });
                    window.location.href='/seeyon/studymodule/course-user/courseMoreRecord.html';
                }
                
            }


        },
    });



}




function subAll() {
    var a = {}
    var obj = {}

    app.exam.question = app.questionAll
    a.answer_baseinfo = app.exam;

    obj._json_params = JSON.stringify(a);
    $.ajax({
        url: "/seeyon/userExamController.do?method=answerExam",
        type: "post",
        data: obj,
        success: function (data) {

            var res = JSON.parse(data);

            var code = res.code;
            if (code == 0) {

                $.ajax({
                    url: "/seeyon/userExamController.do?method=submitExam",
                    type: "post",
                    data: { "examRecordid": app.exam.examRecordid },
                    success: function (data) {

                        var res = JSON.parse(data);
                     
                        var code = res.code;
                        if (code == 0) {
                           
                            var m = res.data.grade;
                            clearInterval(timer)//清除定时器
                            clearInterval(timerPost);
                            
                            if(!m){
                                window.location.href = '/seeyon/exammodule/exam-user/examFinish.html?examRecordid=' + res.data.examRecordid
                               
                            }else{
                                window.location.href = '/seeyon/exammodule/exam-user/examFinish.html?examRecordid=' + res.data.examRecordid
                            }
                          


                        } else {
                            alert(res.mgs)
                        }


                    },
                });
            } else {
                alert(res.mgs)
            }


        },
    });
}

//5秒钟提交一次
timerPost=setInterval(function(){
    if (app.viewM == false) {
        var a = {}
        var obj = {}

        app.exam.question = app.questionAll
        a.answer_baseinfo = app.exam;

        obj._json_params = JSON.stringify(a);
        $.ajax({
            url: "/seeyon/userExamController.do?method=answerExam",
            type: "post",
            data: obj,
            success: function (data) {

                var res = JSON.parse(data);

                var code = res.code;
                if (code == 0) {

                } else {
                    alert(res.mgs)
                }


            },
        });
    }
}, 5000);


//到时间提交，更新时间
function getCountDown() {
    timer = setInterval(function(){
        if (app.viewM == false) {
            var min = $("#min").text();
            var sec = $("#sec").text();
            min1 = parseInt(min)
            sec1 = parseInt(sec);
            
            sec1 = sec1 - 1;
            if (sec1 < 0) {
                min1 = min1 - 1;
                sec1 = 59;
            }
            if (min1==0&&sec1==0) {
                subAll()
            }
            $("#min").text(min1);
            $("#sec").text(sec1);

        }
    }, 1000);
}
getCountDown()




$(document).on('click', '#submitExam', function (e) {
   var s= $(".q-list ").find('.selected').length
   var m=app.questionAll.length
   console.log('1')
   if(s==m){
    subAll();
    console.log('2')
   }else{
       alert('在答卷时间未结束之前，请把所有答完再交卷。')
   }
   
})

window.onload=function(){
   
    for (var i = 0; i < app.questionAll.length; i++) {
      
                var qtype = app.questionAll[i].qtype
                var qid = app.questionAll[i].qid
                var options = app.questionAll[i].options
                var rightAnswer = app.questionAll[i].userAnswer;
                //单选题和判断题
                
                if (qtype == 1||qtype == 3||qtype == 6 ) {
                    
                    for (var m = 0; m < options.length; m++) {
                        
                        if (options[m].checked == true) {
                            
                          //  $('#' + qid).addClass('selected');
                            $("#" + qid).addClass('selected');
                        }
                    }
                } 
                else if (qtype == 4) {
                    var k = 0
                   
                    for (var m = 0; m < options.length; m++) {
                       
                        if (options[m].answer != ''&&options[m].answer!=undefined) {
                            k++
                        }
                    }
                    if (k == options.length) {
                        $('#' + qid).addClass('selected');
                    }
                } else if (qtype == 5) {
                    if (rightAnswer != null && rightAnswer != '') {
                        $('#' + qid).addClass('selected');
                    }

                } else if (qtype == 2) {
                    var k = 0
                    for (var m = 0; m < options.length; m++) {
                        if (options[m].checked == true) {
                            k++
                        }
                    }
                    if (k >= 2) {
                        $('#' + qid).addClass('selected');
                    }
                }


            }
}