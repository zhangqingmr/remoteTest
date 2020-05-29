$(function(){

    var examId=[];
    var reqparams = new Object();  
  　      var url = location.search; //获取url中"?"符后的字串
          if(url.indexOf("?") != -1){  
           var str = url.substr(1);  
           strs = str.split("&");  
           for(var i = 0; i < strs.length; i ++){ 
                reqparams[strs[i].split("=")[0]]=unescape(strs[i].split("=")[1]);  
          　　  }
        　　} 
          var trid=reqparams["trid"];  //修改 查看必须传id
          if(trid!=null&&trid!=""&trid!=undefined){
            $.ajax({
                url:'/seeyon/trainProgram.do?method=getTrainById',
                type:"post",
                data:{'trid':trid},
                success:function(data){
                  var entity=JSON.parse(data);
                  if(entity.code==0){
                      app.exam=entity.data;
           
                      if(app.exam.examTime==0||app.exam.examTime==0.0){
                          app.exam.examTime=30;
                      }
                   //   app.questions=entity.data.questions;
                  
                    for(var i=0;i<entity.data.questions.length;i++){
                        app.questions.push(entity.data.questions[i])
                        
                      }
                     
                     
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
                  window.location.href='/seeyon/trainmodule/train-admin/trainAdmin.html'
                }else{
                    alert(entity.mgs)
                }
             
            },
          });
     }
     
    $('#addQuestion').click(function(e){
        layui.use('layer',function(e){
            var layer=layui.layer
            layer.open({
                type: 2, 
                title:"试题选择",
                content: '/seeyon/trainmodule/train-admin/selectExam.html' ,
                area: ['1250px', '700px'],
                btn: ['确定', '取消', ],
                yes: function(index, layero){
                    
                    var m=0;
                 layer.close(index);
                 var s='';
                 console.log(app.questions.length)
                 
                 console.log(app.questions)
                 for(var j=0;j<app.questions.length;j++){
                   s=s+app.questions[j].qid+',';
                  console.log('1')
                }
                console.log('2')
                 for(var i=0;i<app.questionSon.length;i++){
                     if(s.indexOf(app.questionSon[i].qid)==-1){
                        console.log('3')
                         app.questions.push(app.questionSon[i])
                     }else{
                         m=m+1
                     }
                 }
                 console.log(app.questions)
                 console.log("m"+m)
                 if(m==0){
                   
                 }else{
                    alert("重复"+m+"道题，已做去重。")
                 }
               

                    
                } 
                ,btn1: function(index, layero){
                    
                        layer.close(index);
                }
                ,btnAlign: 'r'


            });
        })
    })
    
    $('#distinctQuestion').click(function(e){
        alert('1')
    })
    $('#updateQuestion').click(function(e){
        alert('1')
    })
   
    
    $('#step2').click(function(e){
        var a={}
        var obj={}
      
            
            app.exam.questions=app.questions
        
        a.train_baseinfo=app.exam;
    
        obj._json_params=JSON.stringify(a);
        
       ajaxCommon('/seeyon/trainProgram.do?method=saveOrUpdateTrain',obj)
    })

    $('#updateScore').click(function(e){
        if(app.selectId.length==0){
            alert('至少勾选一项');
            return;
        }
        layui.use('layer',function(e){
            var layer=layui.layer
            layer.prompt({offset: 'auto'},function(value, index, elem){
            
                    for(var k=0;k<app.selectId.length;k++){
                        for(var i=0;i<app.questions.length;i++){
                            if(app.selectId[k]==app.questions[i].qid){
                                app.questions[i].score=value;
                                break;
                            }
                            
                        }
                    }
                
                
                layer.close(index);
              });
        })
    })
   
    
        layui.use('layer',function(e){
            var layer=layui.layer
            $('.edit-exam-time').click(function(e){
            layer.open({
                type: 1, 
                title:"时间设置",
                content:$('#timeSetting'),
               
                area: ['330px', '200px'],
                
                yes: function(index, layero){
                    

                    layer.close(index);
                } 
                ,btn1: function(index, layero){
                    
                        layer.close(index);
                }
                ,btnAlign: 'r'


            });
        })
            $('#setTime').click(function(e){
            
                    var layer=layui.layer
                    layer.open({
                        type: 1, 
                        title:"时间设置",
                        content:$('#timeSetting'),
                    
                        area: ['330px', '200px'],
                        
                        yes: function(index, layero){
                        
        
                            layer.close(index);
                        } 
                        ,btn1: function(index, layero){
                            
                                layer.close(index);
                        }
                        ,btnAlign: 'r'
        
        
                    });
                
            })
            $('.cancel').click(function(e){
                layer.closeAll();
            })
    
            $('.confirm').click(function(e){
                layer.closeAll();
            })
            
    })

    
    $('.time-setting li').click(function(e){
       var boo= $(this).hasClass('active');
        $(this).siblings().removeClass('active');
        if(boo==true){

        }else{
            $(this).addClass('active');
        }
        var m=$(this).find('a').attr('href');
        var n=$(m).hasClass('active');
        if(n==true){

        }else{
            $(m).addClass('active');
        }
        $(m).siblings('.tab-pane').removeClass('active');
    })

})