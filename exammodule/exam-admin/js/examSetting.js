 
        var app=new Vue({
            el:"#app",
            data:{
                exam:{
                    "examTime":"0","title":"","exid":"","startTime":"","endTime":"","isUnlimited":true,"isForever":true,'sumNumber':'1'
                }
            },
            methods:{
                timeInit:function(s){
                    $("#"+s).datetimepicker({
                        bootcssVer:3,
                        format: "yyyy-mm-dd hh:ii",
                        linkField: "mirror_field",
                        linkFormat: "yyyy-mm-dd hh:ii",
                        todayBtn: true,
                        language: 'zh-CN',
                        autoclose: true, //当选择一个日期之后是否立即关闭此日期时间选择器。
                        keyboardNavigation: true, //是否允许通过方向键改变日期。
                        forceParse: true, //当选择器关闭的时候，是否强制解析输入框中的值。
                        todayHighlight: 1  //如果为true, 高亮当前日期
                    })
                }
            },
            computed:{
                foreverF:function(){
                 
                }
            },
            mounted:function(){
                this.timeInit('time1');
                this.timeInit('time2');
            }
        })


    $(function(){
  



           var reqparams = new Object();  
  　      var url = location.search; //获取url中"?"符后的字串
          if(url.indexOf("?") != -1){  
           var str = url.substr(1);  
           strs = str.split("&");  
           for(var i = 0; i < strs.length; i ++){ 
                reqparams[strs[i].split("=")[0]]=unescape(strs[i].split("=")[1]);  
          　　  }
        　　} 
          var exid=reqparams["exid"];  //修改 查看必须传id
          if(exid!=null&&exid!=""&exid!=undefined){
            $.ajax({
                url:'/seeyon/paperController.do?method=getPaperById',
                type:"post",
                data:{'exid':exid},
                success:function(data){
                  var entity=JSON.parse(data);
                  if(entity.code==0){
                      app.exam=entity.data;
                    $("#time1").val(app.exam.startTime)
                    $("#time2").val(app.exam.endTime)
                      
                  }
                 
                },
              });
          }
         
        
        function ajaxCommon(url,entity){
        $.ajax({
            url:url,
            type:"post",
            data:entity,
            success:function(data){
              var entity=JSON.parse(data);
         //     app.exam.questions=entity.questions;
                if(entity.code==0){
                  alert('保存成功')
                  window.location.href='/seeyon/exammodule/exam-admin/examList.html'
                }else{
                    alert(entity.mgs)
                }
             
            },
          });
     }
     function transTimeStem(date){
       // 格式：'2015-03-05 17:59:00'
        date = date.substring(0,19);    
        date = date.replace(/-/g,'/'); 
        var timestamp = new Date(date).getTime();
        return timestamp;
     }
     //校验时间
     function checkTime(){
        var t1 =$('#time1').val()
         var t2=$('#time2').val()
        var stamp1=transTimeStem(t1)
        var stamp2=transTimeStem(t2)
        var m=stamp1-stamp2
        console.log(t1)
        console.log(stamp1)
        console.log(stamp2)
        if(app.exam.isForever==false||app.exam.isForever=='false'){
            if(t1==''||t2==''){
                alert('时间设置不能为空')
                return false;
            }
            console.log(m)
            if(m>=0){
                alert('结束时间应大于开始时间')
                return false;
            }
        }
         
         return true
         
     }

          $('#finished').click(function(e){
            var check=  checkTime();
           
            if(!check){
                return false;
            }
            var a={}
        var obj={}
        
        app.exam.startTime=$("#time1").val();
        app.exam.endTime=$("#time2").val();
        a.paper_baseinfo=app.exam;
    
        obj._json_params=JSON.stringify(a);
            ajaxCommon('/seeyon/paperController.do?method=saveOrUpdatePaper',obj)
          })
    })