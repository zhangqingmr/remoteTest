function gsTime(result){
    var h = Math.floor(result / 3600) < 10 ? '0'+Math.floor(result / 3600) : Math.floor(result / 3600);
    var m = Math.floor((result / 60 % 60)) < 10 ? '0' + Math.floor((result / 60 % 60)) : Math.floor((result / 60 % 60));
    var s = Math.floor((result % 60)) < 10 ? '0' + Math.floor((result % 60)) : Math.floor((result % 60));
    return result = h + ":" + m + ":" + s;
}
$(function(){
    layui.use(['table','layer'], function(){
        var table = layui.table;
        var layer = layui.layer;
            function dataList(url){
                var i=0;
                table.render({
                    elem: '#datalist'
                    
                    ,id:"datazq"
                    ,url: url //数据接口
                    ,page: true //开启分页
                    ,height:'600px'
                    ,cols: [[ //表头
                    {type: 'numbers',title: '#', fixed: 'left', width:'4%'}
                    
                    ,{field: 'fileName', title: '文件名', width:'30%',align:"center"}
                    ,{field: 'updateTime', title: '最近一次学习时间', width:'20%',align:"center",templet: function(d){
                        return "<div style='color:#f13729'>"+d.updateTime+"<span style='color:black'>学习</span></div>"
                        }}
                    ,{field: 'duration', title: '总时长', width:'15%',align:"center",templet: function(d){
                         return gsTime(d.duration)
                        }} 
                    ,{field: 'percentage', title: '完成率', width: '15%',align:"center",templet: function(d){
                         if(d.percentage==100){
                             return "<span style='color:green'>完成</span>"
                         }else{
                            return "<span style='color:red'>"+d.percentage+"%</span>"
                         }
                        }}
                    ,{field: 'reid', title: '操作', width: '15%',align:"center",templet: function(d){
                        if(d.resourceType==1||d.resourceType==2){
                            return "<a class='glyphicon glyphicon-eye-open' href='/seeyon/studymodule/course-user/coursePlayVideo.html?state=study&rsId="+d.reid+"' style='color:rgba(29, 141, 255, 1)'></a>"
                        }else if(d.resourceType==0||d.resourceType==3||d.resourceType==4){
                            return "<a class='glyphicon glyphicon-eye-open' href='/seeyon/studymodule/course-user/coursePlayOthers.html?state=study&rsId="+d.reid+"' style='color:rgba(29, 141, 255, 1)'></a>"
                        }else{
                            return "<a class='glyphicon glyphicon-eye-open' href='/seeyon/studymodule/course-user/coursePlayOthers.html?state=study&rsId="+d.reid+"' style='color:rgba(29, 141, 255, 1)'></a>"
                        }
                        }}
                    
                    ]]
                
                });

                
                //数据列表监听全选
            
                
            
            }
            dataList('/seeyon/learnResource.do?method=learnResourceHistory');
            $('#search').click(function(){
                var filename= $('#title-zq').val();
                console.log(filename)
               var type= $('#type-zq').val();
               console.log(type)
               var state= $('#state-zq').val();
               console.log(state)
               if(filename==''&&type==''&&state==''){
                dataList('/seeyon/learnResource.do?method=learnResourceHistory');
               }else{
                var url='/seeyon/learnResource.do?method=learnResourceHistory&courseName='+filename+'&resourceType='+type+'&studyStatus='+state;
               dataList(url);
               }
               
            })
        })

       
})