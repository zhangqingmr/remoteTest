$(function(){
    //全局变量，存储试题勾选Id
    var examId=[];
    
   layui.use('table', function(){
       var table = layui.table;
    function gsTime(result){
      
						var h = Math.floor(result / 3600) < 10 ? '0'+Math.floor(result / 3600) : Math.floor(result / 3600);
						var m = Math.floor((result / 60 % 60)) < 10 ? '0' + Math.floor((result / 60 % 60)) : Math.floor((result / 60 % 60));
						var s = Math.floor((result % 60)) < 10 ? '0' + Math.floor((result % 60)) : Math.floor((result % 60));
						return result = h + ":" + m + ":" + s;
    }
     //数据列表
     function dataList(url){
         var i=0;
           table.render({
             elem: '#datalist'
             
             ,id:"datazq"
             ,url: url //数据接口
             ,page: true //开启分页
             
             ,cols: [[ //表头
               {type: 'checkbox', fixed: 'left', width:'7%'}
               ,{type: 'numbers',title: '序号', fixed: 'left', width:'8%'}
             /*  ,{field: 'qid', title: '#', width:'5%',  fixed: 'left',align:"center",templet: function(d){
                   i++;
                   return i;
                 }}*/
               ,{field: 'title', title: '试卷', width:'30%',align:"center"}
               ,{field: 'userName', title: '考试者', width:'10%',align:"center"}
               ,{field: 'userScore', title: '得分', width:'10%',align:"center"} 
              //  ,{field: 'completenessRate', title: '总分', width: '10%',align:"center"}
               ,{field: 'startTime', title: '考试时间', width: '20%',align:"center"}
               ,{field: 'useTimes', title: '用时', width: '10%',align:"center",templet: function(d){
                return  gsTime(d.useTimes)
              }},
               ,{field: 'examRecordId', title: '操作', width: '10%',align:"center",templet: function(d){
                   return "<a class='' href='/seeyon/exammodule/exam-admin/examPyDetail.html?examRecordid="+d.examRecordId+"'  style='color:rgba(29, 141, 255, 1)'> 批卷</a>"
                 }}
               
             ]]
           
           });

           var a= $("#datalist").siblings(".layui-border-box").attr("lay-filter");
         
           //数据列表监听全选
           table.on('checkbox(test)', function(obj){
               var checkStatus = table.checkStatus('datazq');
               console.log(checkStatus.data) //获取选中行的数据
               examId.splice(0,examId.length);  
               
                   for(var i=0;i<checkStatus.data.length;i++){
                       if(examId.indexOf(checkStatus.data[i].qid)==-1){
                           examId.push(checkStatus.data[i].qid);
                       }
                       
                   }
               
           });
           
           
       
     }
     
   
  

 
 

     dataList('/seeyon/userExamController.do?method=getExamList&answerStatus=2');
    
   $("#btn-search-question").click(function(e){
       var key=$("#searchtitle").val();
       console.log(key)
       var ul="/seeyon/userExamController.do?method=getExamList&answerStatus=2&title="+key;
     dataList(ul)
   })
  


   });
})