var reqparams = new Object();  
　      var url = location.search;
        if(url.indexOf("?") != -1)
      　　{  
      　　 var str = url.substr(1); 
      　　　strs = str.split("&");  
      　　　for(var i = 0; i < strs.length; i ++)  
        　　 {  
                reqparams[strs[i].split("=")[0]]=unescape(strs[i].split("=")[1]);  
        
        　　  }  

      　　} 
        var examRecordid=reqparams["examRecordid"];  //修改 查看必须传id
        if(examRecordid!=null&&examRecordid!=''){
          $.ajax({
                      url:"/seeyon/userExamController.do?method=getMarkExamData",
                      type:"post",
                      data:{"examRecordid":examRecordid},
                      success:function(data){
                  
                          var res=JSON.parse(data);
                      
                          var code=res.code;

                          if(code==0){
                             app.exam=res.data;
                             app.questionAll=res.data.question;
                             
                            }else{
                            
                          }
                          
                          
                      },
                      });
      
        }
  var app=new Vue({
      el:'#app',
      data:{
          exam:{},
          questionAll:[
              {"title":"哈哈哈","qid":"1","userAnswer":"1111","rightAnswer":"222","score":"10","userScore":"0","qtypeName":"问答题"},
              {"title":"哈哈哈","qid":"1","userAnswer":"1111","rightAnswer":"222","score":"10","userScore":"0","qtypeName":"问答题"},
              {"title":"哈哈哈","qid":"1","userAnswer":"1111","rightAnswer":"222","score":"10","userScore":"0","qtypeName":"问答题"}
          ]
      },
      methods:{
         judgeQuestion:function(e,question){
             var target=e.target;
              var t=$(target).hasClass('did-wrong');
             
              if(t){
                  
                
                  question.userScore=0;
                  question.answerState=1
                  $(target).siblings('#right').css('opacity','0.3');
                  $(target).css('opacity','1');
              }else{
                  
                  question.userScore=question.score;
                  question.answerState=2;
                  $(target).siblings('#wrong').css('opacity','0.3');
                  $(target).css('opacity','1');

              }
         },
         changeScore:function(e,question){
          
              var target=e.target;
              var s=$(target).text();
              question.userScore=s;
            
              if(s=='0'){
                  question.answerState=1
                  $(target).parent().siblings('.question-grading').find('#right').css('opacity','0.3');
                  $(target).parent().siblings('.question-grading').find('#wrong').css('opacity','1');
              }else{
                  question.answerState=2
                  $(target).parent().siblings('.question-grading').find('#right').css('opacity','1.0');
                  $(target).parent().siblings('.question-grading').find('#wrong').css('opacity','0.3');
              }

         },
          gsTime:function(result){
              var h = Math.floor(result / 3600) < 10 ? '0'+Math.floor(result / 3600) : Math.floor(result / 3600);
              var m = Math.floor((result / 60 % 60)) < 10 ? '0' + Math.floor((result / 60 % 60)) : Math.floor((result / 60 % 60));
              var s = Math.floor((result % 60)) < 10 ? '0' + Math.floor((result % 60)) : Math.floor((result % 60));
              return result = h + ":" + m + ":" + s;
          }
      },
      computed:{
         
      }
  })
  $('#finishandnext').click(function(e){
      var isAllPy=0
      for(var i=0;i<app.questionAll.length;i++){
          if(app.questionAll[i].answerState==4){
              isAllPy=1;
              break;
          }else{
              
          }
      }
      if(isAllPy==1){
          alert('请将所有的问题批阅完毕再进行提交。')
          return false;
      }
          var Obj={
          };
          var a={}
          app.exam.question=app.questionAll
          a.mark_baseinfo=app.exam;
          Obj._json_params=JSON.stringify(a);
      $.ajax({
          url: "/seeyon/userExamController.do?method=submitMarkData",
          type: "post",
          data: Obj,
          success: function (data) {
              alert('批改试卷完成');
              window.location.href='/seeyon/exammodule/exam-admin/examReadOver.html'
          },
      });
  })