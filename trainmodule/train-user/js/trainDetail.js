var reqparams = new Object();
var url = location.search; //获取url中"?"符后的字串  
let timer = null  //定时器
let timerPost = null  //定时器

  var app = new Vue({
    el: '#app',
    data: {
        questionAll: [],
        train: {
            'trid': '1111', "title": "11111111", "answerState": "1111", "createTime": "111", "recordId": "1", "trainQuestion": [],
        },
        answerTi:{},
        viewIndex:0
    },
    methods: {
        changeIndex:function(tyzq){
            var s=app.train.trainQuestion.length;
            if(tyzq==1){
                if(app.viewIndex<s-1){
                app.viewIndex=app.viewIndex+1;}
            }else{
                if(app.viewIndex>0){
                app.viewIndex=app.viewIndex-1;}
            }
            
            
           
        },
        changeUi: function (option, question) {

            var b = option.checked
            var qtype = question.qtype;
            var qid = question.qid;
           
            if (b) {
                option.checked = false
            } else {
                //单选和判断时候，制空其他的
                if (qtype == 1 || qtype == 3) {

                    for (var i = 0; i < question.optionList.length; i++) {

                        question.optionList[i].checked = false
                    }
                } else {

                }
                option.checked = true
                
            }
            var num = 0;

            //给右侧数字赋ID，为qid，然后传入的问题的option中有选中，则Num+1
            for (var i = 0; i < question.optionList.length; i++) {
                if (question.optionList[i].checked == true) {
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
                for (var i = 0; i < que.optionList.length; i++) {
                    var opid = que.optionList[i].opid;
                    var m = que.optionList[i].answer;
                    if (m != null && m != undefined && m != '') {
                        hasRight++;

                    }
                }
                if (hasRight == que.optionList.length) {
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
        subOne:function(index){
            
             var a = {}
             var obj = {}
             app.train.trainQuestion = app.questionAll
             a.train_answer = app.train.trainQuestion[index];
             obj._json_params = JSON.stringify(a);
             $.ajax({
                 url: "/seeyon/userTrainProgram.do?method=saveOrUpdateTrain",
                 type: "post",
                 data: obj,
                 success: function (data) {
                    var res = JSON.parse(data);
                     var code = res.code;
                     if (code == 0) {
                         
                          if(res.data.answerState==2){
                                app.changeIndex(1)
                                app.answerTi ={}
                                if(app.questionAll.length==index+1){
                               subAll(app.train.recordId)
                            }
                            }else{
                                app.answerTi = res.data
                                alert("回答错误，请查看解析。")
                            }
                            
                            
                     } else {
                         alert(res.mgs)
                     }
                     


                 },
             });
        },
        yemianXr:function(){
            
        }
    },
    computed: {
       
        
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
var trainid = reqparams["train"];  //修改 查看必须传id
if (trainid != null && trainid != "" & trainid != undefined) {
    $.ajax({
        url: "/seeyon/userTrainProgram.do?method=startTrainProgram",
        type: "post",
        async: false,
        data: { "trid": trainid },
        success: function (data) {

            var res = JSON.parse(data);

            var code = res.code;
            if (code == 0) {
                app.train = res.data;
                app.questionAll = res.data.trainQuestion;
                var index=[];
                for(var i=0;i<app.questionAll.length;i++){
                    if(app.questionAll[i].answerState==0||app.questionAll[i].answerState==1||app.questionAll[i].answerState==3){
                        index.push(i)
                    }
                }
                
                if(index.length==0){
                    index.push(app.questionAll.length)
                    app.viewIndex=index[0]-1;
                }else{
                    app.viewIndex=index[0];
                }
               
                
                
            } else {
                app.train = res.data;
               alert(res.mgs)
                if(res.code=='105'){
                   window.history.back()
             
                }
                
            }


        },
    });
}




function subAll(reid) {
    
    $.ajax({
        url: "/seeyon/userTrainProgram.do?method=submitTrain&reid="+reid,
        type: "get",
        
        success: function (data) {

            var res = JSON.parse(data);

            var code = res.code;
            if (code == 0) {
                alert('保存成功');
                window.location.href='/seeyon/trainmodule/train-user/trainOnline.html'
            } else {
                alert(res.mgs)
            }


        },
    });
}







 window.onload = function () {

    for (var i = 0; i < app.questionAll.length; i++) {

        var qtype = app.questionAll[i].qtype
        var qid = app.questionAll[i].qid
         var options = app.questionAll[i].optionList
         var rightAnswer = app.questionAll[i].userAnswer;
         //单选题和判断题

        if (qtype == 1 || qtype == 3 || qtype == 6) {
             console.log("1")
            for (var m = 0; m < options.length; m++) {

                if (options[m].checked == true) {
                    console.log("进入")
                     console.log(this.document.getElementById("6290568379773430517"))
                     console.log($("#6290568379773430517"))
                    console.log($("#examMain"))
                    console.log($("#" + qid))
                     //  $('#' + qid).addClass('selected');
                     $("#" + qid).addClass('selected');
                }            }
        }
         else if (qtype == 4) {
            var k = 0

            for (var m = 0; m < options.length; m++) {

                if (options[m].answer != '' && options[m].answer != undefined) {
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
                 $('#' + qid).addClass('selected')            }
         }


     }

 }
